const { Comment, Goal } = require("../db/models");

// Fetch Comments
exports.fetchComment = async (commentId, next) => {
  try {
    const comment = await Comment.findByPk(commentId, {
      include: {
        model: Goal,
        as: "Goal",
        attributes: ["title"],
      },
    });
    return comment;
  } catch (error) {
    next(error);
  }
};

// List of Comments
exports.commentList = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Goal,
          as: "goal",
        },
      ],
    });
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// Update a Comment
exports.commentUpdate = async (req, res, next) => {
  try {
    await req.comment.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
