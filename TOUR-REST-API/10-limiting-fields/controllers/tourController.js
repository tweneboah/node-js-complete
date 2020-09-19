const Tour = require('../models/tourModel');

//QUERIRS

//We have two ways

//1.
exports.getAllToursQuery = async (req, res) => {
  try {
    // const tours = await Tour.find({ duration: 5, difficulty: 'easy' });
    const tours = await Tour.find(req.query);
    res.send(tours);
  } catch (error) {}
};

//1. Including pages but since page is not on our model it will give us error so we will find a way of excluding it

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    //Remove these fields from the query objects
    excludedFields.forEach(el => delete queryObj[el]);

    //Advance filtering
    //Introducing greater than
    //{difficulty:'easy', duration:{$gte: 5}}
    //The problem is that when we console log req.query mongoose does not append $gte so we have to do it

    //Convert the query to string so that we can replace it with $gte....

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(queryStr);
    //Since we want to chain it with another query we don't have to await becuase as soon as we awit it it will automatically return the document
    let query = Tour.find(JSON.parse(queryStr));

    //SORTING
    if (req.query.sort) {
      // query = query.sort(req.query.sort); This will sort only one field
      // This will sort in ascending order http://localhost:3000/api/v1/tours?sort=price
      //If you want to sort in descending the negate the variable http://localhost:3000/api/v1/tours?sort=-price

      //Assuming there is a value that has same value say we are sorting by price and two have the same value, how can we sort? we will compare another value
      //sort('price rating') just pass in the fields
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
      console.log(sortBy);
    } else {
      //If the user didn't specify any sorting we will default sort by created at
      query = query.sort('-createdAt');
    }

    //Fields limitin

    if (req.query.fields) {
      //We want in this form so will convert it from http://localhost:3000/api/v1/tours?fields=name,duration //This is how we will pass it in the params but mongoose requires it as ('price duration') instead of (name, duration) so we will split it
      // query.select('price duration');
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      //Excluding some fields to the user
      // query = query.select('-__v -name');
      query = query.select('-__v');
    }

    const tours = await query;
    res.send(tours);
  } catch (error) {}
};

// exports.getAllTours = async (req, res) => {
//   try {
//     // const queryObj = { ...req.query };
//     // console.query(queryObj);
//     // const tours = await Tour.find({ duration: 5, difficulty: 'easy' });
//     const tours = await Tour.find({});
//     res.send(tours);
//   } catch (error) {}
// };

//2. using mongoose method
exports.getAllToursMongoose = async (req, res) => {
  try {
    console.log(req.query);
    const tours = await Tour.find()
      .where('duration')
      .equals(5)
      .where('difficulty')
      .equals('easy');
    res.send(tours);

    res.send('ALLL TOURS');
  } catch (error) {}
};

//All Tours
// exports.getAllTours = async (req, res) => {
//   try {
//     const tours = await Tour.find();
//     res.send(tours);
//   } catch (error) {}
// };

//Get tours

//Create Tour
exports.createTour = async (req, res) => {
  try {
    const tour = new Tour(req.body);
    await tour.save();
    res.send({ data: tour });
  } catch (error) {
    res.status(501).send(error);
  }
};

//Get a Tour
//'/api/v1/tours/:id
//id = req params
//Anything after slash/ is called req params
exports.getTour = (req, res) => {
  //Retrieving query params
  const tourId = req.params.id;
  console.log(tourId);
  res.status(200).json({
    status: 'Single Tour',
  });
};

//update
exports.updateTour = async (req, res) => {
  //Retrieving query params
  try {
    const tourId = req.params.id;
    const tour = await Tour.findByIdAndUpdate(tourId, req.body, {
      new: true,
      runValidators: true,
    });

    res.send({ data: tour });
  } catch (error) {
    res.status(501).send(error);
  }
};

//Delete
exports.deleteTour = (req, res) => {
  //Retrieving query params
  res.status(200).json({
    status: 'Delete',
  });
};
