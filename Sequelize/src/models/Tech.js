const { Model, DataTypes } = require("sequelize");

class Tech extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        tableName: "techs",
        sequelize: connection,
      }
    );
  }
  // creating 1:N
  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: "tech_id",
      through: "user_techs",
      as: "users",
    });
  }
}

module.exports = Tech;

//trought where i connect tle tech_id on table
