const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Comment extends Model {}

Comment.init(
  {
    comment: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Comment;
