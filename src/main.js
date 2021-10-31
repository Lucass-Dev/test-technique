const express = require('express')
require('dotenv').config({path: '.env'})
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const logger = require('./utils/logger')
const {writeFile} = require('./utils/write')

const {Cards} = require('./cards')
const {List} = require('./list')
const {User} = require('./user')
const {Table} = require('./table')
const { response } = require('express')

const app = express()
const port = process.env.HTTP_PORT

console.log(port);

// Middleware
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())


let cards = []
let lists = []
let users = []
let tables = [];

// insert your router here

//ROUTE FOR TABLE

app.post('/table', (req, res) => {
    let newTable = new Table(req.body.id, req.body.tableName, lists, req.body.updateDate, req.body.createDate, req.body.ownerId);
    let userId = newTable.ownerId;

    users.forEach(user => {
        if(user.id == userId){
            user.relatedTable = table.id
        }
    });
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] Table created\n`)
    res.send("Table created successfully")
});
app.patch('/table', (req, res) => {
    table.listArray = lists;
    table.updateDate = "xx-xx-xxxx"
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] Tbale updated\n`)
    res.send("Table updated successfully")
});

app.get('/table', (req, res) => {
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] All tables getted\n`)
    res.send(tables)
});

app.delete('/table', (req, res) => {
    const id = parseInt(req.query.id)
    let response = `Cannot find element at id : ${id}`
    tables.forEach(table => {
        if (table.id == id) {
            const specificId = tables.map(function(e){
                return e.id
            }).indexOf(id)
            tables.splice(specificId, 1)
            response = `table at id: ${id} have been deleted`
        };
    });
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] Table ${id} deleted\n`)
    res.send(response)
});

//ROUTE FOR CARDS
app.get('/cards', (req, res)=>{
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] All cards getted\n`)
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
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] Cards ${id} getted\n`)
    res.send(response)
});


app.post('/cards', (req, res)=>{
    const newCard = new Cards(req.body.id, req.body.cardName, req.body.members, req.body.description, req.body.tags, req.body.checklist, req.body.deadline, req.body.updateDate, req.body.createDate);
    cards.push(newCard)

    const listName = req.query.newListName
    lists.forEach(element => {
        if (element.listName == listName) {
            element.cardsArray.push(newCard)
        }
    });
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] Cards ${id} created\n`)
    res.send(`Cards created at id :${req.body.id} and pushed into '${listName}' List`)
});

app.delete('/cards', (req, res)=>{
    const id = parseInt(req.query.id)
    let response = `Cannot find element at id : ${id}`
    cards.forEach(card => {
        if (card.id == id) {
            const specificId = cards.map(function(e){
                return e.id
            }).indexOf(id)
            cards.splice(specificId, 1)
            response = `card at id: ${id} have been deleted`
        };
    });
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] Card ${id} deleted\n`)
    res.send(response)
});

app.patch('/cards', (req, res) =>{
    const id = parseInt(req.query.id)
    const newListName = req.query.newListName
    let patch
    let response = `Cannot find element at id : ${id}`
    cards.forEach(element => {
        if (element.id == id) {

            const specificId = cards.map(function(e){
                return e.id
            }).indexOf(id)
            cards.splice(specificId, 1)
            patch = new Cards(id, req.body.cardName, req.body.members, req.body.description, req.body.tags, req.body.checklist, req.body.deadline, req.body.updateDate, req.body.createDate);
            cards.push(patch)
            
            response = `Card at id : ${id} have been updated`;
        }
    });
    
    
    lists.forEach(list => {
        list.cardsArray.forEach(card => {
            if (card.id == id) {
                const specificId = list.cardsArray.map(function(e){
                    return e.id
                }).indexOf(id)
                list.cardsArray.splice(specificId, 1)
            };
        });
    });
    lists.forEach(list =>{
        if (list.listName == newListName) {
            list.cardsArray.push(patch)
        }
    })
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] Cards ${id} updated\n`)
    res.send(response)
});

//ROUTE FOR LIST

app.get('/lists', (req, res) =>{
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] All lists getted\n`)

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
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] List ${id} getted\n`)
    res.send(response);
});

app.post('/lists', (req, res) =>{
    const id =  req.body.id;
    const newList = new List(id, req.body.listName, req.body.cardsArray, req.body.createDate);
    lists.push(newList);
    res.send(`Cards created at id :${id}`)
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] List ${id} created\n`)
});

app.delete('/lists', (req, res)=>{
    const id = parseInt(req.query.id)
    let response = `Cannot find element at id : ${id}`
    lists.forEach(list => {
        if (list.id == id) {
            const specificId = lists.map(function(e){
                return e.id
            }).indexOf(id)
            lists.splice(specificId, 1)
            response = `list at id: ${id} have been deleted`
        };
    });
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] List ${id} deleted\n`)
    res.send(response)
});

app.patch('/lists', (req, res) =>{
    const id = parseInt(req.query.id)
    let response = `Cannot find element at id : ${id}`
    let updateList;
    lists.forEach(list => {
        if (list.id == id) {
            const specificId = lists.map(function(e){
                return e.id
            }).indexOf(id)
            lists.splice(specificId, 1)
            updateList = new Cards(id, req.body.cardName, req.body.members, req.body.description, req.body.tags, req.body.checklist, req.body.deadline, req.body.updateDate, req.body.createDate);
            lists.push(updateList)
            response = `User at id : ${id} have been updated`;
        }
    });
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] List ${id} updated\n`)
    res.send(response)
});

//ROUTES FOR USERS

app.get('/users', (req, res) =>{
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] All users getted\n`)
    res.send(users)
})

app.get('/usersById', (req, res) =>{
    const id = parseInt(req.query.id);
    let response = `Cannot find element at id : ${id}`
    users.forEach(element => {
        if (element.id == id) {
            response = element
        }
    });
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] User ${id} getted\n`)
    res.send(response)
});

app.post('/users', (req, res) => {
    const id = req.body.id
    const newUser = new User(id, req.body.pseudo, req.body.mail, req.body.date, req.body.relatedTable);
    users.push(newUser);
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] User ${id} created\n`)
    res.send(`User created at id :${id}`)
});

app.patch('/users', (req, res) => {
    const id = parseInt(req.query.id)
    let response = `Cannot find element at id : ${id}`
    let updatedUser;
    users.forEach(user => {
        if (user.id == id) {
            const specificId = users.map(function(e){
                return e.id
            }).indexOf(id)
            users.splice(specificId, 1)
            updatedUser = new User(id, req.body.pseudo, req.body.mail, req.body.date, req.body.relatedTable);
            users.push(updatedUser)
            response = `User at id : ${id} have been updated`;
        }
    });
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] User ${id} updated\n`)
    res.send(response)
});

app.delete('/users', (req, res) => {
    const id = parseInt(req.query.id)
    let response = `Cannot find element at id : ${id}`
    users.forEach(user => {
        if (user.id == id) {
            const specificId = users.map(function(e){
                return e.id
            }).indexOf(id)
            users.splice(specificId, 1)
            response = `User at id : ${id} have been deleted`;
        };
    });
    let date = Date.now()
    date = Date(date)
    writeFile(`[ ${date} ] User ${id} deleted\n`)
    res.send(response)
});
//other

app.listen(port, () => {
    logger.log(`API listening at http://localhost:${port}`)
})
  