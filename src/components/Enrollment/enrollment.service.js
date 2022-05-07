const { Enrollment } = require('../../db/models');

const EnrollmentService = {
  /**
   * Create a new course.
   * @async
   * @method
   * @param {EnrollmentDto} requestBody - Request Body
   * @returns {EnrollmentDto} Course
   * @throws {NotFoundError} When the user is not found.
   */
  doCreateEnrollment: async (requestBody) => {
    const enrollment = await Enrollment.create({
      ...requestBody
    });
    return enrollment;
  }
};

module.exports = EnrollmentService;
