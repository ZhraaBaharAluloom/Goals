const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class Goal extends Model {}

Goal.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    unitOfMeasure: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    target: {
      type: DataTypes.INTEGER,

      validate: {
        notEmpty: { msg: "Target is required" },
      },
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
