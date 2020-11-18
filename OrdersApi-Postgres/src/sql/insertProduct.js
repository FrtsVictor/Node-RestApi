const db = require('./_database');

const insertProducts = async () => {
  console.log('test');
  const queryProduct = `INSERT INTO products
  ("name", price, qtt_stock, description, image, category_id)
     VALUES
     ('Xiaomi Mi8 Plus', 1500.9, 10, 'Xiaomi Mi8 Plus 120GB HD 6GB RAM', '', 3),
     ('Xiaomi Mi9 PlusC', 1700.9, 10, 'Xiaomi Mi9 PlusC 180GB HD 8GB RAM', '', 3),
     ('Xiaomi RedmeNote Pro', 1450.9, 10, 'Xiaomi Pro 220GB HD, 8GB RAM', '', 3),
     ('World Of Warcraft', 150.00, 10, 'MMRO RPG TARGET', '', 2),
     ('Tera', 160.00, 10, 'MMRO ACTION RPG', '', 2),
     ('Black OPS', 120, 10, 'FPS Game', '', 1 ),
     ('CODE', 100, 10, 'FPS Game CODE', '', 1);
    `;
  await db.execute(queryProduct);

  console.log('Insert products ok');
};

insertProducts();
