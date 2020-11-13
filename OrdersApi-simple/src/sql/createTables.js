const db = require("./_database");

const createTables = async () => {
  await db.connect();

  await db.query(`create table products(
        id serial primary key,
        name varchar(80) not null unique,
        price decimal (10,2) not null default 0,
        qtt_stock int not null default 0, 
        description varchar(80) not null
        );`);

  await db.query(`create table orders (
    id serial primary key, 
    id_product integer references products (id) on delete cascade not null,
    qtt integer not null,
    order_date date default current_date not null
    );`);

  await db.end();

  console.log("Created tables: orders & products");
};

createTables();
