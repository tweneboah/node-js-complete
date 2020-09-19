const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
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

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
