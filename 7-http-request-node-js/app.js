//request package

const request = require('request');

const url =
  'http://api.weatherstack.com/current?access_key=f3dc9e69967937a9a61851f55e45dc47&query=37.81,-122.4233';

request({ url: url }, (err, response) => {
  const data = JSON.parse(response.body);
  console.log(data);
});
