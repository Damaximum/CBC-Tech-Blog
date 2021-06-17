const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// READ
router.get("/", withAuth, async (req, res) => {
  try {
    const dbPost = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = dbPost.map((post) => post.get({ plain: true }));

    res.render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// READ
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        // {
        //   model: Comment,
        //   attributes: ["id", "comment", "post_id", "user_id", "date_created"],
        //   include: {
        //     model: User,
        //     attributes: ["name"],
        //   },
        // },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("edit-post", { post, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE

router.get("/new", (req, res) => {
  res.render("postAdd");
});

module.exports = router;
