const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, SIGN_OPTIONS, JWT_SECRET } = require('config');
const { AccessDeniedError } = require('../../utils/api-errors');

const generateJWT = async (payload) => {
  try {
    let signOption;
    let token;
    if (payload.type === 'access') {
      signOption = { expiresIn: ACCESS_TOKEN_EXPIRY, ...SIGN_OPTIONS };
      token = `Bearer ${jwt.sign(payload, JWT_SECRET, signOption)}`;
    } else if (payload.type === 'refresh') {
      signOption = { expiresIn: REFRESH_TOKEN_EXPIRY, ...SIGN_OPTIONS };
      token = `${jwt.sign(payload, JWT_SECRET, signOption)}`;
    }
    return token;
  } catch (error) {
    throw new AccessDeniedError(error.message);
  }
};

const verifyJWT = async (token) => {
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return data;
  } catch (error) {
    throw new AccessDeniedError(error.message);
  }
};
module.exports = {
  generateJWT,
  verifyJWT
};
