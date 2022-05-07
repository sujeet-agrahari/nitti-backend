const { UniqueConstraintError, ValidationError, AggregateError } = require('sequelize');

const { BadRequestError } = require('./api-errors');

const handleError = (error) => {
  if (error instanceof UniqueConstraintError) {
    throw new BadRequestError(`duplicate_${error.parent.constraint}`);
  } else if (error instanceof ValidationError) {
    throw new BadRequestError(error.message);
  } else if (error instanceof AggregateError) {
    throw new BadRequestError(error.errors[0].errors.errors[0].message);
  } else {
    throw error;
  }
};

module.exports = { handleError };
