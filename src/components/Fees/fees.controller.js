const FeesController = {
  createFees:
    ({ FeesService }) =>
    async (httpRequest) => {
      return FeesService.doCreateFees(httpRequest.body);
    }
};

module.exports = FeesController;
