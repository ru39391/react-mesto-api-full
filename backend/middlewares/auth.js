const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
const { actionMessages } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(actionMessages.errorLogin));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new AuthError(actionMessages.errorLogin));
  }

  req.user = payload;
  next();
};
