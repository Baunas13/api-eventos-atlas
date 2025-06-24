import Sequelize, { Model } from 'sequelize'

class Events extends Model {
    static init(sequelize) {
        super.init(

            {

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

                cidade: {
                    type: Sequelize.STRING,
                    allowNull: false
                },

                estado: {
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

                imagem: {
                    type: Sequelize.STRING,
                    allowNull: true
                }
            }
            ,
            { sequelize }

        )
    }

    static associate(models) {
        this.hasMany(models.Ingressos, {
            foreignKey: 'eventoId',
            as: 'ingressos'
        });
    }

}

export default Events