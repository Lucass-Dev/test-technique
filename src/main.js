const express = require('express')
require('dotenv').config({path: '.env'})
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const logger = require('./utils/logger')

const {Cards} = require('./cards.js')
const { response } = require('express')

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
    const reqCardID = req.query.id;
    let response = `Sorry, no cards have been found with such id : ${reqCardID}`;
    cards.forEach(card => {
        if (card.id == reqCardID) {
            response = card
        }
    });
    res.send(response)
});


app.post('/cards', (req, res)=>{
    const id = cards.length
    const newCard = new Cards(id, req.body.cardName, req.body.members, req.body.description, req.body.tags, req.body.checklist, req.body.deadline, req.body.updateDate, req.body.createDate);
    cards.push(newCard)
    res.send(`Cards created at id :${id}`)
});

app.delete('/cards', (req, res)=>{
    const id = req.query.id
    let response = `Cannot find element at id : ${id}`
    const deletedCard = cards.splice(id, 1)
    if (deletedCard.length != 0) {
        response = `Card deleted at id : ${id}`
    }
    res.send(response)
});

app.patch('/cards', (req, res) =>{
    const id = req.query.id
    let response = `Cannot find element at id : ${id}`
    cards.forEach(element => {
        if (element.id == id) {
            element = new Cards(id, req.body.cardName, req.body.members, req.body.description, req.body.tags, req.body.checklist, req.body.deadline, req.body.updateDate, req.body.createDate);
            response = `Card at id : ${id} have been updated`
        }
    });
    res.send(response)
});
//other

app.listen(port, () => {
    logger.log(`API listening at http://localhost:${port}`)
})
  