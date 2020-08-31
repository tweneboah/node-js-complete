console.log('From Utils.js file');

//Before you can use this in another file you need to exports

const add = function (a, b) {
  return a + b;
};

module.exports = add;
