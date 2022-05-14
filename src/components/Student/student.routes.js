/**
 *
 * @param {Object} StudentRouter
 * @param {ExpressRouter} StudentRouter.router
 * @param {StudentController} StudentRouter.StudentController
 * @param {StudentValidator} StudentRouter.StudentValidator
 * @param {makeExpressCallback} StudentRouter.makeExpressCallback
 * @param {makeValidatorCallback} StudentRouter.makeValidatorCallback
 * @returns {ExpressRouter}
 */
module.exports = ({ router, StudentController, StudentValidator, makeValidatorCallback, makeExpressCallback }) => {
  router.post(
    '/',
    makeValidatorCallback(StudentValidator.validateStudentCreate),
    makeExpressCallback(StudentController.createStudent)
  );
  router.get('/', makeExpressCallback(StudentController.getStudents));
  return router;
};
