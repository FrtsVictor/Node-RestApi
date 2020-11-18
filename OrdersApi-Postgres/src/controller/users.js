const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../sql/_database');

exports.register = async (req, resp, next) => {
  const { username, password, email } = req.body;
  const verifyUserQuery = 'SELECT * FROM users WHERE email = $1';
  const insertQuery = `
        INSERT INTO users
          (username, email, password)
        VALUES
            ($1, $2, $3)`;

  try {
    const resultVerify = await pool.execute(verifyUserQuery, [email]);
    if (resultVerify.rowCount) {
      resp.status(409).send({ message: 'User already registred' });
    } else {
      await bcrypt.hash(password, 10, (errBcrypt, hash) => {
        if (errBcrypt) return resp.status(500).send({ error: errBcrypt });
        const resultInsert = pool.execute(insertQuery, [username, email, hash]);
        const response = {
          message: 'User created sucessfully',
          createdUser: {
            id: resultInsert.id,
            username,
            email,
          },
        };

        return resp.status(201).send(response);
      });
    }
  } catch (error) {
    console.log(error);
    return resp.status(201).send(error);
  }
};

exports.login = async (req, resp) => {
  const querySelect = 'SELECT * FROM users WHERE email = $1';

  try {
    const { email, password } = req.body;
    const result = await pool.execute(querySelect, [email]);

    if (result.rowCount < 1) {
      return resp.status(401).send({ message: 'Authentication Failed E' });
    }

    if (await bcrypt.compareSync(password, result.rows[0].password)) {
      const token = jwt.sign(
        {
          id: result.rows[0].id,
          username: result.rows[0].username,
          email,
          loginTime: new Date().toISOString(),
        },
        'JWT_SECRET',
        { expiresIn: '8h' }
      );
      return resp.status(200).send({
        message: 'Login sucessfully.',
        token,
      });
    }
    return resp.status(401).send({ message: 'Authentication Failed P' });
  } catch (error) {
    return resp.status(500).send({ error });
  }
};
