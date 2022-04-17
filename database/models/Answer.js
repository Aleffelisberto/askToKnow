const { Sequelize } = require('sequelize')

const connection = require('../database')

const Answer = connection.define('resposta', {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  // using brute relationship
  // An question has an answer
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Answer.sync({ force: false }).then(() => {})

module.exports = Answer
