const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const encryptPassword = (password, salt) => {
  const hashedPassword = crypto.pbkdf2Sync(password, Buffer.from(salt, 'base64'), 10000, 128, 'sha512').toString('base64');

  return hashedPassword;
};

const makeSalt = () => crypto.randomBytes(16).toString('base64');

const verifyPassword = (hashedPassword = '', password = '', salt = '') => encryptPassword(password, salt) === hashedPassword;

const generateToken = (userId, userEmail) => {
  const payload = { userId, userEmail };

  const accessToken = jwt.sign(payload, 'agileSecretKey', {
    expiresIn: '15m',
    audience: 'CUSTOMER',
    issuer: 'AGILE WORLD TECHNOLOGIES',
  });

  const refreshToken = jwt.sign(payload, 'agileSecretKey', {
    expiresIn: '7d',
    audience: 'CUSTOMER',
    issuer: 'AGILE WORLD TECHNOLOGIES',
  });

  return { accessToken, refreshToken };
};

module.exports = {
  encryptPassword,
  makeSalt,
  generateToken,
  verifyPassword,
};
