const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../sql/_database');

module.exports = router;

router.post('/register', (req, resp, next) => {
  const { username, password, email } = req.body;
  const verifyUserQuery = 'SELECT * FROM users WHERE email = $1';
  const insertQuery = `
  INSERT INTO users
  (username, email, password)
  VALUES ($1, $2, $3)`;

  pool.connect((errConnect, conn) => {
    if (errConnect) return resp.status(500).send({ error: errConnect });

    conn.query(verifyUserQuery, [email], (errVerifyUser, resultVerify) => {
      if (errVerifyUser) return resp.status(500).send({ error: errVerifyUser });
      if (resultVerify.rowCount) {
        resp.status(409).send({ message: 'User already registred' });
      } else {
        bcrypt.hash(password, 10, (errBcrypt, hash) => {
          if (errBcrypt) return resp.status(500).send({ error: errBcrypt });
          conn.query(
            insertQuery,
            [username, email, hash],
            (errInsert, resultInsert) => {
              conn.release();
              if (errInsert) return resp.status(500).send({ errInsert });
              const response = {
                message: 'User created sucessfully',
                createdUser: {
                  id: resultInsert.id,
                  username,
                  email,
                },
              };

              return resp.status(201).send(response);
            }
          );
        });
      }
    });
  });
});

router.post('/login', (req, resp, next) => {
  const { email, password } = req.body;
  const querySelect = 'SELECT * FROM users WHERE email = $1';
  pool.connect((errConnect, conn) => {
    if (errConnect) return resp.status(500).send({ error: errConnect });

    pool.query(querySelect, [email], (errQuery, result) => {
      conn.release();
      if (errQuery) return resp.status(500).send({ error: errQuery });
      if (result.rowCount < 1) {
        return resp.status(401).send({ message: 'Authentication Failed E' });
      }
      bcrypt.compare(
        password,
        result.rows[0].password,
        (errBcrypt, resultBcrypt) => {
          if (errBcrypt) {
            return resp
              .status(401)
              .send({ message: 'Bcr Authentication Failed. ' });
          }
          if (resultBcrypt) {
            const token = jwt.sign(
              {
                id: result.rows[0].id,
                username: result.rows[0].username,
                email,
                loginTime: new Date().toISOString(),
              },
              'JWT_SECRET',
              {
                expiresIn: '1h',
              }
            );

            return resp.status(200).send({
              message: 'Login sucessfully.',
              token,
            });
          }
          return resp.status(200).send({ message: 'Authentication Failed P' });
        }
      );
    });
  });
});

router.get('/test', (req, resp, next) => {
  console.log(process.env.NODE_ENV);
});
