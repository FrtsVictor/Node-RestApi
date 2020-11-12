const express = require("express");
const app = express();

const productsRoute = require("./routes/products");
const ordersRoute = require("./routes/orders");
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); //only simple data
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header(
    "Acess-Control-Allow-Header",
    "Content-Type",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Acess-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    return res.status(200).send({});
  }

  next();
});

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
