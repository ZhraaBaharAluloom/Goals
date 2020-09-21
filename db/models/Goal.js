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
    ownerId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Goal;
