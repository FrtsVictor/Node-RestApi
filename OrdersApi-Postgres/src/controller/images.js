const pool = require('../sql/_database');

exports.delete = async (req, resp) => {
  const deleteQuery = 'DELETE FROM products_img WHERE id = $1';
  const verifyId = 'SELECT * FROM products_img WHERE id = $1';

  try {
    const { id } = req.params;
    const result = await pool.execute(verifyId, [id]);
    if (result.rows.length === 0) {
      return resp.status(404).send({ message: `Image not found for id ${id}` });
    }

    await pool.execute(deleteQuery, [id]);
    const response = {
      message: `Image with id ${id} deleted sucessfully!`,
      request: {
        type: 'POST',
        url: 'http:localhost:3000/products/id/img',
        description: 'Add a new image',
        body: {
          id_product: 'Number',
          path: 'String',
        },
      },
    };
    return resp.status(202).send(response);
  } catch (error) {
    return resp.status(500).send(error.stack);
  }
};
