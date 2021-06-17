const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// READ Comment
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        id: req.params.id,
      },
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// CREATE comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    console.log(newComment);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});
// UPDATE Comment
router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update({
      comment: req.body.comment,
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE Comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
