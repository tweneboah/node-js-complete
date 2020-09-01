//There are 3 principles
//1. callbacks
//Promises
//Async/Await

//This is blocking/synchrounous programming
// console.log('Before');
// console.log('After');

//Asynchrronous or non-blocking

/** 
console.log('Before');
setTimeout(() => {
  console.log('Reading user from database');
}, 3000);
console.log('After');
*/

//Extrating the function

/** 
console.log('Before');
//If we call the function like this it will be undefined
let user = getUser(1);
console.log(user); //undeffined
console.log('After');

function getUser(id) {
  setTimeout(() => {
    console.log('Reading user from database');
    //here we want to return a user from db
    //So instead of returning the data straight away we will give it to a callback
    return { id: id, name: 'Emma' };
  }, 3000);
}


console.log('Before');
//Since we want to wait till the data comes back we will call it like this becase this function accept callback as an argument

getUser(2, data => {
  console.log(data);
});
console.log('After');

function getUser(id, cb) {
  setTimeout(() => {
    //here we want to return a user from db
    //So instead of returning the data straight away we will give it to a callback
    cb({ id: id, name: 'Emma' });
  }, 3000);
}

*/

console.log('Before');
//Since we want to wait till the data comes back we will call it like this becase this function accept callback as an argument

getUser(2, data => {
  getGithubUser(data.gitHubusername, data => {
    console.log(data);
  });
});
console.log('After');

function getUser(id, cb) {
  setTimeout(() => {
    //Next challenge. After we get the githubusername then we call githup api to fetct the user
    cb({ id: id, gitHubusername: 'Emma' });
  }, 3000);
}

// convert this function to async fun
// function getGithubUser(username) {
//   return ['repo2', 'repo3', 'repo4'];
// }

// convert this function to async fun
function getGithubUser(username, cb) {
  setTimeout(() => {
    cb(['repo2', 'repo3', 'repo4', { name: username }]);
  }, 4000);
}
