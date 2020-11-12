const express = require("express");
const app = express();

const productsRoute = require("./routes/products");
const ordersRoute = require("./routes/orders");
const morgan = require("morgan");

app.use(morgan("dev"));

app.use("/products", productsRoute);
app.use("/orders", ordersRoute);

//If no routes
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

// nodemon --inspect ./server.js 80
