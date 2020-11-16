/* eslint-disable camelcase */
const pool = require('../sql/_database');

exports.getAll = async (req, resp) => {
  const getAllQuery = `
       SELECT ord.id,
              ord.qtt,
              pdt.name,
              pdt.price,
              ord.order_date
        FROM orders ord
  INNER JOIN products pdt
          ON ord.id_product = pdt.id`;

  try {
    const result = await pool.execute(getAllQuery);
    const response = {
      totalItems: result.rows.length,
      orders: result.rows.map((order) => ({
        id: order.id,
        qtt: order.qtt,
        orderDate: order.order_date,
        product: {
          id_product: order.id_product,
          product_name: order.name,
          product_price: order.price,
        },
        request: {
          type: 'GET',
          url: `http:localhost:3000/orders/${order.id}`,
          description: 'Return product by id',
        },
      })),
    };

    return resp.status(200).send({ response });
  } catch (error) {
    return resp.status(500).send({ error });
  }
};

exports.getById = async (req, resp) => {
  const getByIdQuery = `
         SELECT ord.id,
                ord.qtt,
                pdt.name,
                pdt.price,
                ord.order_date
           FROM orders ord
     INNER JOIN products pdt
             ON ord.id_product = pdt.id
          WHERE ord.id = $1
              `;

  try {
    const { id } = req.params;

    const result = await pool.execute(getByIdQuery, [id]);
    if (!result.rowCount) {
      return resp.status(404).send({
        message: `Order not found for id: ${id}`,
      });
    }
    const response = {
      order: {
        id: result.rows[0].id,
        id_product: result.rows[0].id_product,
        qtt: result.rows[0].qtt,
        orderDate: result.rows[0].order_date,
        product: {
          product_name: result.rows[0].name,
          product_price: result.rows[0].price,
        },
        request: {
          type: 'GET',
          url: 'http:localhost:3000/orders',
          description: 'Return all orders',
        },
      },
    };
    return resp.status(200).send(response);
  } catch (error) {
    return resp.status(500).send({ error });
  }
};

exports.create = async (req, resp) => {
  const getByIdQuery = 'SELECT * FROM products WHERE id = $1';
  const postQuery = `
      INSERT INTO orders
                (
                  id_product,
                  qtt
                )
          VALUES ($1, $2)`;
  try {
    const { id_product, qtt } = req.body;
    const verifyId = await pool.execute(getByIdQuery, [id_product]);
    if (!verifyId.rowCount) {
      return resp.status(404).send({
        message: `Product not found for id: ${id_product}`,
      });
    }

    const result = await pool.execute(postQuery, [id_product, qtt]);
    const response = {
      message: 'Order created sucessfully!',
      createdOrder: {
        id: result.id,
        id_product,
        qtt,
        request: {
          type: 'GET',
          url: 'http:localhost:3000/orders',
          description: 'List all orders',
        },
      },
    };

    return resp.status(201).send({ response });
  } catch (error) {
    return resp.status(500).send({ error });
  }
};

exports.removeById = async (req, resp) => {
  const deleteByIdQuery = 'DELETE FROM orders WHERE  id= $1';
  const getByIdQuery = 'SELECT * FROM orders WHERE id = $1';

  try {
    const { id } = req.params;
    const verifyId = await pool.execute(getByIdQuery, [id]);
    if (!verifyId.rowCount) {
      return resp.status(404).send({
        message: `Order not found for id: ${id}`,
      });
    }

    await pool.execute(deleteByIdQuery, [id]);
    const response = {
      message: `Product with id ${id} deleted sucessfully!`,
      request: {
        type: 'POST',
        url: 'http:localhost:3000/orders',
        description: 'Create a brand new order',
        body: {
          id_product: 'Number',
          qtt: 'Number',
        },
      },
    };
    return resp.status(202).send(response);
  } catch (error) {
    return resp.status(500).send({ error });
  }
};

exports.update = async (req, resp) => {
  const getByIdQuery = 'SELECT * FROM products WHERE id = $1';
  const postQuery = `
      UPDATE orders
         SET id_product = $1,
             qtt = $2
       WHERE id = $3;
          `;
  try {
    const { id_product, qtt } = req.body;
    const { id } = req.params;

    const verifyId = await pool.execute(getByIdQuery, [id_product]);
    if (!verifyId.rowCount) {
      return resp.status(404).send({
        message: `Product not found for id: ${id_product}`,
      });
    }

    const result = await pool.execute(postQuery, [id_product, qtt, id]);
    const response = {
      message: 'Order updated sucessfully!',
      updatedOrder: {
        id: result.id,
        id_product,
        qtt,
        request: {
          type: 'GET',
          url: 'http:localhost:3000/orders',
          description: 'List all orders',
        },
      },
    };

    return resp.status(202).send({ response });
  } catch (error) {
    return resp.status(500).send(error.stack);
  }
};
