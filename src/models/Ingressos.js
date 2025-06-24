import Sequelize, { Model } from 'sequelize';

class Ingressos extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                    defaultValue: Sequelize.UUIDV4
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
                },
            },
            { sequelize }
        );
    }

    static associate(models) {
        this.belongsTo(models.Events, { foreignKey: 'eventoId', as: 'evento' });
    }
}

export default Ingressos;
