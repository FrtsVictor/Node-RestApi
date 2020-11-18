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

exports.getAll = async (req, resp) => {
  const getAllQuery = `
       SELECT *
         FROM users`;

  try {
    const result = await pool.execute(getAllQuery);
    const response = {
      totalItems: result.rows.length,
      users: result.rows.map((usr) => ({
        id: usr.id,
        email: usr.email,
        username: usr.username,
        request: {
          type: 'GET',
          url: `http:localhost:3000/users/${usr.id}`,
          description: 'Return user by id',
        },
      })),
    };

    return resp.status(200).send({ response });
  } catch (error) {
    return resp.status(500).send({ error });
  }
};

exports.getById = async (req, resp) => {
  const getAllQuery = `
       SELECT *
         FROM users
        WHERE id = $1`;

  try {
    const { id } = req.params;
    const result = await pool.execute(getAllQuery, [id]);
    const response = {
      user: {
        id: result.rows[0].id,
        email: result.rows[0].email,
        username: result.rows[0].username,
        request: {
          type: 'GET',
          url: `http:localhost:3000/users`,
          description: 'Return all users',
        },
      },
    };

    return resp.status(200).send({ response });
  } catch (error) {
    return resp.status(500).send({ error: error.stack });
  }
};

exports.removeById = async (req, resp) => {
  const getByIdQuery = `SELECT *
           FROM users
          WHERE id = $1`;

  const deleteByIdQuery = `
        DELETE FROM users
              WHERE id= $1`;
  try {
    const { id } = req.params;
    const verifyId = await pool.execute(getByIdQuery, [id]);
    if (!verifyId.rowCount) {
      return resp.status(404).send({
        message: `User not found for id: ${id}`,
      });
    }

    await pool.execute(deleteByIdQuery, [id]);
    const response = {
      message: `User with id ${id} deleted sucessfully!`,
      request: {
        type: 'POST',
        url: 'http:localhost:3000/users',
        description: 'Register a new user',
        body: {
          username: 'String',
          email: 'String',
        },
      },
    };
    return resp.status(202).send(response);
  } catch (error) {
    return resp.status(500).send({ error });
  }
};

exports.update = async (req, resp) => {
  const getByIdQuery = `
        SELECT * FROM users
                WHERE id = $1`;
  const updateQuery = `
        UPDATE users
           SET username = $1,
               email = $2
         WHERE id = $3;
          `;
  try {
    const { username, email } = req.body;
    const { id } = req.params;

    const verifyId = await pool.execute(getByIdQuery, [id]);
    if (!verifyId.rowCount) {
      return resp.status(404).send({
        message: `User not found for id: ${id}`,
      });
    }

    const result = await pool.execute(updateQuery, [username, email, id]);
    const response = {
      message: 'User updated sucessfully!',
      updatedOrder: {
        id,
        username,
        email,
        request: {
          type: 'GET',
          url: 'http:localhost:3000/users',
          description: 'List all users',
        },
      },
    };

    return resp.status(202).send({ response });
  } catch (error) {
    console.log(error);
    return resp.status(500).send(error.stack);
  }
};
