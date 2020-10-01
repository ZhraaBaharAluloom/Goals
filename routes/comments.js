const express = require("express");
const router = express.Router();
const {
  fetchComment,
  commentList,
  commentUpdate,
} = require("../controllers/commentController");

// Param
router.param("commentId", async (req, res, next, commentId) => {
  const comment = await fetchComment(commentId, next);
  if (comment) {
    req.comment = comment;
    next();
  } else {
    const error = new Error("Comment Not Found");
    error.status = 404;
    next(error);
  }
});

// Comment List
router.get("/", commentList);

// Update Comment
router.put("/:commentId", commentUpdate);

module.exports = router;
