const express = require('express');
require('./db/dbConnect');
const User = require('./db/models/user');
const Task = require('./db/models/task');
const { restart } = require('nodemon');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const userCreated = await user.save();
    res.send(userCreated);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

app.get('/users/:userId', async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

app.patch('/users/:userId', async (req, res) => {
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

app.delete('/users/:userId', async (req, res) => {
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

app.post('/task', (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(task => {
      res.send(task);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => {
      res.send(tasks);
    })
    .catch(err => {
      res.status(500).send();
    });
});

app.get('/tasks/:taskId', (req, res) => {
  const id = req.params.taskId;
  Task.findById(id)
    .then(task => {
      res.send(task);
    })
    .catch(err => {
      res.status(500).send();
    });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
