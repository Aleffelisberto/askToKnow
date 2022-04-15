// connection between postgres and sequelize
const { Sequelize } = require('sequelize')

const sequelizeConnection = new Sequelize(
  'asktoknow',
  'postgres',
  'Alefalef188300!',
  {
    host: 'localhost',
    dialect: 'postgres'
  }
)

module.exports = sequelizeConnection
