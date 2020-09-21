const { Category } = require("../db/models");

// rename to createCategory
// shortening everything isn't cleaner code
// sometimes it just makes things difficult to understand
exports.createCat = async (req, res, next) => {
  try {
    // newCategory
    // I don't want new cats. I already have four.
    const newCat = await Category.create(req.body);
    res.status(201).json(newCat);
  } catch (error) {
    next(error);
  }
};
