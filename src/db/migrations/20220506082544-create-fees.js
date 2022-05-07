const SCHEMA = 'NITTI';
const TABLE_WITH_SCHEMA = { tableName: 'Fees', schema: SCHEMA };

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_WITH_SCHEMA, {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        type: Sequelize.UUID
      },
      enrollmentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            schema: SCHEMA,
            tableName: 'Enrollments'
          },
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      paidOn: {
        type: Sequelize.DATE,
        allowNull: false
      },
      paidFees: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      medium: {
        type: Sequelize.STRING,
        defaultValue: 'Cash'
      },
      receiptNo: {
        type: Sequelize.STRING
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
