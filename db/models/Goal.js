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
    },
    unitOfMeasure: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
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
