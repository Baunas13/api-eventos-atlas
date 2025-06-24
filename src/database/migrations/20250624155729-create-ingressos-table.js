'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ingressos', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      preco: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      eventoId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Events',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ingressos');
  },
};
