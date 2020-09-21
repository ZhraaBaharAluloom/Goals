const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class Tag extends Model {}

Tag.init(
  {
    name: {
      type: DataTypes.STRING,
      defaultValue: "I am a Tag",
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Tag;
