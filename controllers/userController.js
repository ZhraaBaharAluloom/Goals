const { User, Profile } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");
exports.signup = async (req, res, next) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const newProfile = await Profile.create({ userId: newUser.id });

    // Sign in after sign up

    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      profile: newProfile,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    console.log("exports.signup -> error", error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { user } = req;
    const profile = await Profile.findOne({ where: { userId: user.id } });
    const payload = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profile: profile,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.log("exports.signin -> error", error);
  }
};
