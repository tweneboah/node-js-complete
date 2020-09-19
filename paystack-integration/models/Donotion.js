const mongoose = require('mongoose');

const DonotionSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  reference: {
    type: String,
  },
  amount: {
    type: Number,
  },
  fullName: {
    type: String,
  },
});

module.exports = Donation = mongoose.model('Donation', DonotionSchema);
