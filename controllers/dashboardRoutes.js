//Edit and delete
// Create blog
// View their blogs (base route of the dashboard)
// pass loggedIn value so logged out users cant access this page
const router = require('express').Router();
const 

router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
              // logged_in: req.session.logged_in,

      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;