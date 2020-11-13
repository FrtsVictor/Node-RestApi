const express = require("express");
const router = express.Router();
const pool = require("../sql/_database");

router.get("/", (request, response, next) => {
  const getAllQuery = `SELECT * FROM products`;

  pool.query(getAllQuery, (err, resp) => {
    if (err) return response.status(500).send({ error: err });
    return response.status(200).send({
      response: resp.rows,
    });
  });
});

router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  const getByIdQuery = `SELECT * FROM products WHERE id = $1`;
  pool.query(getByIdQuery, [id], (err, res) => {
    if (err) return err.status(500).send({ error: err });
    return response.status(200).send(res.rows);
  });
});

router.post("/", (request, response) => {
  const { name, price, qtt_stock, description } = request.body;
  const postQuery = `INSERT INTO products 
    (name, price, qtt_stock, description)
    VALUES ($1, $2, $3, $4)`;
  pool.query(postQuery, [name, price, qtt_stock, description], (err, res) => {
    if (err) {
      return response.status(500).send({ error: err });
    }
    response.status(201).send({ name, price, qtt_stock, description });
  });
});

router.put("/:id", (request, response, next) => {
  const { name, price, qtt_stock, description } = request.body;
  const { id } = request.params;
  const patchQuery = `UPDATE products SET
  name = $1, 
  price = $2, 
  qtt_stock = $3,
  description = $4
  WHERE id = $5`;
  pool.query(
    patchQuery,
    [name, price, qtt_stock, description, id],
    (err, res) => {
      if (err) {
        return response.status(500).send({ error: err });
      }
      response.status(200).send({ name, price, qtt_stock, description, id });
    }
  );
});

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;
  const deleteQuery = `DELETE FROM products WHERE id=$1`;

  pool.query(deleteQuery, [id], (err, rep) => {
    if (err) {
      return response.status(500).send({ error: err });
    }

    response.status(200);
  });
});

module.exports = router;
