const { Profile, User, Goal, Progress } = require("../db/models");

exports.fetchProfiles = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};

exports.fetchUserProfile = async (req, res, next) => {
  try {
    const userProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });

    res.json(userProfile);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    await foundProfile.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Used for Testing Only.

exports.profileList = async (req, res, next) => {
  try {
    const profile = await Profile.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        },
        {
          model: Goal,
          as: "goal",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
