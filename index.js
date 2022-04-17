const express = require('express') // importing express
const app = express() // loading framework

const bodyParser = require('body-parser') // importing body-parser

const sequelizeConnection = require('./database/database')

// importing models
const QuestionModel = require('./database/models/Question')
const AnswerModel = require('./database/models/Answer')

// testing connection to database
async function testDatabaseConnection() {
  try {
    await sequelizeConnection.authenticate()
    console.log('Connection has been established successfully.')
  } catch (e) {
    console.error('Unable to connect to the database asktoknow.', error)
  }
}

testDatabaseConnection()

// set ejs as view engine
app.set('view engine', 'ejs')

// working with static files
app.use(express.static('public'))

// decoding data from forms in js
app.use(bodyParser.urlencoded({ extended: false }))

// allow to read form data in json
app.use(bodyParser.json())

// route to homepage
app.get('/', async (request, response) => {
  try {
    const questionsTable = await QuestionModel.findAll({
      raw: true,
      order: [['createdAt', 'DESC']]
    })
    response.render('index', { questionsTable: questionsTable })
  } catch (err) {
    console.log('An error has occurred: ' + err.message)
  }
})

// route to create a new question and put into database
app.get('/ask', (request, response) => {
  response.render('ask')
})

// route to show the question filtered by its id
app.get('/pergunta/:id', async (request, response) => {
  const { id } = request.params

  // checking if 'id' is a number, if not, redirect to homepage
  if (isNaN(id)) {
    response.redirect('/')
  } else {
    try {
      const questionInstance = await QuestionModel.findOne({
        where: { id: id }
      })
      if (questionInstance) {
        // filtering the answers by the same question id
        const answers = await AnswerModel.findAll({
          raw: true,
          where: {
            perguntaId: parseInt(id)
          }
        })

        response.render('question', {
          question: questionInstance,
          answers: answers
        })
      } else {
        response.redirect('/')
      }
    } catch (err) {
      console.log('An error has occurred: ' + err.message)
    }
  }
})

// receiving data from form question
app.post('/save-question', async (request, response) => {
  const { title, description } = request.body

  try {
    await QuestionModel.create({
      titulo: title,
      descricao: description
    })
    response.redirect('/')
  } catch (err) {
    console.log('An error has occurred: ' + err.message)
  }
})

// receiving data from answer
app.post('/save-answer', async (request, response) => {
  const { questionId, body } = request.body

  try {
    await AnswerModel.create({
      corpo: body,
      perguntaId: questionId
    })

    response.redirect(`/pergunta/${questionId}`)
  } catch (err) {
    console.log('An error has occurred: ' + err.message)
  }
})

// listening server on 3000 port
app.listen(3000, err => {
  if (err) console.log(err)
  else console.log('Server is running 🏃🏼‍♂️')
})
