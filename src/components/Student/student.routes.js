module.exports = ({ router, StudentController, StudentValidator, makeValidatorCallback, makeExpressCallback }) => {
  router.post(
    '/',
    makeValidatorCallback(StudentValidator.validateStudentCreate),
    makeExpressCallback(StudentController.createStudent)
  );

  return router;
};
