const SCHEMA = 'NITTI';
const TABLE_WITH_SCHEMA = { tableName: 'Enrollments', schema: SCHEMA };

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_WITH_SCHEMA, {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        type: Sequelize.UUID
      },
      studentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            schema: SCHEMA,
            tableName: 'Students'
          },
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      courseId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            schema: SCHEMA,
            tableName: 'Courses'
          },
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      netFees: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      enrolledOn: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(TABLE_WITH_SCHEMA);
  }
};
