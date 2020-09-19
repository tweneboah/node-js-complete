//Users==route
exports.getAllUsers = (req, res) => {
  res.status(200).json({ user: 'Emmanuel' });
};

exports.getUser = (req, res) => {
  res.status(200).json({ user: 'Get User' });
};

exports.createUser = (req, res) => {
  res.status(200).json({ user: 'Created user' });
};

exports.deleteUser = (req, res) => {
  res.status(200).json({ user: 'delete user' });
};

exports.updateUser = (req, res) => {
  res.status(200).json({ user: 'Update user' });
};
