const User = require("./User");
const Profile = require("./Profile");
const Goal = require("./Goal");
const Progress = require("./Progress");

// The User has One Profile
User.hasOne(Profile, {
  as: "profile",
  foreignKey: "userId",
});
Profile.belongsTo(User, { as: "user" });

// REVIEW: doesn't it make more sense to have the relation between the User and the Goal?

// A Profile can track many Goals Through Progress
Profile.belongsToMany(Goal, { through: Progress, foreignKey: "profileId" });

// A Goal can be tracked by many Profiles Through Progress
Goal.belongsToMany(Profile, { through: Progress, foreignKey: "goalId" });

module.exports = { User, Profile, Progress, Goal };
