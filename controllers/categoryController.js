const { Category } = require("../db/models");

exports.createCat = async (req, res, next) => {
  try {
    const newCat = await Category.create(req.body);
    res.status(201).json(newCat);
  } catch (error) {
    next(error);
  }
};
