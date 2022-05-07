const EnrollmentService = require('./enrollment.service');

const EnrollmentController = {
  /**
   * Handle creating a new enrollment.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  createEnrollment: async (httpRequest) => {
    const enrollment = await EnrollmentService.doCreateEnrollment(httpRequest.body);
    return {
      statusCode: 201,
      body: {
        data: enrollment
      }
    };
  }
};

module.exports = EnrollmentController;
