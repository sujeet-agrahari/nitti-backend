const { Enrollment } = require('../../db/models');

const EnrollmentService = {
  /*
   * @method EnrollmentService#doCreateEnrollment
   * @description Create new enrollment
   * @param {Object} Request body
   * @returns {Object} Enrollment
   */
  doCreateEnrollment: async (requestBody) => {
    const enrollment = await Enrollment.create({
      ...requestBody
    });
    return enrollment;
  }
};

module.exports = EnrollmentService;
