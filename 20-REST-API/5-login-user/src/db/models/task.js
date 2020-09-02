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
});

module.exports = Task;
