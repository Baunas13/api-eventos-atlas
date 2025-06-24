import Sequelize, { Model } from 'sequelize'

class User extends Model {
    static init(sequelize) {
        super.init(

            {

                name: {
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

                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
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


                password: {
                    type: Sequelize.STRING,
                    allowNull: false
                },


            }
            ,
            { sequelize },
        )
    }
}

export default User