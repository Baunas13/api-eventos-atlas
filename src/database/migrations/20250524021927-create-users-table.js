'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Users', {

      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      cpf: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },

      cnpj: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },

      gender: {
        type: Sequelize.ENUM('Masculino', 'Feminino', 'Outros', 'Prefiro não dizer'),
        allowNull: false
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },

      state: {
        type: Sequelize.STRING,
        allowNull: false
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false
      },

      address: {
        type: Sequelize.STRING,
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

    await queryInterface.dropTable('Users');

  }
};
