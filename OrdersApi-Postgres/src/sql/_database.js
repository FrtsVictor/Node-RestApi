const { Pool } = require('pg');
const env = require('dotenv');

const pool = new Pool({
  connectionLimit: 1000,
  user: 'postgres',
  password: "123321''",
  host: 'localhost',
  database: 'ecommerce',
  port: 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

exports.execute = (query, params = []) =>
  new Promise((resolve, reject) => {
    pool.query(query, params, (errQuery, result) => {
      if (errQuery) {
        console.log('errQuery', errQuery);
        reject(errQuery.stack);
      }
      console.log('result', result);
      return resolve(result);
    });
  });
exports.pool = pool;
