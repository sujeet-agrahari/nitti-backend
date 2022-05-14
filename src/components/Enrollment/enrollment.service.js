const pick = require('lodash/pick');

const { Op } = require('sequelize');
const { Enrollment, Course, Fees, Student, User, sequelize } = require('../../db/models');
const { deductPercentValue } = require('../../utils/helper');

const EnrollmentService = {
  /**
   * Create a new course.
   * @async
   * @method
   * @param {EnrollmentDto} requestBody - Request Body
   * @returns {EnrollmentDto} Course
   * @throws {NotFoundError} When the user is not found.
   */
  doCreateEnrollment: async (requestBody) => {
    const userData = pick(requestBody, ['phone', 'password']);
    const studentData = pick(requestBody, [
      'photo',
      'email',
      'firstName',
      'middleName',
      'lastName',
      'fatherName',
      'motherName',
      'dateOfBirth',
      'addressLine1',
      'addressLine2'
    ]);
    const feesData = pick(requestBody, ['paidOn', 'paidFees', 'medium', 'receiptNo']);
    const enrollmentData = pick(requestBody, ['courseId', 'discount', 'totalFees']);

    return sequelize.transaction(async (t) => {
      const user = await User.create(
        {
          ...userData
        },
        { transaction: t }
      );
      const student = await Student.create(
        {
          ...studentData,
          userId: user.id
        },
        {
          transaction: t
        }
      );
      const enrollment = await Enrollment.create(
        {
          ...enrollmentData,
          studentId: student.id,
          netFees: deductPercentValue(enrollmentData.totalFees, enrollmentData.discount)
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
          ...user,
          password: userData.password
        },
        student,
        enrollment
      };
    });
  },
  /**
   * Get students count.
   * @async
   * @method
   * @param {Object} requestQuery - Request Query
   * @param {Date} requestQuery.fromDate
   * @param {Date} requestQuery.toDate
   * @returns {Array.<{EnrollmentDto, student: StudentDto, course: CourseDto, fees: Array<FeesDto>}>} enrollments
   */
  doGetEnrollments: async (requestQuery) => {
    const { fromDate, toDate } = requestQuery;
    const query = {
      where: {},
      include: [
        Course,
        Fees,
        {
          model: Student,
          include: User
        }
      ]
    };

    if (fromDate && !toDate) {
      query.where.createdAt = {
        [Op.gte]: fromDate
      };
    }
    if (!fromDate && toDate) {
      query.where.createdAt = {
        [Op.lte]: toDate
      };
    } else if (fromDate && toDate) {
      query.where.createdAt = {
        [Op.between]: [fromDate, toDate]
      };
    }
    return Enrollment.findAll(query);
  },
  /**
   * Create a new course.
   * @async
   * @method
   * @param {EnrollmentDto} requestBody - Request Body
   * @returns {EnrollmentDto} Course
   * @throws {NotFoundError} When the user is not found.
   */
  doUpdateEnrollment: async (requestBody) => {
    const enrollmentId = requestBody.id;

    const userData = pick(requestBody, ['phone', 'password']);
    const studentData = pick(requestBody, [
      'photo',
      'email',
      'firstName',
      'middleName',
      'lastName',
      'fatherName',
      'motherName',
      'dateOfBirth',
      'addressLine1',
      'addressLine2'
    ]);
    const enrollmentData = pick(requestBody, ['courseId', 'discount', 'totalFees']);

    return sequelize.transaction(async (t) => {
      const [, enrollment] = await Enrollment.update(
        {
          ...enrollmentData,
          netFees:
            enrollmentData.totalFees && enrollmentData.discount
              ? deductPercentValue(enrollmentData.totalFees, enrollmentData.discount)
              : undefined
        },
        { where: { id: enrollmentId }, transaction: t, returning: true }
      );

      const [, student] = await Student.update(
        {
          ...studentData
        },
        {
          where: {
            id: enrollment[0].studentId
          },
          returning: true,
          transaction: t
        }
      );
      const user = await User.update(
        {
          ...userData
        },
        {
          where: {
            id: student[0].userId
          },
          transaction: t
        }
      );

      return {
        user: {
          ...user,
          password: userData.password
        },
        student,
        enrollment
      };
    });
  }
};

module.exports = EnrollmentService;
