/* eslint-disable camelcase */
const pool = require('../sql/_database');

exports.getAll = async (req, resp) => {
  const getAllQuery = 'SELECT * FROM categories';
  try {
    const result = await pool.execute(getAllQuery);
    const response = {
      totalItems: result.rows.length,
      categories: result.rows.map((cat) => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        request: {
          type: 'GET',
          url: `http:localhost:3000/categories/${cat.id}`,
          description: 'Return category by id',
        },
      })),
    };
    return resp.status(200).send({ response });
  } catch (error) {
    return resp.status(500).send(error.stack);
  }
};

exports.create = async (req, resp) => {
  const postQuery = `
      INSERT INTO categories
                (
                  name,
                  description
                )
          VALUES ($1, $2)`;
  try {
    const { name, description } = req.body;

    const result = await pool.execute(postQuery, [name, description]);
    const response = {
      message: 'Category created sucessfully!',
      createdCategory: {
        id: result.id,
        name,
        description,
        request: {
          type: 'GET',
          url: 'http:localhost:3000/categories',
          description: 'List all categories',
        },
      },
    };

    return resp.status(201).send({ response });
  } catch (error) {
    return resp.status(500).send({ error });
  }
};
