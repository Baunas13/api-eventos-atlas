import Sequelize, { Model } from 'sequelize'

class CartItem extends Model {
    static init(sequelize) {
        super.init(
            {
                cartId: {
                    type: Sequelize.UUID,
                    allowNull: false
                },
                eventId: {
                    type: Sequelize.UUID,
                    allowNull: false
                },
                quantity: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 1
                },
                price: {
                    type: Sequelize.DECIMAL(10, 2),
                    allowNull: false
                }
            },
            { sequelize }
        )
    }
}

export default CartItem
