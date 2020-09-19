const mongoose = require('mongoose');
const slugify = require('slugify');
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
    slug: {
      type: String,
    },
    imageCover: {
      type: String,
    },
    images: [String],
    startDates: [Date],
    startLocation: {
      //GEOJson
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guides' }],
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

//Middleware
TourSchema.pre('save', function (next) {
  //Run before save and create
  //Creating slug
  //Add slug to the obj
  this.slug = slugify(this.name, { lower: true });
  next();
});

TourSchema.post('save', function (documentCreated, next) {
  console.log('Created Document', documentCreated);
  next();
});
module.exports = Tour = mongoose.model('Tour', TourSchema);
