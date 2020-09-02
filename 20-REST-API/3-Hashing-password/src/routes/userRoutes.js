const express = require('express');
const User = require('../db/models/user');

const userRouter = express.Router();

userRouter.post('/users', async (req, res) => {
  console.log(req.body.password);
  try {
    const user = new User(req.body);
    const userCreated = await user.save();
    res.send(userCreated);
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
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
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
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

module.exports = userRouter;
