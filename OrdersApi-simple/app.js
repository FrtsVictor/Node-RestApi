const express = require("express");
const productsRoute = require("./src/controller/products");
const ordersRoute = require("./src/controller/orders");
const bodyParser = require("body-parser");
const morgan = require("morgan");
var cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use("/products", productsRoute);
app.use("/orders", ordersRoute);
app.use("/uploads", express.static("uploads")); //setting upload directory public

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
