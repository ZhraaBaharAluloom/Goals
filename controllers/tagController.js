const { Tag } = require("../db/models");

exports.fetchCategoryTag = async (req, res, next) => {
  try {
    const categories = await Tag.findAll({ where: { catId: req.category.id } });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
