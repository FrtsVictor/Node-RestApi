const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Adress = require("../models/Address");

const connection = new Sequelize(dbConfig);

User.init(connection);
Adress.init(connection);

Adress.associate(connection.models);
User.associate(connection.models);

module.exports = connection;
