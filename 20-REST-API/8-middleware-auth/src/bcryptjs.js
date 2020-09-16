const bcrypt = require('bcryptjs');

const hashAndVerifyPassword = async () => {
  const password = '123abc';
  const hashedPassword = await bcrypt.hash(password, 8);
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log(isMatch);
};

hashAndVerifyPassword();
