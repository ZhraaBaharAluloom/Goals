const { Profile, User, Goal } = require("../db/models");

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
          attributes: ["username", "firstName", "lastName"],
        },
        {
          model: Goal,
          attributes: ["id"],
        },
      ],
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
