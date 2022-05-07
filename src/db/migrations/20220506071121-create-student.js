const SCHEMA = 'NITTI';
const TABLE_WITH_SCHEMA = { tableName: 'Students', schema: SCHEMA };

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_WITH_SCHEMA, {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            schema: SCHEMA,
            tableName: 'Users'
          },
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      photo: {
        type: Sequelize.STRING(255)
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      middleName: {
        type: Sequelize.STRING(50)
      },
      lastName: {
        type: Sequelize.STRING(50)
      },
      fatherName: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      motherName: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(160)
      },
      addressLine1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addressLine2: {
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
