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

exports.update = async (req, resp) => {
  const getByIdQuery = 'SELECT * FROM categories WHERE id = $1';

  const patchQuery = `
        UPDATE categories
           SET name = $1,
               description = $2
         WHERE id = $3`;

  try {
    const { name, description } = req.body;
    const { id } = req.params;

    const verifyId = await pool.execute(getByIdQuery, [id]);
    if (!verifyId.rowCount) {
      return resp.status(404).send({
        message: `Caregory not found for id: ${id}`,
      });
    }

    const result = await pool.execute(patchQuery, [name, description, id]);

    const response = {
      message: 'Category updated sucessfully!',
      updatedProduct: {
        id: result.id,
        name,
        description,
        request: {
          type: 'GET',
          url: `http:localhost:3000/categories`,
          description: 'List all categories',
        },
      },
    };
    return resp.status(202).send(response);
  } catch (error) {
    return resp.status(500).send(error);
  }
};

exports.delete = async (req, resp) => {
  const deleteQuery = 'DELETE FROM categories WHERE id=$1';

  const getByIdQuery = 'SELECT * FROM categories WHERE id = $1';

  try {
    const { id } = req.params;
    const verifyId = await pool.execute(getByIdQuery, [id]);
    if (!verifyId.rowCount) {
      return resp.status(404).send({
        message: `Caregory not found for id: ${id}`,
      });
    }

    await pool.execute(deleteQuery, [id]);
    const response = {
      message: `Category with id ${id} deleted sucessfully!`,
      request: {
        type: 'POST',
        url: 'http:localhost:3000/categories',
        description: 'Create a brand new category',
        body: {
          name: 'String',
          description: 'String',
        },
      },
    };
    return resp.status(202).send(response);
  } catch (error) {
    return resp.status(500).send(error.stack);
  }
};
