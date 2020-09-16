const express = require('express');

const profileRoute = express.Router();
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

profileRoute.get('/', authCheck, (req, res) => {
  res.send('you are logged in, this is your profile - ' + req.user.username);
});

module.exports = profileRoute;
