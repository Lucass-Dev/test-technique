const cards = require("./cards");

class List{
    constructor(id, listName, cardsArray, createDate){
        this.id = id;
        this.listName = listName;
        this.cardsArray = cardsArray;
        this.createDate = createDate;
    }
}

module.exports = {
    List: List
}