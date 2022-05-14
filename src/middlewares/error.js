const { UniqueConstraintError, ValidationError, AggregateError, DatabaseError } = require('sequelize');
const { APIError } = require('../utils/api-errors');
const logger = require('../support/logger');

module.exports = async (error, req, res, next) => {
  console.log(error);
  if (process.env.NODE_ENV === 'development') {
    logger.error(error);
  }

  // catch api error
  if (error instanceof APIError) {
    return res.status(error.status).send({
      error: {
        code: error.status,
        message: error.message
      }
    });
  }

  // catch db error
  if (error instanceof UniqueConstraintError) {
    return res.status(400).send({
      error: {
        code: 400,
        message: `duplicate_${error.parent.constraint}`
      }
    });
  }
  if (error instanceof ValidationError) {
    return res.status(400).send({
      error: {
        code: 400,
        message: error.message
      }
    });
  }
  if (error instanceof AggregateError) {
    return res.status(400).send({
      error: {
        code: 400,
        message: error.errors[0].errors.errors[0].message
      }
    });
  }

  if (error instanceof DatabaseError && error.message.includes('permission')) {
    return res.status(400).send({
      error: {
        code: 400,
        message: error.message
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
