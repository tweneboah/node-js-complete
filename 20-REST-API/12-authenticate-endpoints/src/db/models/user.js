const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  },
  tokens: {
    type: String,
  },
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id', //Where the local data are stored - ObjectId (id) thus the userId
  foreignField: 'owner', //The field on the other model(Task)
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
  const isMatch = await bcrypt.compare(plainPasword, user.password);
  console.log(isMatch);
  if (!isMatch) {
    return 'Unable to login Password incorrect';
  }

  return user;
};

//Generate Tokens

userSchema.methods.generateAuthTokens = async function (id) {
  const token = jwt.sign({ _id: id }, 'reactjs');
  return token;
};

//public fields

userSchema.methods.getPublicProfiles = function () {
  const user = this;
  //get raw object in that case mongoose have no their functions

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
