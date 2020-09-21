const { Goal, Profile, Progress, Category, Tag } = require("../db/models");

exports.fetchGoal = async (goalId, next) => {
  try {
    const goal = await Goal.findByPk(goalId);
    return goal;
  } catch (error) {
    next(error);
  }
};

/**
 * Do you need this controller?
 */
exports.findGoal = async (req, res, next) => {
  try {
    // here you're using the goal object's ID to find the goal object with that ID
    // it's like you're grabbing Mike's hand and asking people to find the person with that hand.
    // you're holding Mike's hand, that's the person with that hand.
    // you have the goal object, no need to findByPk.
    const goal = await Goal.findByPk(req.goal.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(goal);
  } catch (error) {
    next(error);
  }
};

exports.goalList = async (req, res, next) => {
  try {
    const goals = await Goal.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Category,
      },
    });
    res.json(goals);
  } catch (error) {
    next(error);
  }
};

exports.createGoal = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${req.file.filename}`;
    }
    // rename to profile
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    const newGoal = await Goal.create(req.body);

    // when would there not be a category?
    if (req.body.category) {
      // rename to category
      // why is req.body.category the category name not the category object?
      const fetchCategory = await Category.findOne({
        where: { name: req.body.category },
      });
      // as I mentioned earlier, do not create categories in this controller.
      if (fetchCategory) {
        // rename to categoryId
        const _catId = fetchCategory.id;
        // if newTag isn't being used, don't store it in a variable
        // most of this code is repeated with the code in the else
        // how can you avoid repeating yourself?
        const newTag = await Tag.create({
          goalId: newGoal.id,
          catId: _catId,
        });
      } else {
        const newCategory = {
          name: req.body.category,
        };
        const newCat = await Category.create(newCategory);
        const _catId = newCat.id;
        const newTag = await Tag.create({
          goalId: newGoal.id,
          catId: _catId,
          name: newCat.name,
        });
      }
    }

    // const not being used
    const newProgress = await Progress.create({
      goalId: newGoal.id,
      profileId: foundProfile.id,
    });

    res.status(201).json(newGoal);
  } catch (error) {
    next(error);
  }
};

exports.updateGoal = async (req, res, next) => {
  try {
    // why find the progress to update the goal?
    const foundGoal = await Progress.findOne({
      where: { goalId: req.goal.id },
    });
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });

    if (foundGoal.profileId === foundProfile.id) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${req.file.filename}`;
      }
      await req.goal.update(req.body);
      res.status(201).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteGoal = async (req, res, next) => {
  try {
    // again, why find progress to delete goal?
    const foundGoal = await Progress.findOne({
      where: { goalId: req.goal.id },
    });
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    if (foundGoal.profileId === foundProfile.id) {
      // this means that anyone following any goal can
      // delete that goal and ruin it for everyone
      await req.goal.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.followGoal = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    // no need to find goal
    const foundGoal = await Goal.findByPk(req.goal.id);
    const newProgress = await Progress.create({
      goalId: foundGoal.id,
      profileId: foundProfile.id,
      // you're creating here, no need to exclude anything.
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    res.status(201).json(newProgress);
  } catch (error) {
    next(error);
  }
};
