const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleID: {
    type: String,
  },
  name: {
    type: String,
  },
});

module.exports = User = mongoose.model('User', UserSchema);
