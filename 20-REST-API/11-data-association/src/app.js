const express = require('express');

require('./db/dbConnect');
const Task = require('./db/models/task');
const userRouter = require('./routes/userRoutes');
const auth = require('./middlewares/auth');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
//==================END ROUTER====

app.post('/task', auth, (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });
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

const Task2 = require('./db/models/task');

const User2 = require('./db/models/user');
const User = require('./db/models/user');

const main = async () => {
  //Fetching Task and Users
  const task = await Task2.findById('5f5208d9e075d61ecd2662af');

  await task.populate('owner').execPopulate();

  // // const user = await User2.findById(task.owner);
  // // console.log(user);
  // console.log(task);

  //Find user and their task created

  const user = await User.findById('5f5202b2e075d61ecd2662aa');
  await user.populate('tasks').execPopulate();
  console.log(user.tasks);
};

main();
