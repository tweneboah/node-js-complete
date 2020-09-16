const express = require('express');
const User = require('../db/models/user');
const auth = require('../middlewares/auth');

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

userRouter.patch('/users/:userId', async (req, res) => {
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
    const id = req.params.userId;
    // const user = await User.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const user = await User.findById(id);
    updates.forEach(updateFields => {
      user[updateFields] = req.body[updateFields];
    });

    if (!user) {
      return res.status(404).send('No user');
    }
    const updatedUser = await user.save();
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.delete('/users/:userId', async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
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
