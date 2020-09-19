const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv/types');
const app = express();
const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');
app.use(express.json());
dotenv.config({
  path: './config.env',
});

mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//custom Middleware

//ROUTES
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

//Handling unhandle Routes
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   msg: `Can't find ${req.originalUrl} on this server`,
  // });
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  //Defining status and status code on the err
  err.status = 'fail';
  err.statusCode = 404;
  next(err); //sending the error the error middleware function
});

//Error Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  console.log(err);
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
