class User{
    constructor(id, pseudo, mail, date, relatedTable){
        this.id = id;
        this.pseudo = pseudo;
        this.mail = mail;
        this.date = date;
        this.relatedTable = relatedTable;
    }
}

module.exports={
    User:User
}