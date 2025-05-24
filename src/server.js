import express from 'express'
import User from './models/User.js'
import Events from './models/Events.js'
import Sequelize from 'sequelize'
import config from './config/database.js'
import eventRoutes from './routes/routesEvents.js'
import userRoutes from './routes/routesUsers.js'

const app = express()
app.use(express.json())

const sequelize = new Sequelize(config)
User.init(sequelize)
Events.init(sequelize)

app.use('/usuarios', userRoutes)
app.use('/eventos', eventRoutes)


sequelize.authenticate().then(() => {
    console.log("Banco de dados Conectado")
    app.listen(3000, () => {
        console.log("Servidor ON")
    })

})
    .catch(err => {
        console.error(err)
    })



