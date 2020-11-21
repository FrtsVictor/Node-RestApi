const express = require("express");
const UserController = require("./controllers/UserController");
const AdressController = require("./controllers/AdressController");
const TechController = require("./controllers/TechController");
const ReportController = require("./controllers/ReportController");

const routes = express.Router();

routes.get("/users", UserController.index);
routes.post("/users", UserController.Store);

routes.get("/users/:user_id/addresses", AdressController.index);
routes.post("/users/:user_id/addresses", AdressController.Store);

routes.get("/users/:user_id/techs", TechController.index);
routes.post("/users/:user_id/techs", TechController.Store);
routes.delete("/users/:user_id/techs", TechController.delete);

routes.get("/Report", ReportController.show);

module.exports = routes;
