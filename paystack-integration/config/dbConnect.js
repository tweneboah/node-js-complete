const mongoose = require('mongoose');

const dbConnect = () => {
  mongoose.connect(
    'mongodb://127.0.0.1:27017/paystack-integration',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log('DB connected');
    }
  );
};

module.exports = dbConnect;
