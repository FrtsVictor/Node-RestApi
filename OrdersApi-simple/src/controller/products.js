const pool = require('../sql/_database');

exports.getAll = (req, resp) => {
  const getAllQuery = `
            SELECT * FROM products`;
  pool.connect((errConnect, conn) => {
    if (errConnect) return resp.status(500).send({ error: errConnect });
    conn.query(getAllQuery, (err, result) => {
      conn.release();
      if (err) return resp.status(500).send({ error: err });
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
    });
  });
};

exports.getById = (req, resp, next) => {
  const { id } = req.params;
  const getByIdQuery = `
            SELECT * FROM products
            WHERE id = $1`;

  pool.query(getByIdQuery, [id], (err, result) => {
    if (err) return err.status(500).send({ error: err });

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
  });
};

exports.create = (req, resp, next) => {
  console.log('req', req.user);
  let image = '';
  if (!req.file.path) {
    // image = req.file.path;
    console.log('img', image);
  }
  const { name, price, qtt_stock, description } = req.body;
  const postQuery = `
    INSERT INTO products
          (name, price, qtt_stock,
          description, image)
    VALUES ($1, $2, $3, $4, $5)`;

  pool.connect((errConnect, conn) => {
    if (errConnect) return resp.status(500).send({ errConnect });

    conn.query(
      postQuery,
      [name, price, qtt_stock, description, image],
      (errQuery, result) => {
        conn.release();
        if (errQuery) {
          return resp.status(500).send({ errQuery });
        }

        const response = {
          message: 'Product create sucessfully!',
          createdProduct: {
            id: result.id,
            name,
            description,
            price,
            qtt_stock,
            image,
            request: {
              type: 'GET',
              url: 'http:localhost:3000/products/',
              description: 'Return all products',
            },
          },
        };

        return resp.status(201).send({ response });
      }
    );
  });
};

exports.update = (req, resp, next) => {
  const { name, price, qtt_stock, description } = req.body;
  const { id } = req.params;
  const getByIdQuery = `
            SELECT * FROM products
            WHERE id = $1`;

  const patchQuery = `
          UPDATE products
             SET name = $1,
                 price = $2,
                 qtt_stock = $3,
                 description = $4
           WHERE id = $5`;

  pool.query(getByIdQuery, [id], (err, result) => {
    if (err) {
      return resp.status(500).send({ error: err });
    }

    if (!result.rowCount) {
      return resp.status(404).send({
        message: `Product not found for id: ${id}`,
      });
    }

    const { image } = result.rows[0];

    pool.query(
      patchQuery,
      [name, price, qtt_stock, description, id],
      (err, result) => {
        console.log('here');
        if (err) {
          return resp.status(500).send({ error: err });
        }

        const response = {
          message: 'Product updated sucessfully!',
          updatedProduct: {
            id: result.id,
            name,
            description,
            price,
            qtt_stock,
            image,
            request: {
              type: 'GET',
              url: `http:localhost:3000/products/${id}`,
              description: 'Create a brand new product',
            },
          },
        };
        return resp.status(202).send(response);
      }
    );
  });
};

exports.delete = (req, resp, next) => {
  const { id } = req.params;
  const deleteQuery = `
            DELETE FROM products
                  WHERE id=$1`;

  pool.query(deleteQuery, [id], (err, result) => {
    if (err) {
      return resp.status(500).send({ error: err });
    }

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
  });
};
