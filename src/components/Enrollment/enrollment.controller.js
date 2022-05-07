const EnrollmentController = {
  createEnrollment:
    ({ EnrollmentService }) =>
    async (httpRequest) => {
      return EnrollmentService.doCreateEnrollment(httpRequest.body);
    }
};

module.exports = EnrollmentController;
