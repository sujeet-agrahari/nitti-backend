const _ = require('lodash');
const { sequelize, Student, User, Fees, Enrollment, Course } = require('../../db/models');
const { NotFoundError } = require('../../utils/api-errors');

const getNetCourseDiscount = (coursePrice, discount) => {
  return Math.round(coursePrice - (coursePrice * discount) / 100);
};

const StudentService = {
  /**
   * Add a student along with enrolled course, and paid fees details.
   * @async
   * @method
   * @param {Object} requestBody - Request Body
   * @returns {Object} {User, Student, Enrollment, Fees } object
   * @throws {NotFoundError} When course is not found.
   */

  doCreateStudent: async (requestBody) => {
    const userData = _.pick(requestBody, ['phone', 'password']);
    const studentData = _.pick(requestBody, [
      'photo',
      'email',
      'firstName',
      'lastName',
      'motherName',
      'fatherName',
      'middleName',
      'addressLine1',
      'addressLine2'
    ]);
    const enrollmentData = _.pick(requestBody, ['courseId', 'discount', 'enrolledOn']);
    const feesData = _.pick(requestBody, ['paidFees', 'paidOn', 'medium', 'receiptNo']);

    const result = await sequelize.transaction(async (t) => {
      const course = await Course.findByPk(enrollmentData.courseId, { transaction: t });
      if (!course) {
        throw new NotFoundError('Course does not exist');
      }
      const netCourseFees = getNetCourseDiscount(course.price, enrollmentData.discount);

      const user = await User.create(
        {
          ...userData
        },
        {
          transaction: t
        }
      );
      const student = await Student.create(
        {
          ...studentData,
          userId: user.id
        },
        { transaction: t }
      );
      const enrollment = await Enrollment.create(
        {
          ...enrollmentData,
          netFees: netCourseFees,
          studentId: student.id
        },
        { transaction: t }
      );
      const fees = await Fees.create(
        {
          ...feesData,
          enrollmentId: enrollment.id
        },
        { transaction: t }
      );
      return {
        fees,
        user: {
          ...user.toJSON(),
          password: userData.password
        },
        student,
        enrollment
      };
    });
    return result;
  }
};

module.exports = StudentService;
