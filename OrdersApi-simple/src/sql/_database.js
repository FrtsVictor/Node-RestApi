const { Pool } = require("pg");
const env = require("dotenv");

const pool = new Pool({
  user: "postgres", //process.env.PSQL_USER,
  password: "123321''", //process.env.PSQL_PASSWORD,
  host: "localhost", //process.env.PSQL_HOST,
  database: "ecommerce", //process.env.PSQL_DATABASE,
  port: 5432, // process.env.PSQL_PORT,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
