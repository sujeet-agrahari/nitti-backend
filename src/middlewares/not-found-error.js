const { NotFoundError } = require('../utils/api-errors');

module.exports = async () => {
  throw new NotFoundError();
};
