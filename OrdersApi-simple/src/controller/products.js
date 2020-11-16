/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const pool = require('../sql/_database');

exports.getAll = async (req, resp) => {
  const getAllQuery = 'SELECT * FROM products';
  try {
    const result = await pool.execute(getAllQuery);
    const response = {
      totalItems: result.rows.length,
      products: result.rows.map((pdt) => ({
        id: pdt.id,
        name: pdt.name,
        description: pdt.description,
        price: pdt.price,
        qtt_stock: pdt.qtt_stock,
        request: {
          type: 'GET',
          url: `http:localhost:3000/products/${pdt.id}`,
          description: 'Return products by id',
        },
      })),
    };
    return resp.status(200).send({ response });
  } catch (error) {
    return resp.status(500).send(error.stack);
  }
};

exports.getById = async (req, resp) => {
  const getByIdQuery = 'SELECT * FROM products WHERE id = $1';

  try {
    const { id } = req.params;

    const result = await pool.execute(getByIdQuery, [id]);
    if (!result.rowCount) {
      return resp.status(404).send({
        message: `Product not found for id: ${id}`,
      });
    }

    const response = {
      product: {
        id: result.rows[0].id,
        name: result.rows[0].name,
        description: result.rows[0].description,
        price: result.rows[0].price,
        qtt_stock: result.rows[0].qtt_stock,
        image: result.rows[0].image,
        request: {
          type: 'GET',
          url: 'http:localhost:3000/products/',
          description: 'Return all products',
        },
      },
    };

    return resp.status(200).send(response);
  } catch (error) {
    return resp.status(500).send(error.stack);
  }
};

exports.create = async (req, resp) => {
  const postQuery = `
        INSERT INTO products
                  (
                    name,
                    price,
                    qtt_stock,
                    description,
                    image
                  )
          VALUES  (
                    $1, $2, $3, $4, $5
                   )`;

  try {
    const { name, price, qtt_stock, description } = req.body;
    const result = await pool.execute(postQuery, [
      name,
      price,
      qtt_stock,
      description,
      req.file.path,
    ]);

    const response = {
      message: 'Product create sucessfully!',
      createdProduct: {
        id: result.id,
        name,
        description,
        price,
        qtt_stock,
        image: req.file.path,
        request: {
          type: 'GET',
          url: 'http:localhost:3000/products/',
          description: 'Return all products',
        },
      },
    };
    return resp.status(201).send(response);
  } catch (error) {
    console.log(error);
    return resp.status(500).send(error.stack);
  }
};

exports.update = async (req, resp) => {
  const getByIdQuery = 'SELECT * FROM products WHERE id = $1';

  const patchQuery = `
        UPDATE products
           SET name = $1,
               price = $2,
               qtt_stock = $3,
               description = $4
         WHERE id = $5`;

  try {
    const { name, price, qtt_stock, description } = req.body;
    const { id } = req.params;

    const verifyId = await pool.execute(getByIdQuery, [id]);
    if (!verifyId.rowCount) {
      return resp.status(404).send({
        message: `Product not found for id: ${id}`,
      });
    }

    const result = await pool.execute(patchQuery, [
      name,
      price,
      qtt_stock,
      description,
      id,
    ]);

    const response = {
      message: 'Product updated sucessfully!',
      updatedProduct: {
        id: result.id,
        name,
        description,
        price,
        qtt_stock,
        request: {
          type: 'GET',
          url: `http:localhost:3000/products/${id}`,
          description: 'Create a brand new product',
        },
      },
    };
    return resp.status(202).send(response);
  } catch (error) {
    return resp.status(500).send(error);
  }
};

exports.delete = async (req, resp) => {
  const deleteQuery = 'DELETE FROM products WHERE id=$1';

  try {
    const { id } = req.params;
    await pool.execute(deleteQuery, [id]);
    const response = {
      message: `Product with id ${id} deleted sucessfully!`,
      request: {
        type: 'POST',
        url: 'http:localhost:3000/products',
        description: 'Create a brand new product',
        body: {
          name: 'String',
          description: 'String',
          price: 'Number',
          qtt_stock: 'Number',
        },
      },
    };
    return resp.status(202).send(response);
  } catch (error) {
    return resp.status(500).send(error.stack);
  }
};

exports.uploadImage = async (req, resp) => {
  const postQuery = `
        INSERT INTO products_img
                  ( id_product, img_path)
          VALUES  ( $1, $2 )`;
  try {
    const result = await pool.execute(postQuery, [
      req.params.id,
      req.file.path,
    ]);
    const response = {
      message: 'Image uploaded sucessfully!',
      uploadedImage: {
        id_img: result.id,
        id_product: req.params.id_product,
        image_path: req.file.path,
        request: {
          type: 'GET',
          url: 'http:localhost:3000/products/',
          description: 'Return all products',
        },
      },
    };
    return resp.status(201).send(response);
  } catch (error) {
    console.log(error);
    return resp.status(500).send({ errrodoido: error.stack });
  }
};
