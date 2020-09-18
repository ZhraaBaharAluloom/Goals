const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class Goal extends Model {}

Goal.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    quantifiableUnits: {
      type: DataTypes.STRING,
    },
    unitOfMeasure: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    target: {
      type: DataTypes.INTEGER,
    },
    // REVIEW: Isn't the category supposed to be its own model?
    category: {
      type: DataTypes.STRING,
    },
    // REVIEW: How is the popularity calculated?
    popularity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Goal;
