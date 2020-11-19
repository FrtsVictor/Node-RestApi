const { Model, DataTypes } = require("sequelize");

class Addresses extends Model {
  static init(connection) {
    super.init(
      {
        zipcode: DataTypes.STRING,
        street: DataTypes.STRING,
        state: DataTypes.STRING,
        number: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
  // creating 1:N
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Addresses;
