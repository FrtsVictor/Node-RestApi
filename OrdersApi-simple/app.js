const express = require("express");
const app = express();

const productsRoute = require("./src/controller/products");
const ordersRoute = require("./src/controller/orders");
const morgan = require("morgan");
const bodyParser = require("body-parser");

var cors = require("cors");
app.use(cors());

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/products", productsRoute);
app.use("/orders", ordersRoute);

app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
