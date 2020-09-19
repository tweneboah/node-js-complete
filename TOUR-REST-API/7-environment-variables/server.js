const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');

//====ENVIRONMENT VARIABLES===
dotenv.config({ path: './config.env' }); //This package will set our variables into node environments
//When you log console.log(process.env); you will see all the environments been set

const app = express();

//====ENVIRONMENT VARIABLES===
//By default express runs on development  but node set a lot of environment
//console.log(app.get('env')); //For express
//Node console.log(process.env)

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(express.json());
//Connect to DB
// mongoose.connect(process.env.DATABASE_LOCAL);
//custom Middleware
app.use((req, res, next) => {
  console.log('From middleware 😎');
  console.log((req.requestTime = new Date().toDateString));
  next();
});

//ROUTES
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
