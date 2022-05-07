module.exports = ({
  router,
  EnrollmentController,
  EnrollmentValidator,
  makeValidatorCallback,
  makeExpressCallback
}) => {
  router.post(
    '/',
    makeValidatorCallback(EnrollmentValidator.validateEnrollmentCreate),
    makeExpressCallback(EnrollmentController.createEnrollment)
  );

  return router;
};
