const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class Profile extends Model { }

Profile.init(
  {
    // this is a calculated field, no need to have it in the model.
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
