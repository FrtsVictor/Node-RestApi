module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "123321",
  database: "sequelize",
  define: {
    timestamps: true,
    underscored: true,
  },
};

// timestamps => created atob, updated at
// underscored: true, => SnakeCase
