//Converting callback to promise
//How to convert or create a promise
//Create a function and return a promise
//Then inside the promise  do your async work

// ====CONVERTING THIS TO PROMISE====

// function getUser(id, cb) {
//   setTimeout(() => {
//     //Next challenge. After we get the githubusername then we call githup api to fetct the user
//     cb({ id: id, gitHubusername: 'Emma' });
//   }, 3000);
// }

const getUser = id => {
  return new Promise((resolve, reject) => {
    // Kick of async work
    setTimeout(() => {
      //Next challenge. After we get the githubusername then we call githup api to fetct the user
      resolve({ id: id, gitHubusername: 'Emma' });
      reject(new Error('Something happened'));
    }, 3000);
  });
};

// convert this function to async fun
const getGithubUser = username => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['repo2', 'repo3', 'repo4', { name: username }]);
      reject(new Error('Something happened'));
    }, 4000);
  });
};

//====CONSUMING THE PROMISE======
//This clearly shows that our function is returning promise

const result = getUser(100); //If you do this, this will return promise pending

//  Right way

getUser(2000)
  .then(result => {
    console.log(result);
    getUser(result.id)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => console.log(err));
