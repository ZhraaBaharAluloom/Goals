const User = require("./User");
const Profile = require("./Profile");
const Goal = require("./Goal");
const Progress = require("./Progress");
const Category = require("./Category");
const Tag = require("./Tag");

// The User has One Profile
User.hasOne(Profile, {
  as: "profile",
  foreignKey: "userId",
});
Profile.belongsTo(User, { as: "user" });

// A Profile can track many Goals Through Progress
Profile.belongsToMany(Goal, {
  through: Progress,
  as: "goal",
  foreignKey: "profileId",
});

// A Goal can be tracked by many Profiles Through Progress
Goal.belongsToMany(Profile, {
  through: Progress,
  as: "profile",
  foreignKey: "goalId",
});

// A goal cen be categorized in many categories
Goal.belongsToMany(Category, { through: Tag, foreignKey: "goalId" });

// A category can have many goals
Category.belongsToMany(Goal, {
  through: Tag,
  foreignKey: "catId",
});

module.exports = { User, Profile, Progress, Goal, Category, Tag };
