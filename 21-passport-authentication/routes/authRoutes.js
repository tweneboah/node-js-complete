const passport = require('passport');

const router = require('express').Router();

// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out');
});

// auth with google+
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

//Callback for google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});

module.exports = router;
