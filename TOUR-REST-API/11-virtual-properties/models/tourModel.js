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
      min: [1, 'minimum is 1'],
      max: [5, 'maximum is 5'],
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
      // select: false, //This will hide the field
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
    startLocation: {
      type: {
        String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
    },
    images: [String],
    startDates: [Date],
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

TourSchema.virtual('discount').get(function () {
  return this.price / 7;
});
// //For this to be part in our query add this to the tourSchema toJSON: {
//       virtuals: true,
//     },
//     toObject: {
//       virtuals: true,
//     },

module.exports = Tour = mongoose.model('Tour', TourSchema);
