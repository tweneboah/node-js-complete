exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: { name: 'Tours data' },
    },
  });
};

//Get tours

//Create Tour
exports.createTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      data: req.body,
    },
  });
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
exports.updateTour = (req, res) => {
  //Retrieving query params
  res.status(200).json({
    status: 'Update',
  });
};

//Delete
exports.deleteTour = (req, res) => {
  //Retrieving query params
  res.status(200).json({
    status: 'Delete',
  });
};
