const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

const corsHandler = (err, req, res, next) => {
  const { method, headers } = req;
  const { origin } = headers;
  const requestHeaders = headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};

module.exports = corsHandler;
