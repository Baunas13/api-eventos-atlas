import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import User from './models/User.js'
import Events from './models/Events.js'
import Cart from './models/Cart.js'
import CartItem from './models/CartItem.js'
import Ingressos from './models/Ingressos.js';
import Sequelize from 'sequelize'
import config from './config/database.js'
import eventRoutes from './routes/routesEvents.js'
import userRoutes from './routes/routesUsers.js'
import routesCart from './routes/routesCart.js'



const app = express()
app.use(express.json())
app.use(cors())

const sequelize = new Sequelize(config)
User.init(sequelize)
Events.init(sequelize)
Ingressos.init(sequelize)
Cart.init(sequelize)
CartItem.init(sequelize)

Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' })
CartItem.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' })

Events.associate({ Ingressos })
Ingressos.associate({ Events })

app.use('/usuarios', userRoutes)
app.use('/eventos', eventRoutes)
app.use('/carrinho', routesCart)


sequelize.authenticate().then(() => {
    console.log("Banco de dados Conectado")
    app.listen(3000, () => {
        console.log("Servidor ON")
    })

})
    .catch(err => {
        console.error(err)
    })



