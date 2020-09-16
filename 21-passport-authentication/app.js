const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const app = express();

const authRoutes = require('./routes/authRoutes');
const passportSetUp = require('./config/passport-config');
const keys = require('./config/keys');
const passport = require('passport');
const profileRoute = require('./routes/profileRoute');

mongoose.connect(keys.mongoURI);

//view
app.set('view engine', 'ejs');

//Configure passport to use cookies
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cookieSession({
    maxAge: 24 * 6 * 60 * 1000,
    keys: keys.cookieKeys,
  })
);

//home route
app.get('/', (req, res) => {
  res.render('home');
});

//set routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoute);
app.listen(5000, () => {
  console.log('Server is running');
});
