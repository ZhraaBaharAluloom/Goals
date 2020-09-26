const { Category } = require("../db/models");

exports.categoryList = async (req, res, next) => {
  try {
    const categoriesList = await Category.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });
    res.json(categoriesList);
  } catch (error) {}
};

exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};
