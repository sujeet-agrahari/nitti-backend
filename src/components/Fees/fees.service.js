const { Fees } = require('../../db/models');

const FeesService = {
  /*
   * @method FeesService#collectFees
   * @description Collect fees for enrollment
   * @param {Object} Request body
   * @returns {Object} Fees
   */
  doCreateFees: async (requestBody) => {
    const fees = await Fees.create({
      ...requestBody
    });
    return fees;
  }
};

module.exports = FeesService;
