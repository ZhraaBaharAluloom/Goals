const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    percentage: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "#57348A",
    },
    legendFontColor: {
      type: DataTypes.STRING,
      defaultValue: "#57348A",
    },
    legendFontSize: {
      type: DataTypes.INTEGER,
      defaultValue: 12,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Category;
