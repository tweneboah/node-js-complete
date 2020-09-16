const express = require('express');

require('./db/dbConnect');
const Task = require('./db/models/task');
const userRouter = require('./routes/userRoutes');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
//==================END ROUTER====

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
