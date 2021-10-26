const express = require('express')
require('dotenv').config({path: '.env'})
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const logger = require('./utils/logger')

const {Cards} = require('./cards.js')

const app = express()
const port = process.env.HTTP_PORT

console.log(port);

// Middleware
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())


let cards = []
// insert your router here

app.get('/cards', (req, res)=>{    
    res.send(cards)
});

app.get('/cardsById', (req, res)=>{
    const cardID = req.query.cardID;
});


app.post('/postCard', (req, res)=>{
    const test = new Cards(req.body.id, req.body.cardName, req.body.members, req.body.description, req.body.tags, req.body.checklist, req.body.daedline, req.body.updtateDate, req.body.createDate);
    cards.push(test)
    res.send(`Cards created at id :${req.body.id}`)
});

//other

app.listen(port, () => {
    logger.log(`API listening at http://localhost:${port}`)
})
  