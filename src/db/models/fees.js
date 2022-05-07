const { Model } = require('sequelize');

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize/types')} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  class Fees extends Model {
    static associate(models) {
      // define association here
      if (models.Enrollment) {
        models.Fees.belongsTo(models.Enrollment, {
          foreignKey: 'enrollmentId'
        });
      }
    }
  }
  Fees.init(
    {
      enrollmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: true,
          isUUID: 4
        }
      },
      paidOn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        validate: {
          notNull: true,
          isDate: true
        }
      },
      paidFees: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          isInt: true
        }
      },
      medium: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      receiptNo: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      sequelize,
      schema: 'NITTI',
      modelName: 'Fees'
    }
  );
  return Fees;
};
