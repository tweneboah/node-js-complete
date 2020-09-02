//promise chaining

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 3000);
  });
};

add(2, 4)
  .then(result => {
    add(result, 20)
      .then(sum => {
        console.log(sum);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });

//Better way promise chaining
//We return  promise from our next then callback

add(2, 4)
  .then(res => {
    return add(res, 10);
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => console.log(err));
