const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a postive number');
      }
    },
  },
});

//Middleware

//Hash plain password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    // Override the password
    user.password = await bcrypt.hash(user.password, 0);
  }
  next();
});

//Login method
userSchema.statics.findByCredentials = async (email, plainPasword) => {
  //find by Email
  const user = await User.findOne({ email: email });
  if (!user) {
    return 'There is no Email for this user';
  }

  console.log(user.password);
  const isMatch = await bcrypt.compare(plainPasword, user.password);
  console.log(isMatch);
  if (!isMatch) {
    return 'Unable to login Password incorrect';
  }

  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
