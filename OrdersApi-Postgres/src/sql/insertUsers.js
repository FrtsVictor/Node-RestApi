const db = require('./_database');

const insertUsers = async () => {
  console.log('test');

  const queryOrder = `
        INSERT INTO users
          (username, password, email)
        VALUES
          ('Jao', '123321', 'joao@gmail.com'),
          ('Pedro', '123321', 'pedro@gmail.com'),
          ('Maria', '123321', 'maria@gmail.com'),
          ('Eva','123321', 'eva@gmail.com');
          `;

  await db.execute(queryOrder);

  console.log('Orders insert OK');
  return;
};

insertUsers();
