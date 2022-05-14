const StudentService = require('./student.service');

const StudentController = {
  /**
   * Handle creating a new student along with enrollment, and paid fees.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  createStudent: async (httpRequest) => {
    const student = await StudentService.doCreateStudent(httpRequest.body);
    return {
      statusCode: 200,
      body: {
        data: student
      }
    };
  },
  /**
   * Handle getting students count.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  getStudents: async (httpRequest) => {
    const count = await StudentService.doGetStudents(httpRequest.query);
    return {
      statusCode: 200,
      body: {
        data: count
      }
    };
  }
};

module.exports = StudentController;
