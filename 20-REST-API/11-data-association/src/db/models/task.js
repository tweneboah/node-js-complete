const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  title: {
    type: String,
    required: true,
    trim: true,
  },

  completed: {
    type: Boolean,
    required: true,
    minlength: 7,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', //Model name passed to the schema
  },
});

module.exports = Task;
