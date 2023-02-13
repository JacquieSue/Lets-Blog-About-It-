const router = require("express").Router();
const { Blog, User } = require("../models");
const withAuth = require("../utils/auth");
// We do not need to pass the logged in trait because logged out users can view the homepage, just not a dashboard

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      layout: 'main',
      blogs,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// replicate the route above, but run find where id = req.params.id
router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        //also include comment model
      ],
    });

    const blog = blogData.get({ plain: true });
    // console.log(blog);

    res.render("single-post", {
      layout: 'main',
      blog,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });
    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
