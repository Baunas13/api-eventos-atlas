import Sequelize from 'sequelize';
import dbConfig from '../config/database.js';
import Events from './Events.js';
import Ingressos from './Ingressos.js';

const connection = new Sequelize(dbConfig);

Events.init(connection);
Ingressos.init(connection);

Events.associate({ Ingressos });
Ingressos.associate({ Events });

export { connection, Events, Ingressos };
