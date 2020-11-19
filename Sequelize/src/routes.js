const express = require("express");

const routes = express.Router();

routes.get("/", (req, resp) => {
  return resp.json({ hello: "World" });
});

module.exports = routes;
