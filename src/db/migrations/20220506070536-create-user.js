const SCHEMA = 'NITTI';
const TABLE_WITH_SCHEMA = { tableName: 'Users', schema: SCHEMA };

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_WITH_SCHEMA, {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        type: Sequelize.UUID
      },
      phone: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      role: {
        type: Sequelize.ENUM('Admin', 'Teacher', 'Student'),
        defaultValue: 'Student'
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
    await queryInterface.addConstraint(TABLE_WITH_SCHEMA, {
      type: 'unique',
      fields: ['phone']
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(TABLE_WITH_SCHEMA);
  }
};
