const { actionMessages, BAD_REQUEST_ERROR_CODE } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = BAD_REQUEST_ERROR_CODE, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === BAD_REQUEST_ERROR_CODE
        ? actionMessages.errorRequest
        : message,
    });
  next();
};

module.exports = errorHandler;
