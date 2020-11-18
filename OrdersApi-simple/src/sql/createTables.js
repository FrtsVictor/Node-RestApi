const db = require('./_database');

const createTables = async () => {
  await db.connect();

  await db.query(`create table if not exists products(
        id serial primary key,
        name varchar(80) not null unique,
        price decimal (10,2) not null default 0,
        qtt_stock int not null default 0,
        description varchar(80) not null,
        image varchar(500)
        );`);

  await db.query(`create table if not exists orders (
    id serial primary key,
    id_product integer references products (id) on delete cascade not null,
    qtt integer not null,
    order_date date default current_date not null
    );`);

  await db.query(`create table if not exists users (
      id serial primary key,
      email varchar(100) not null unique,
      password varchar(200) not null,
      username varchar (50) not null unique
    )`);

  await db.query(`create table if not exists products_img (
      id serial primary key,
      id_product integer references products (id) on delete cascade not null,
      img_path VARCHAR (300)
      )`);

  await db.query(`create table if not exists categories(
        id serial PRIMARY key,
        name varchar(100) not null unique,
        description varchar(150) not null
    )`);

  await db.query('alter table products add column category_id int not null');

  await db.query('alter table products alter column category_id set not null');

  await db.query(
    'alter table products add constraint fk_product_category foreign key (category_id) references categories (id)'
  );

  await db.end();

  console.log('Created tables: orders & products');
};

createTables();
