const mongoose = require('mongoose');

//lOCAL

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// PRODUCTION

// mongoose.connect('mongodb + srv://emmanuel:LWV8Vo1cLXPyYj5g@cluster0.j2hrv.mongodb.net/mead-node-js?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });
