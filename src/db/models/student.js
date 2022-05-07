const { Model } = require('sequelize');

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize/types')} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      // define association here
      if (models.User) {
        models.Student.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
      if (models.Enrollment) {
        models.Student.hasMany(models.Enrollment, {
          foreignKey: 'studentId'
        });
      }
    }
  }
  Student.init(
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: true,
          isUUID: 4
        }
      },
      photo: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isUrl: true
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      middleName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      fatherName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      motherName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      addressLine2: {
        type: DataTypes.STRING
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          notEmpty: true,
          notNull: true
        }
      }
    },
    {
      sequelize,
      schema: 'NITTI',
      modelName: 'Student'
    }
  );
  return Student;
};
