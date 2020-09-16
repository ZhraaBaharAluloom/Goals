const User = require("./User");
const Profile = require("./Profile");
const Goal = require("./Goal");

// User & Profile
User.hasOne(Profile, {
  as: "profile",
  foreignKey: "userId",
});
Profile.belongsTo(User, { as: "user" });

// Goals & Profiles
Goal.belongsToMany(Profile, { through: "Progress", foreignKey: "goalId" });
Profile.belongsToMany(Goal, { through: "Progress", foreignKey: "profileId" });

module.exports = { User, Profile, Goal };
