const pool = require("./_database");

const insertOrders = async () => {
  await pool.connect();

  const queryOrder = "INSERT INTO orders (id_product, qtt) VALUES($1, $2)";

  await pool.query(queryOrder, [3, 2]);
  await pool.query(queryOrder, [5, 1]);
  await pool.query(queryOrder, [6, 5]);
  await pool.query(queryOrder, [7, 12]);
  await pool.query(queryOrder, [8, 3]);

  await pool.end();

  console.log("Orders insert OK");
};

insertOrders();
