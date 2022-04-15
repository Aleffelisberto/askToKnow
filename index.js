const express = require('express') // importing express
const app = express() // loading framework

const bodyParser = require('body-parser') // importing body-parser

const sequelizeConnection = require('./database/database')

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

app.get('/', (request, response) => {
  response.render('index')
})

app.get('/ask', (request, response) => {
  response.render('ask')
})

// receiving data from form question
app.post('/save-question', (request, response) => {
  const { title, description } = request.body
  response.send(`title: ${title}, description: ${description}`)
})

app.listen(3000, err => {
  if (err) console.log(err)
  else console.log('Server is running 🏃🏼‍♂️')
})
