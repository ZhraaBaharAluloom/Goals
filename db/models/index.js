const User = require("./User");
const Profile = require("./Profile");

// User & Profile
User.hasOne(Profile, {
  as: "profile",
  foreignKey: "userId",
});

Profile.belongsTo(User, { as: "user" });

module.exports = { User, Profile };
