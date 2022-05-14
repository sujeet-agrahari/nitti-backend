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
  },
  /**
   * Handle getting enrollments.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  getEnrollments: async (httpRequest) => {
    const enrollments = await EnrollmentService.doGetEnrollments(httpRequest.query);
    return {
      statusCode: 200,
      body: {
        data: enrollments
      }
    };
  },
  /**
   * Handle updating a new enrollment.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  updateEnrollment: async (httpRequest) => {
    const enrollment = await EnrollmentService.doUpdateEnrollment({ ...httpRequest.body, ...httpRequest.params });
    return {
      statusCode: 200,
      body: {
        data: enrollment
      }
    };
  }
};

module.exports = EnrollmentController;
