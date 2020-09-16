const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class Profile extends Model {}

Profile.init(
  {
    overallProgress: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Profile;
