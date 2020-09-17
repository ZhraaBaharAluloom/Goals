const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class Profile extends Model {}

// REVIEW: isn's this part of the table between the profile and goals?
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
