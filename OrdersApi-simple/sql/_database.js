const pg = require("pg");

const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ecommerce",
  password: "123321''",
  port: 5432,
});

module.exports = client;
