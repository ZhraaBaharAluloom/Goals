const express = require("express");
const { fetchCategory } = require("../controllers/categoryController");
const { fetchCategoryTag } = require("../controllers/tagController");
const router = express.Router();

router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategory(categoryId, next);
  if (category) {
    req.category = category;
    next();
  } else {
    const err = new Error("Goal is not found");
    err.status = 404;
    next(err);
  }
});

router.get("/category/:categoryId", fetchCategoryTag);
module.exports = router;
