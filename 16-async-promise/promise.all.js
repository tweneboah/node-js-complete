//Assuming you want to make request to two api and you want them to get te data before returning to the client

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed');
  }, 2000);
});

const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve('Data fetched for request 2');
  }, 5000);
});

//The result will be in array
//If one call failed the final result will be null
Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log(err));
