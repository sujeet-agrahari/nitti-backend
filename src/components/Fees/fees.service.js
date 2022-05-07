const { Fees } = require('../../db/models');

const FeesService = {
  /**
   * Create a new course.
   * @async
   * @method
   * @param {FeesDto} requestBody - Request Body
   * @returns {FeesDto} Course
   * @throws {NotFoundError} When the user is not found.
   */
  doCreateFees: async (requestBody) => {
    const fees = await Fees.create({
      ...requestBody
    });
    return fees;
  }
};

module.exports = FeesService;
