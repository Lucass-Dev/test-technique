class Cards{
    constructor(id, cardName, members, description, tags, checklist, deadline, updateDate, createDate){
        this.id = id;
        this.cardName = cardName;
        this.members = members;
        this.description = description;
        this.tags = tags;
        this.checklist = checklist;
        this.deadline = deadline;
        this.updateDate = updateDate;
        this.createDate = createDate;
    }
}

module.exports = {
    Cards: Cards
}