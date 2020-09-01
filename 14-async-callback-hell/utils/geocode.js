const request = require('request');

const geocode = (address, callback) => {
  //encodeURIComponent : It's a function to encode special characters in our query strings
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidHdlbmVib2FoIiwiYSI6ImNqc3JqcXp1aTFqZ3I0NHN6eWx1emJxYTEifQ.WsB6CDI8nv3ge21eTNYv-A&limit=1`;

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect to geocode services', undefined);
    } else if (res.body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      callback(undefined, {
        latitude: res.body.features[0].center[0],
        longitude: res.body.features[0].center[1],
        location: res.body.features[0].place_name,
      });
    }
  });
};

// geocode('Atonsu Ghana', (err, data) => {
//   console.log('Error', err);
//   console.log('data', data);
// });

module.exports = geocode;
