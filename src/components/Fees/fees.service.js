const { Op } = require('sequelize');
const { Fees, Enrollment, Student, Course, User } = require('../../db/models');

const FeesService = {
  /**
   * Create a new course.
   * @async
   * @method
   * @param {FeesDto} requestBody - Request Body
   * @returns {FeesDto} Course
   * @throws {NotFoundError} When the user is not found.
   */
  doCreateFees: async (requestBody) => {
    const fees = await Fees.create({
      ...requestBody
    });
    return fees;
  },
  /**
   * Get total collected fees.
   * @async
   * @method
   * @param {Object} requestQuery - Request Query
   * @param {Date} requestQuery.fromDate
   * @param {Date} requestQuery.toDate
   * @returns {Number} total collected fees
   */
  doGetTotalCollectedFees: async (requestQuery) => {
    const { fromDate, toDate } = requestQuery;
    const query = { where: {} };

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
    return Fees.sum('paidFees', query);
  },
  /**
   * Get fees with enrollments.
   * @async
   * @method
   * @param {Object} requestQuery - Request Query
   * @param {Date} requestQuery.fromDate
   * @param {Date} requestQuery.toDate
   * @returns {Number} total collected fees
   */
  doGetFees: (requestQuery) => {
    const { fromDate, toDate } = requestQuery;
    const query = {
      where: {},
      order: [['createdAt', 'DESC']],
      include: {
        model: Enrollment,
        include: [
          Course,
          {
            model: Student,
            include: User
          }
        ]
      }
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
    return Fees.findAll(query);
  }
};

module.exports = FeesService;
