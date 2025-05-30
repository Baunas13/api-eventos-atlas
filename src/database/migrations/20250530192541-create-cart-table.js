'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('cart', {

      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },

      metodoPagamento: {
        type: Sequelize.ENUM('pix', 'cartao_credito', 'cartao_debito'),
        allowNull: false
      },

      // Dados Pix
      chavePix: {
        type: Sequelize.STRING,
        allowNull: true
      },

      // Dados Cartão (crédito ou débito)
      nomeTitular: {
        type: Sequelize.STRING,
        allowNull: true
      },

      numeroCartao: {
        type: Sequelize.STRING,
        allowNull: true
      },

      dataValidade: {
        type: Sequelize.STRING,
        allowNull: true
      },

      cvv: {
        type: Sequelize.STRING,
        allowNull: true
      },

      enderecoCobranca: {
        type: Sequelize.STRING,
        allowNull: true
      },

      // Só para crédito
      parcela: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      // Dados gerais do pedido
      status: {
        type: Sequelize.ENUM('ativo', 'pagamento_pendente', 'pago', 'cancelado'),
        defaultValue: 'ativo'
      },

      total: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00
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

    await queryInterface.dropTable('cart');

  }
};
