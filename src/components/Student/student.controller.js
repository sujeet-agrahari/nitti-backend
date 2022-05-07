const StudentController = {
  createStudent:
    ({ StudentService }) =>
    async (httpRequest) => {
      const student = await StudentService.doCreateStudent(httpRequest.body);
      return {
        statusCode: 200,
        body: {
          data: student
        }
      };
    }
};

module.exports = StudentController;
