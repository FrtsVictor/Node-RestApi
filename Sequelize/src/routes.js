const express = require("express");
const UserController = require("./controllers/UserController");
const AdressController = require("./controllers/AdressController");

const routes = express.Router();

routes.get("/users", UserController.index);
routes.post("/users", UserController.Store);

routes.get("/users/:user_id/addresses", AdressController.index);
routes.post("/users/:user_id/addresses", AdressController.Store);

module.exports = routes;
