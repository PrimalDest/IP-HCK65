const bcrypt = require('bcrypt');

function generateHash(data) {
  const saltRounds = 10;
  return bcrypt.hashSync(data, saltRounds);
}

function compareHash(data, hashedData) {
  return bcrypt.compareSync(data, hashedData);
}

module.exports = { generateHash, compareHash };
