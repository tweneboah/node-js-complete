const mongoose = require('mongoose');

const connectDb = () => {
  mongoose.connect('mongodb://localhost:27017/online_payment', {
    useNewUrlParser: true,
  });
};

module.exports = connectDb;
