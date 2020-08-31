console.log('Starting');

//setTimeout is asyn in node js

setTimeout(() => {
  console.log('First Asyn');
}, 5000);

setTimeout(() => {
  console.log('second Async');
}, 3000);
console.log('Stopping');
