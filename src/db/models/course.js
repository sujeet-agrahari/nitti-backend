const { Model } = require('sequelize');

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize/types')} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate() {
      // define association here
    }
  }
  Course.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          isInt: true
        }
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      price: {
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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    {
      sequelize,
      schema: 'NITTI',
      modelName: 'Course'
      // defaultScope: {
      //   where: {
      //     isActive: true
      //   }
      // }
      // scopes: {
      //   withDeleted: {
      //     where: {
      //       isDeleted: true
      //     }
      //   }
      // }
    }
  );
  return Course;
};
