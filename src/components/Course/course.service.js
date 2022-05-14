const { Course } = require('../../db/models');

const CourseService = {
  /**
   * Create a new course.
   * @async
   * @method
   * @param {CourseDto} requestBody - Request Body
   * @returns {CourseDto} Course
   * @throws {NotFoundError} When the user is not found.
   */
  doCreateCourse: async (requestBody) => {
    const course = await Course.create({
      ...requestBody
    });
    return course;
  },

  /**
   * Update a new course.
   * @async
   * @method
   * @param {CourseDto} requestBody - Request Body
   * @param {{ id: String }} args
   * @returns {CourseDto} Course
   */
  doUpdateCourse: async (requestBody, args) => {
    const [, course] = await Course.update(
      {
        ...requestBody
      },
      {
        where: {
          id: args.courseId
        },
        returning: true
      }
    );
    return course[0];
  },
  /**
   * Update a new course.
   * @async
   * @method
   * @returns {Number} courses count
   */
  doGetCourses: async () => {
    return Course.findAll({
      order: [['name', 'ASC']]
    });
  }
};

module.exports = CourseService;
