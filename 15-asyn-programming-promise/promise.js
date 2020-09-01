//===PROMISE=====
const request = require('request');
//It holds the results of an asynchronous operation

const myPromise = new Promise((resolve, reject) => {
  //Kick of async work
  //.....
  //We can make our async calls here
  setTimeout(() => {
    resolve('Data fetched');
    reject(new Error('Fetching failed'));
  }, 3000);
});

//Consuming the promise
myPromise.then(data => console.log(data)).catch(err => console.log(err));
