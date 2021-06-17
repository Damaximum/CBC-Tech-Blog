const router = require("express").Router();
const { Post, Comment, User } = require("../models");

// READ All Posts
router.get("/", async (req, res) => {
  try {
    const dbPost = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const posts = dbPost.map((post) => post.get({ plain: true }));

    res.render("homepage", { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// READ a specific Post by ID with Comments
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["comment", "date_created", "user_id"],
          include: [User],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("postPage", { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    } else {
      res.render("login");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.render("homepage");
    } else {
      res.render("signup");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
