const db = require('./_database');

const dropTables = async () => {
  await db.execute('DROP TABLE IF EXISTS orders CASCADE');
  await db.execute('DROP TABLE IF EXISTS products CASCADE');
  await db.execute('DROP TABLE IF EXISTS products_img CASCADE');
  await db.execute('DROP TABLE IF EXISTS users CASCADE');
  await db.execute('DROP TABLE IF EXISTS categories CASCADE');

  console.log('Droped ALL Tables sucessfully');
  return;
};

dropTables();
