const FeesService = require('./fees.service');

const FeesController = {
  /**
   * Handle creating a new fees.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  createFees: async (httpRequest) => {
    const fees = await FeesService.doCreateFees(httpRequest.body);
    return {
      statusCode: 201,
      body: {
        data: fees
      }
    };
  },
  /**
   * Handle getting total fees.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  getTotalCollectedFees: async (httpRequest) => {
    const totalFees = await FeesService.doGetTotalCollectedFees(httpRequest.query);
    return {
      statusCode: 200,
      body: {
        data: totalFees
      }
    };
  },
  /**
   * Handle getting  fees.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  getFees: async (httpRequest) => {
    const fees = await FeesService.doGetFees(httpRequest.query);
    return {
      statusCode: 200,
      body: {
        data: fees
      }
    };
  }
};

module.exports = FeesController;
