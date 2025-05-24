'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('events', {

      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },

      nomeEvento: {
        type: Sequelize.STRING,
        allowNull: false
      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },

      data: {
        type: Sequelize.DATE,
        allowNull: false
      },

      local: {
        type: Sequelize.STRING,
        allowNull: false
      },

      nicho: {
        type: Sequelize.STRING,
        allowNull: false
      },

      precificacao: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      limiteInscricoes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }


    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('events');

  }
};
