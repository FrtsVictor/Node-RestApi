const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "Get at products route",
  });
});

router.get("/:id_produto", (req, res, next) => {
  const id = req.params.id_produto;

  if (id == "spec") {
    res.status(200).send({
      message: "teste",
      id: id,
    });
  } else {
    res.status(200).send({
      message: "get by id",
    });
  }

  res.status(200).send({
    message: "get one",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).send({
    mesagem: "post",
  });
});

router.patch("/", (req, res, next) => {
  res.status(201).send({
    mesagem: "Patch",
  });
});

router.delete("/", (req, res, next) => {
  res.status(200).send({
    mesagem: "DELETE",
  });
});

module.exports = router;
