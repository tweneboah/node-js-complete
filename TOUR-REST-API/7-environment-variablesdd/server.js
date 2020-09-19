const express = require('express');
const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');

const app = express();

app.use(express.json());

//custom Middleware
app.use((req, res, next) => {
  console.log('From middleware 😎');
  console.log((req.requestTime = new Date().toDateString));
  next();
});

//ROUTES
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

//====ENVIRONMENT VARIABLES===
//By default express runs on development  but node set a lot of environment
//console.log(app.get('env')); //For express
//Node console.log(process.env)

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
