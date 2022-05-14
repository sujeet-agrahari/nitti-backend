/**
 *
 * @param {Object} CourseRouter
 * @param {ExpressRouter} CourseRouter.router
 * @param {CourseController} CourseRouter.CourseController
 * @param {CourseValidator} CourseRouter.CourseValidator
 * @param {makeExpressCallback} CourseRouter.makeExpressCallback
 * @param {makeValidatorCallback} CourseRouter.makeValidatorCallback
 * @returns {ExpressRouter}
 */
module.exports = ({ router, CourseController, CourseValidator, makeExpressCallback, makeValidatorCallback }) => {
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

  router.get('/', makeExpressCallback(CourseController.getCourses));

  return router;
};
