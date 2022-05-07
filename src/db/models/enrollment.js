const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(models) {
      if (models.Student) {
        models.Enrollment.belongsTo(models.Student, {
          foreignKey: 'studentId'
        });
      }
      if (models.Course) {
        models.Enrollment.belongsTo(models.Course, {
          foreignKey: 'courseId'
        });
      }
      if (models.Fees) {
        models.Enrollment.hasMany(models.Fees, {
          foreignKey: 'enrollmentId'
        });
      }
    }
  }
  Enrollment.init(
    {
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: true,
          isUUID: 4
        }
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: true,
          isUUID: 4
        }
      },
      netFees: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          isInt: true
        }
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
          notNull: true,
          isInt: true
        }
      },
      enrolledOn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        validate: {
          notNull: true,
          isDate: true
        }
      }
    },
    {
      sequelize,
      schema: 'NITTI',
      modelName: 'Enrollment'
    }
  );
  return Enrollment;
};
