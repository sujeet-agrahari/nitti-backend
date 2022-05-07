module.exports = ({ router, CourseController, CourseValidator, makeValidatorCallback, makeExpressCallback }) => {
  router.post(
    '/',
    makeValidatorCallback(CourseValidator.validateCourseCreate),
    makeExpressCallback(CourseController.createCourse)
  );

  router.put(
    '/:courseId',
    makeValidatorCallback(CourseValidator.validateCourseUpdate),
    makeExpressCallback(CourseController.updateCourse)
  );

  return router;
};
