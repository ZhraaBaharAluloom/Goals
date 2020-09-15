const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "ENTER PASSWORD",
  database: "goals_db",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
