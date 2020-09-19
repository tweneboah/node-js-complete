const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true,
    },
    ratingsAverage: {
      type: Number,
      required: [true, 'Tour must have a rating'],
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Tour must have a price'],
    },
    duration: {
      type: Number,
    },
    maxGroupSize: {
      type: Number,
    },
    difficulty: {
      type: String,
    },
    priceDiscount: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
    },
    images: [String],
    startDates: [Date],
  },

  { timestamps: true }
);

module.exports = Tour = mongoose.model('Tour', TourSchema);
