const express = require("express");
const router = express.Router();
const pool = require("../sql/_database");

router.get("/", (req, resp, next) => {
  const getAllQuery = `SELECT * FROM orders`;

  pool.query(getAllQuery, (err, result) => {
    if (err) return resultonse.status(500).send({ error: err });
    const response = {
      totalItems: result.rows.length,
      orders: result.rows.map((order) => {
        return {
          id: order.id,
          id_product: order.id_product,
          qtt: order.qtt,
          orderDate: order.order_date,
          request: {
            type: "GET",
            url: "http:localhost:3000/orders/" + order.id,
            description: "Return product by id",
          },
        };
      }),
    };

    return resp.status(200).send({ response });
  });
});

router.get("/:id", (req, resp, next) => {
  const { id } = req.params;
  const getByIdQuery = `SELECT * FROM orders WHERE id = $1`;
  pool.query(getByIdQuery, [id], (err, result) => {
    if (err) return err.status(500).send({ error: err });

    if (!result.rowCount) {
      return resp.status(404).send({
        message: "Order not found for id: " + id,
      });
    }

    const response = {
      order: {
        id: result.rows[0].id,
        id_product: result.rows[0].id_product,
        qtt: result.rows[0].qtt,
        orderDate: result.rows[0].order_date,
        request: {
          type: "GET",
          url: "http:localhost:3000/orders",
          description: "Return all orders",
        },
      },
    };

    return resp.status(200).send(response);
  });
});

router.post("/", (req, resp, next) => {
  const { id_product, qtt } = req.body;

  const postQuery = `INSERT INTO orders 
  (id_product, qtt)
  VALUES ($1, $2)`;

  pool.query(postQuery, [id_product, qtt], (err, result) => {
    if (err) {
      return resp.status(500).send({ error: err });
    }

    const response = {
      message: "Order created sucessfully!",
      createdOrder: {
        id: result.id,
        id_product,
        qtt,
        request: {
          type: "GET",
          url: "http:localhost:3000/orders",
          description: "List all orders",
        },
      },
    };

    return resp.status(201).send({ response });
  });
});

router.delete("/:id", (req, resp, next) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM orders WHERE id= $1`;
  const getByIdQuery = `SELECT * FROM orders WHERE id = $1`;

  pool.query(getByIdQuery, [id], (err, result) => {
    if (err) return err.status(500).send({ error: err });

    if (!result.rowCount) {
      return resp.status(404).send({
        message: "Order not found for id: " + id,
      });
    }

    pool.query(deleteQuery, [id], (err, result) => {
      if (err) {
        return resp.status(500).send({ error: err });
      }

      const response = {
        message: "Product with id " + id + " deleted sucessfully!",
        request: {
          type: "POST",
          url: "http:localhost:3000/orders",
          description: "Create a brand new order",
          body: {
            id_product: "Number",
            qtt: "Number",
          },
        },
      };

      return resp.status(202).send(response);
    });
  });
});

module.exports = router;
