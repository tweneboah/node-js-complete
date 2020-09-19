const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, 'Tour must have a rating'],
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price'],
  },
});

module.exports = Tour = mongoose.model('Tour', TourSchema);
