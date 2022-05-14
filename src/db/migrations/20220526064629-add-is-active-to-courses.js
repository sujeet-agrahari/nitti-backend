const SCHEMA = 'NITTI';
const TABLE_WITH_SCHEMA = { tableName: 'Courses', schema: SCHEMA };

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize/types')} Sequelize
     */
    await queryInterface.addColumn(TABLE_WITH_SCHEMA, 'isActive', { type: Sequelize.BOOLEAN, defaultValue: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLE_WITH_SCHEMA, 'isActive');
  }
};
