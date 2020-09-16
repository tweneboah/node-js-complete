const express = require('express');

const app = express();

app.use(express.json());

//custom Middleware
app.use((req, res, next) => {
  console.log('From middleware 😎');
  console.log((req.requestTime = new Date().toDateString));
  next();
});

//Get tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: { name: 'Tours data' },
    },
  });
});

//Create Tour
app.post('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      data: req.body,
    },
  });
});

//Get a Tour
//'/api/v1/tours/:id
//id = req params
//Anything after slash/ is called req params

app.get('/api/v1/tours/:id', (req, res) => {
  //Retrieving query params
  const tourId = req.params.id;
  console.log(tourId);
  res.status(200).json({
    status: 'Single Tour',
  });
});

//update
app.patch('/api/v1/tours/:id', (req, res) => {
  //Retrieving query params
  res.status(200).json({
    status: 'Update',
  });
});

//Delete
app.delete('/api/v1/tours/:id', (req, res) => {
  //Retrieving query params
  res.status(200).json({
    status: 'Delete',
  });
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
