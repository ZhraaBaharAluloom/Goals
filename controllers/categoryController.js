const { Category } = require("../db/models");
const Goal = require("../db/models/Goal");
const { goalList } = require("./goalController");
const randomColor = require("randomcolor");

exports.fetchCategory = async (categoryId, next) => {
  try {
    const category = await Category.findByPk(categoryId);
    return category;
  } catch (error) {
    next(error);
  }
};

exports.categoryList = async (req, res, next) => {
  try {
    const categoriesList = await Category.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
      include: {
        model: Goal,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    res.json(categoriesList);
  } catch (error) {
    console.log("exports.categoryList -> error", error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    const totalCategories = await Category.findAll();
    const sameCategory = await Category.findAll({
      where: { id: req.category.catId },
    });
    req.body.color = randomColor();
    req.body.legendFontColor = req.body.color;
    req.body.percentage = (sameCategory.length / totalCategories.length) * 100;
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};
