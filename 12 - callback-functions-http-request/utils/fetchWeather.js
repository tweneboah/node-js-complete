const request = require('request');

const getWeather = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f3dc9e69967937a9a61851f55e45dc47&query=${lat},${lng}&units=f`;

  request({ url: url, json: true }, (err, response) => {
    if (err) {
      callback('Unable to connect to the weather services', undefined);
    } else if (response.body.error) {
      callback(
        `Unable to find location', ${response.body.error.info}`,
        undefined
      );
    } else {
      callback(undefined, response.body);
    }
  });
};

getWeather('37.765', '-122.241', (err, data) => {
  console.log(err);
  console.log(data);
});

module.exports = getWeather;
