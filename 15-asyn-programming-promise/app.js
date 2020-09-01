const geocode = require('./utils/geocode');
const getWeather = require('./utils/fetchWeather');

//This is callback chainig
geocode('Accra', (err, data) => {
  getWeather(data.latitude, data.longitude, (err, data) => {
    console.log(data);
  });
});
