//CALLBACK
//By default js and node have built in callbacks but we can also create our own function and pass in call backs. The reason is that assuming we have two functions and one function depends on the other but since functions get called as soon as it's calll we may not get the data so we will pass in callback and that callback will call the function as some pint in time

// For example we need the data inside geocode but it's put inside setTimeout which is asynchronus so js/node will push it to the event loop by allowing the outer function to execute until the callstack is empty then we get the response back but to stop the function to call and return undefined we will pass the data we are expecting into the callback then when it's ready we get our data back

const geocode = (address, cb) => {
  setTimeout(() => {
    const data = {
      lat: 5,
      lng: 4,
    };

    return data;
  }, 3000);
};

const data = geocode(); //undefined

const geocode2 = (address, cb) => {
  setTimeout(() => {
    const data = {
      lat: 5,
      lng: 4,
    };
    // We don't use return because it will call it exactly
    cb(data);
  }, 3000);
};

//EXAMPLE

geocode2('Ghana', data => {
  //We get our data here
  console.log(data); //Actual data
});

const getFees = (name, school, callback) => {
  setTimeout(() => {
    const student = {
      schoolType: 'KNUST',
      studentName: 'Emmanuel',
    };

    callback(student);
  }, 5000);
};

getFees('Atom', 'UST', data => {
  console.log(data);
});
