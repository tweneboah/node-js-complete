const express = require('express');

const app = express();

app.use(express.json());

//custom Middleware
app.use((req, res, next) => {
  console.log('From middleware 😎');
  console.log((req.requestTime = new Date().toDateString));
  next();
});

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: { name: 'Tours data' },
    },
  });
};

//Get tours

//Create Tour
const createTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      data: req.body,
    },
  });
};

//Get a Tour
//'/api/v1/tours/:id
//id = req params
//Anything after slash/ is called req params
const getTour = (req, res) => {
  //Retrieving query params
  const tourId = req.params.id;
  console.log(tourId);
  res.status(200).json({
    status: 'Single Tour',
  });
};

//update
const updateTour = (req, res) => {
  //Retrieving query params
  res.status(200).json({
    status: 'Update',
  });
};

//Delete
const deleteTour = (req, res) => {
  //Retrieving query params
  res.status(200).json({
    status: 'Delete',
  });
};

//Users==route
const getAllUsers = (req, res) => {
  res.status(200).json({ user: 'Emmanuel' });
};

const getUser = (req, res) => {
  res.status(200).json({ user: 'Get User' });
};

const createUser = (req, res) => {
  res.status(200).json({ user: 'Created user' });
};

const deleteUser = (req, res) => {
  res.status(200).json({ user: 'delete user' });
};

const updateUser = (req, res) => {
  res.status(200).json({ user: 'Update user' });
};

//Routes
// app.patch('/api/v1/tours/:id', updateTour);
// app.get('/api/v1/tours/:id', getTour);
// app.get('/api/v1/tours', getAllTours);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.post('/api/v1/tours', createTour);

const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

//Users====
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
