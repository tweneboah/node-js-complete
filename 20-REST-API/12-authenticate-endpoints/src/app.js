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

//All task by user
app.get('/tasks', auth, async (req, res) => {
  try {
    //Option 1
    //Find all tasks whose onwer id is equall to the login user
    const user = await Task.find({ owner: req.user._id });
    res.send(user);
    // Option 2
    // await req.user.populate('tasks').execPopulate();
    // res.send(req.user.tasks);
  } catch (error) {
    res.status(400).send('Nooo user');
  }
});

//Anybody can fetch
app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => {
      res.send(tasks);
    })
    .catch(err => {
      res.status(500).send();
    });
});

//Fetch data that's only created by you
app.get('/tasks/:taskId', auth, async (req, res) => {
  try {
    const id = req.params.taskId;
    // const tast = await Task.findById(id);
    //For findOne unless all the parameters match
    //We are checking if the id of the task exists and the user id in the auth === the owner user.id on the task
    console.log('ID', id);
    const task = await Task.findOne({
      _id: id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send('Dont match');
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

app.get('/tasks1/:taskId', auth, (req, res) => {
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
const { use } = require('./routes/userRoutes');

const main = async () => {
  //Fetching Task and Users
  const task = await Task2.findById('5f52b58c14b1690d831ca8f8');

  await task.populate('owner').execPopulate();
  console.log(task);
  // // const user = await User2.findById(task.owner);
  // // console.log(user);
  // console.log(task);

  //Find user and their task created

  // const user = await User.findById('5f5202b2e075d61ecd2662aa');
  // await user.populate('tasks').execPopulate();
  // console.log(user.tasks);
};

main();
