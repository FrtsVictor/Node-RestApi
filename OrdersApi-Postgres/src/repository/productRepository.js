const postQuery =
  "INSERT INTO products (name, price, qtt_stock, description) VALUES ($1, $2, $3, $4)";
const getAllQuery = "SELECT * FROM products";
const getByIdQuery = "SELECT * FROM products WHERE id = $id";
