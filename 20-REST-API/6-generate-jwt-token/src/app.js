const express = require('express');

require('./db/dbConnect');
const Task = require('./db/models/task');
const userRouter = require('./routes/userRoutes');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//========HOW TO USE EXPRESS ROUTER======
//HOW TO USE EXPRESS ROUTER

//1. Create an instance of the router
const router = express.Router();
//2. Rgister the route
app.use(router);
//3.Use the route
router.get('/test', (req, res) => {
  res.send('ddd');
});

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

//jwt demo

const jwt = require('jsonwebtoken');

const jwtDemo = () => {
  //The return from sign is our token and give it to the client
  //embed into our token. You provide a unique indentifier of the user
  //second arg is use to sign the token
  //It's made up of 3 parts
  //1.Header: details about the jwt
  //2. Payload: conatins the data we provided
  //3. Signature is use to verify the token
  // The actual work of jwt is not to hide the data we provide but instead to create a data(our id:1234) that's verifiable by the signature(nodejs) because the id will differe from person

  //You can decode your payload token at https://www.base64decode.org/ and you will the id of the onwer

  //Aft
  const token = jwt.sign({ _id: '1234' }, 'nodejs', { expiresIn: '2 weeks' });
  //Verify the token
  //It needs two things, thus the token and the secret used
  const verify = jwt.verify(token, 'nodejs');
  console.log(verify); //This gives out the user id and the issue at time thus the payload
};

jwtDemo();
