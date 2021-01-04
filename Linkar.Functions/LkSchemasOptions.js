var DBMV_Mark = require('./DBMV_Mark')
var SchemaTypes = require('./SchemaTypes')
var RowHeaders = require('./RowHeaders')

class LkSchemasOptions
{
    constructor()
    {
        this.SchemaType = SchemaTypes.SchemaTypes.LKSCHEMAS;
        this.SqlMode = false;
        this.RowHeader = RowHeaders.RowHeaders.MAINLABEL;
        this.RowProperties = false;
        this.OnlyVisibles = false;
        this.Pagination = false;
        this.Pagination_RegPage = 10;
        this.Pagination_NumPage = 1;
    }

    //LK.SCHEMAS
	LkSchemas(rowHeader = RowHeaders.RowHeaders.MAINLABEL, rowProperties = false, onlyVisibles = false, pagination = false, regPage = 10, numPage = 1)
    {
        this.SchemaType = SchemaTypes.SchemaTypes.LKSCHEMAS;
        this.SqlMode = false;
        this.RowHeader = rowHeader;
        this.RowProperties = rowProperties;
        this.OnlyVisibles = onlyVisibles;
        this.Pagination = pagination;
        this.Pagination_RegPage = regPage;
        this.Pagination_NumPage = numPage;
    }

    //SQLMODE
	SqlMode(onlyVisibles = false, pagination = false, regPage = 10, numPage = 1)
    {
        this.SchemaType = SchemaTypes.SchemaTypes.LKSCHEMAS;
        this.SqlMode = true;
        this.RowHeader = RowHeaders.RowHeaders.NONE;
        this.RowProperties = true;
        this.OnlyVisibles = onlyVisibles;
        this.Pagination = pagination;
        this.Pagination_RegPage = regPage;
        this.Pagination_NumPage = numPage;
    }

    //DICTIONARIES
	Dictionaries(rowHeader = RowHeaders.RowHeaders.MAINLABEL, pagination = false, regPage = 10, numPage = 1)
    {
        this.SchemaType = SchemaTypes.SchemaTypes.DICTIONARIES;
        this.SqlMode = false;
        this.RowHeader = rowHeader;
        this.RowProperties = true;
        this.OnlyVisibles = true;
        this.Pagination = pagination;
        this.Pagination_RegPage = regPage;
        this.Pagination_NumPage = numPage;
    }

    GetString()
    {
        var str = this.SchemaType + DBMV_Mark.AM_str +
            (this.SqlMode ? "1" : "0") + DBMV_Mark.AM_str +
            (this.RowProperties ? "1" : "0") + DBMV_Mark.AM_str +
            (this.OnlyVisibles ? "1" : "0") + DBMV_Mark.AM_str +
         this.RowHeader + DBMV_Mark.AM_str +
         (this.Pagination ? "1" : "0") + DBMV_Mark.VM_str +
         this.Pagination_RegPage + DBMV_Mark.VM_str +
         this.Pagination_NumPage;
        return str;
    }	
}

module.exports = {LkSchemasOptions}