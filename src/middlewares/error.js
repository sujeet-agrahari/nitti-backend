const { APIError } = require('../utils/api-errors');

module.exports = async (err, req, res, next) => {
  // catch all api errors
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }
  if (err instanceof APIError) {
    return res.status(err.status).send({
      error: {
        code: err.status,
        message: err.message
      }
    });
  }
  // connect all errors
  return res.status(500).send({
    error: {
      code: 500,
      message: 'Something went wrong!'
    }
  });
};
