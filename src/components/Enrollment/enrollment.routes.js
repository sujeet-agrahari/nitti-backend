/**
 *
 * @param {Object} EnrollmentRouter
 * @param {ExpressRouter} EnrollmentRouter.router
 * @param {EnrollmentController} EnrollmentRouter.EnrollmentController
 * @param {EnrollmentValidator} EnrollmentRouter.EnrollmentValidator
 * @param {makeExpressCallback} EnrollmentRouter.makeExpressCallback
 * @param {makeValidatorCallback} EnrollmentRouter.makeValidatorCallback
 * @returns {ExpressRouter}
 */
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
  router.put(
    '/:id',
    makeValidatorCallback(EnrollmentValidator.validateEnrollmentUpdate),
    makeExpressCallback(EnrollmentController.updateEnrollment)
  );

  router.get('/', makeExpressCallback(EnrollmentController.getEnrollments));

  return router;
};
