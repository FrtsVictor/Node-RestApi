const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
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
              console.log(resultInsert);
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
