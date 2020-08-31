//request package

const request = require('request');

//How to show error messages
//Check the cause of error thus user input, network and the error from your api
//Try to cause the app to fail and see the response error and you can use that to display error

const url =
  'http://api.weatherstack.com/current?access_key=f3dc9e69967937a9a61851f55e45dc47&query=37.81,-122.4233&units=f';

request({ url: url, json: true }, (err, response) => {
  if (err) {
    console.log('Unable to connect to the weather services', err);
  } else if (response.body.error) {
    // Here we temporary didn't provide latitude and logitude to see the type of response
    console.log('Unable to find location', response.body.error.info);
  } else {
    console.log(`It's currently ${response.body.current.temperature} degree`);
  }
});

//geocode: This takes an address and convert it to latitude & longitude

//Making request to mapbox geocode

const url2 =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/.Atonsu Ghana Ashanti region.json?access_token=pk.eyJ1IjoidHdlbmVib2FoIiwiYSI6ImNqc3JqcXp1aTFqZ3I0NHN6eWx1emJxYTEifQ.WsB6CDI8nv3ge21eTNYv-A&limit=1';

request({ url: url2, json: true }, (err, res) => {
  if (err) {
    console.log('Unable to connect to the service');
  } else if (res.body.message) {
    console.log(`The location cannot be empty or ${res.body.message}`);
  } else {
    console.log(res.body.message);
    console.log(
      `The longitude of ${res.body.features[0].place_name} is ${res.body.features[0].center[0]} and latitude is ${res.body.features[0].center[1]}`
    );
  }
});
