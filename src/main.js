const express = require('express')
require('dotenv').config({path: '.env'})
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const logger = require('./utils/logger')

const app = express()
const port = process.env.HTTP_PORT

console.log(port);

// Middleware
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())

// insert your router here

app.get('/cards', (req, res)=>{
    let empyArray = []
    res.send(empyArray)
})

//other

app.listen(port, () => {
    logger.log(`API listening at http://localhost:${port}`)
})
  