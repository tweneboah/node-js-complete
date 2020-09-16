const express = require('express');
const multer = require('multer');
const User = require('../db/models/user');
const auth = require('../middlewares/auth');

const upload = multer({
  dest: 'avatar',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    // req: req object
    //file: details about the file uploaded
    //cb: tells multer when we are done

    // cb(new Error('File must be a pdf')); //When there is error
    // cb(undefined, true); //When it was sccessful
    // cb(undefined, false) //Reject the upload

    // if (!file.originalname.endsWith('.pdf') || !file.originalname.endsWith('.pdf') || !file.originalname.endsWith('.pdf')) {
    //   return cb(new Error('Pease upload pdf'));
    // }

    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Pease upload a word document'));
    }
    cb(undefined, true);
  },
});

const userRouter = express.Router();

userRouter.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const tokens = await user.generateAuthTokens(user.id);
    user.tokens = tokens;
    const userCreated = await user.save();
    res.send({ userCreated, tokens });
  } catch (error) {
    res.status(400).send(error);
  }
});

//Image upload

userRouter.post(
  '/users/me/avatar',
  upload.single('avatar'),
  async (req, res) => {
    res.send('Images send well');
  }
);

userRouter.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

// PROFILE
userRouter.get('/users/me', auth, async (req, res) => {
  console.log(req.token);
  try {
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

//logout
userRouter.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = undefined;
    await req.user.save();

    res.send('You have logout');
  } catch (error) {}
});
userRouter.get('/users/:userId', async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);

    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

//Updating your own profile
//We will use the existing user instead of fetching a new one, hence we will use req.user

userRouter.patch('/users/me', auth, async (req, res) => {
  //Checking if the fields to be updated are allowed
  const updates = Object.keys(req.body);
  const allowUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update => {
    return allowUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid update' });
  }

  try {
    updates.forEach(updateFields => {
      req.user[updateFields] = req.body[updateFields];
    });
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();

    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.post('/users/login', async (req, res) => {
  //find email and password
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthTokens(user.id);
    user.tokens = token;
    await user.save();
    res.send({ user: user.getPublicProfiles(), token: token });
  } catch (error) {
    res.send(error);
  }
});

module.exports = userRouter;
