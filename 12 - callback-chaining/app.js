const request = require('request');
const geocode = require('./utils/geocode');
const getWeather = require('./utils/fetchWeather');

// geocode('Accra', (err, data) => {
//   //console.log(data);
// });

getWeather('3.543', '-1.466', (err, data) => {
  console.log(data);
});
