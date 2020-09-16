const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Progress extends Model {}

Progress.init(
  {
    targetProgress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize: db }
);

module.exports = Progress;
