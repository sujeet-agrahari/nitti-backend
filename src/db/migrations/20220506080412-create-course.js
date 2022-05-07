const SCHEMA = 'NITTI';
const TABLE_WITH_SCHEMA = { tableName: 'Courses', schema: SCHEMA };

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_WITH_SCHEMA, {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
      fields: ['name']
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(TABLE_WITH_SCHEMA);
  }
};
