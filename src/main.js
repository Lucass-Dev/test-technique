const express = require('express')
require('dotenv').config({path: '.env'})
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const logger = require('./utils/logger')

const {Cards} = require('./cards.js')
const {List} = require('./list.js')
const { response } = require('express')
const list = require('./list.js')

const app = express()
const port = process.env.HTTP_PORT

console.log(port);

// Middleware
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())


let cards = []
let lists = []
// insert your router here


//ROUTE FOR CARDS
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

    const listName = req.query.newListName
    lists.forEach(element => {
        if (element.listName == listName) {
            element.cardsArray.push(newCard)
        }
    });
    res.send(`Cards created at id :${id} and pushed into '${listName}' List`)
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
    const id = parseInt(req.query.id)
    const newListName = req.query.newListName
    let patch
    let response = `Cannot find element at id : ${id}`
    cards.forEach(element => {
        if (element.id == id) {

            const test = cards.map(function(e){
                return e.id
            }).indexOf(id)
            cards.splice(test, 1)
            patch = new Cards(id, req.body.cardName, req.body.members, req.body.description, req.body.tags, req.body.checklist, req.body.deadline, req.body.updateDate, req.body.createDate);
            cards.push(patch)
            
            response = `Card at id : ${id} have been updated`;
        }
    });
    
    
    lists.forEach(list => {
        list.cardsArray.forEach(card => {
            if (card.id == id) {
                const test = list.cardsArray.map(function(e){
                    return e.id
                }).indexOf(id)
                list.cardsArray.splice(test, 1)
            };
        });
    });
    lists.forEach(list =>{
        if (list.listName == newListName) {
            list.cardsArray.push(patch)
        }
    })
    res.send(response)
});

//ROUTE FOR LIST

app.get('/lists', (req, res) =>{
    res.send(lists);
})

app.get('/listsById', (req, res) =>{
    const id = parseInt(req.query.id)
    let response = `Sorry, no list have been found with such id : ${id}`
    lists.forEach(element => {
        if (element.id == id) {
            response = element
        }
    });
    res.send(response);
});

app.post('/lists', (req, res) =>{
    const id =  lists.length;
    const newList = new List(id, req.body.listName, req.body.cardsArray, req.body.createDate);
    lists.push(newList);
    res.send(`Cards created at id :${id}`)
});

app.delete('/lists', (req, res)=>{
    const id = parseInt(req.query.id)
    let response = `Cannot find element at id : ${id}`
    const deletedList = lists.splice(id, 1)
    if (deletedList.length != 0) {
        response = `Card deleted at id : ${id}`
    }
    res.send(response)
});

app.patch('/lists', (req, res) =>{
    const id = parseInt(req.query.id)
    let response = `Cannot find element at id : ${id}`
    lists.forEach(element => {
        if (element.id == id) {
            element = new Cards(id, req.body.cardName, req.body.members, req.body.description, req.body.tags, req.body.checklist, req.body.deadline, req.body.updateDate, req.body.createDate);
            response = `Card at id : ${id} have been updated`;
        }
    });
    res.send(response)
});
//other

app.listen(port, () => {
    logger.log(`API listening at http://localhost:${port}`)
})
  