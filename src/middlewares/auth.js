const { verifyJWT } = require('../components/Auth/jwt.service');
const { AccessDeniedError } = require('../utils/api-errors');

const decodeToken = async (header) => {
  if (!header) {
    throw new AccessDeniedError('Authorization header missing');
  }
  const token = header.replace('Bearer ', '');
  const payload = await verifyJWT(token);
  return payload;
};

module.exports = async (req, res, next) => {
  const { method, path } = req;
  if (method === 'OPTIONS' || ['/api/v1/auth/login', '/api/v1/auth/refresh-token'].includes(path)) {
    return next();
  }
  req.context = await decodeToken(req.header('Authorization') || req.header('authorization'));
  return next();
};
