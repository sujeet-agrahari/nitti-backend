const CourseController = {
  /**
   * Handle creating a new course.
   * @async
   * @method
   * @param {{CourseService:import('./course.service')}} CourseService: CourseService
   * @returns {Promise<function(ExpressRequest): Promise.<ControllerResponse>> }
   */
  createCourse:
    ({ CourseService }) =>
    async (httpRequest) => {
      const course = await CourseService.doCreateCourse(httpRequest.body);
      return {
        statusCode: 201,
        body: {
          data: course
        }
      };
    },

  updateCourse:
    ({ CourseService }) =>
    async (httpRequest) => {
      const course = await CourseService.doUpdateCourse(httpRequest.body, httpRequest.params);
      return {
        statusCode: 200,
        body: {
          data: course
        }
      };
    }
};

module.exports = CourseController;
