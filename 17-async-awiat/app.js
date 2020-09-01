//Async await
//Anytime a function returns a promise you can use await

const getUser = async id => {
  return new Promise((resolve, reject) => {
    // Kick of async work
    setTimeout(() => {
      //Next challenge. After we get the githubusername then we call githup api to fetct the user
      resolve({ id: id, gitHubusername: 'Emma' });
      reject(new Error('Something happened'));
    }, 3000);
  });
};

//Since await requires us to wrap our function in async we will create a function and wrap it like this

const getUserDisplay = async () => {
  try {
    const res = await getUser(2000);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

getUserDisplay();
