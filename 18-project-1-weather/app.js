const request = require('request');
const geocode = require('./utils/geocode');
const getWeather = require('./utils/fetchWeather');

geocode('China Xifeng ', (err, forcastData) => {
  if (err) {
    return console.log(err);
  }
  getWeather(forcastData.latitude, forcastData.longitude, (err, data) => {
    // console.log(data.current.observation_time);
    if (err) {
      return console.log(err);
    }
    // console.log(` hhh ${data}`);
    console.log(
      `The weather condition at ${data.location.country} ${data.location.region} as at ${data.current.observation_time} is ${data.current.temperature} degree celcius`
    );
  });
});
