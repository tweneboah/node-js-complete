const jwt = require('jsonwebtoken');
const User = require('../db/models/user');
const { use } = require('../routes/userRoutes');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, 'reactjs');

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error('HMM ERROR');
    }
    //Assign the user to the request
    req.user = user;
    next();
  } catch (error) {
    res.status(404).send('Please  authenticate first');
  }
};

module.exports = auth;
