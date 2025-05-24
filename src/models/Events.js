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
            }
            ,
            { sequelize }

        )
    }
}

export default Events