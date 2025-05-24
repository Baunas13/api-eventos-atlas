import Sequelize, { Model } from 'sequelize'

class User extends Model {
    static init(sequelize) {
        super.init(

            {

                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },

                age: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },

                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },


                cpf: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },

                cnpj: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },

                gender: {
                    type: Sequelize.ENUM('Masculino', 'Feminino', 'Outros'),
                    allowNull: false
                },

                phone: {
                    type: Sequelize.INTEGER,
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