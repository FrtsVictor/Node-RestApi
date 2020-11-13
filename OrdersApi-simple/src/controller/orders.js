const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "GetAll orders",
  });
});

router.get("/:id_order", (req, res, next) => {
  const id = req.params.id_order;
  res.status(200).send({
    message: "get orders by id",
    id: id,
  });
});

router.post("/", (req, res, next) => {
  const order = {
    id_product: req.body.id_product,
    qtt: req.body.qtt,
  };
  res.status(201).send({
    message: "Add product sucessfull!",
    createdProduct: order,
  });
});

router.delete("/", (req, res, next) => {
  res.status(200).send({
    mesagem: "DELETE",
  });
});

module.exports = router;
