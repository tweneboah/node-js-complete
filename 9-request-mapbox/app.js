//request package

const request = require('request');

const url =
  'http://api.weatherstack.com/current?access_key=f3dc9e69967937a9a61851f55e45dc47&query=37.81,-122.4233&units=f';

request({ url: url, json: true }, (err, response) => {
  // const data = JSON.parse(response.body);
  // console.log(response.body.current);
  // console.log(`It's currently ${response.body.current.temperature} degree`);
});

//geocode: This takes an address and convert it to latitude & longitude

//Making request to mapbox geocode

const url2 =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/Atonsu Ashanti region Ghana.json?access_token=pk.eyJ1IjoidHdlbmVib2FoIiwiYSI6ImNqc3JqcXp1aTFqZ3I0NHN6eWx1emJxYTEifQ.WsB6CDI8nv3ge21eTNYv-A&limit=1';

request({ url: url2, json: true }, (err, res) => {
  console.log(res.body.features[0].id);
  console.log(
    `The longitude of ${res.body.features[0].place_name} is ${res.body.features[0].center[0]} and latitude is ${res.body.features[0].center[1]}`
  );
});
