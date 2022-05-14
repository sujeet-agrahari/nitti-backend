const CourseService = require('./course.service');

const CourseController = {
  /**
   * Handle creating a new course.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  createCourse: async (httpRequest) => {
    const course = await CourseService.doCreateCourse(httpRequest.body);
    return {
      statusCode: 201,
      body: {
        data: course
      }
    };
  },

  /**
   * Handle updating a new course.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  updateCourse: async (httpRequest) => {
    const course = await CourseService.doUpdateCourse(httpRequest.body, httpRequest.params);
    return {
      statusCode: 200,
      body: {
        data: course
      }
    };
  },
  /**
   * Handle updating a new course.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  getCourses: async (httpRequest) => {
    const count = await CourseService.doGetCourses();
    return {
      statusCode: 200,
      body: {
        data: count
      }
    };
  }
};

module.exports = CourseController;
