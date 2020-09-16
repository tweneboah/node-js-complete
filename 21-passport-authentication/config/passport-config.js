const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  //The user from mongoose is the user
  done(null, user.id);
  //It will attach cookies to this user
});

//Deserialize and take the id from the cookie
//We have access to the id because that's what the serialize used to attach the cookie
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user.id);
});

// //create strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       //options to start google strategies
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: 'http://localhost:5000/auth/google/callback',
//     },
//     //   Passport callback function. This will take the user and give it to serialize to attach cookies to it
//     async (accessToken, refreshToken, profile, done) => {
//       const userExist = await User.findOne({ googleID: profile.id });
//       if (userExist) {
//         console.log('You already exist', userExist);
//         done(null, userExist); //It is done so move to serialize
//       }
//       const user = new User({
//         googleID: profile.id,
//         name: 'Emmma',
//       });

//       await user.save();
//       done(null, user);
//       console.log(user);
//     }
//   )
// );

//Redirect url in Google
//1. This is the path google will send the client back to our site after the user has grant the permission
// http://localhost:5000/auth/google/callback

//You must pass this same url to the config file
//We need to create a route for this path in our routes folder too

//====STARTING THE LOGIN===

// we need to create a route that will trigger the flow for the client to grant permission. The route should take passport.authenticate('google) as a middleware

//Before that we need to make sure this config file is runing in the main file by just requiring it

//Then when we start the auth flow and after the client has grant permissions, Google will send a code attach to the client and we can access that in the callback of our configuration above but before that we have to pass passport.authenticate('google') as a middleware to the callback we created for google and our route

//We will create User model to save the user and check if the user exist

//serialize the user

//Take the id of the user from the callback and add cookies to it. We will not use googleId because in the future if we implement facebook hence it will cause bugs therefore we will use the id mongoose gave

//Serialiaze will take this id and pass on and stuff it with cookies

//Deserialiser: when a user make request this will take the cookie and grab the user

//Attach cookies to the user user

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          // already have this user
          console.log('user is: ', currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            googleId: profile.id,
            name: profile.displayName,
          })
            .save()
            .then(newUser => {
              console.log('created new user: ', newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
