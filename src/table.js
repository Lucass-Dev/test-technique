class Table{
    constructor(id, tableName, listArray, updateDate, createDate, tagsArray, ownerId){
        this.id = id;
        this.tableName = tableName;
        this.listArray = listArray;
        this.updateDate = updateDate;
        this.createDate = createDate;
        this.tagsArray = tagsArray;
        this.ownerId = ownerId;
    }
}

module.exports={
    Table: Table
}