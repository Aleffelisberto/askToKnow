const { Sequelize } = require('sequelize')
const sequelizeConnection = require('../database')

// creating a new table called 'pergunta'
const Question = sequelizeConnection.define('pergunta', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

// check if table exists in database, if exists, do not create a new table
Question.sync({
  force: false
}).then(() => {})

module.exports = Question
