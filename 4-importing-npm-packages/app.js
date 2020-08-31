const utils = require('./utils');
const add = require('./utils');
const getNotes = require('./notes');
//This is the concept of creating your own function and use it in another file

// As soon as the file is required to this file and this file runs the function runs automatically

//Each file has their own scope

const sum = add(10, 30);
const notes = getNotes();
console.log(notes);
console.log(sum);
