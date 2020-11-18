const db = require('./_database');

const insertOrders = async () => {
  console.log('test');

  const queryOrder = `
        INSERT INTO orders
            (id_product, qtt)
        VALUES
            (1,7),
            (2,4),
            (3,1),
            (4,5),
            (5,6),
            (1,5);
          `;

  await db.execute(queryOrder);
  console.log('Orders insert OK');
};

insertOrders();
