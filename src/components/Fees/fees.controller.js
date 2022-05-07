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
  }
};

module.exports = FeesController;
