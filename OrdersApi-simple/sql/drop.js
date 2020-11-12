const db = require("./_database");

const dropTables = async () => {
  await db.connect();
  await db.query("DROP TABLE orders CASCADE");
  await db.query("DROP TABLE products CASCADE");
  await db.end();

  console.log("Droped Tables: Orders/Products");
};

dropTables();
