class Table{
    constructor(id, tableName, listArray, updateDate, createDate, tagsArray){
        this.id = id;
        this.tableName = tableName;
        this.listArray = listArray;
        this.updateDate = updateDate;
        this.createDate = createDate;
        this.tagsArray = tagsArray;
    }
}

module.exports={
    Table: Table
}