var DBMV_Mark = require('./DBMV_Mark')
var SchemaTypes = require('./SchemaTypes')
var RowHeaders = require('./RowHeaders')

class TableOptions
{
    constructor()
    {
        this.SchemaType = SchemaTypes.SchemaTypes.LKSCHEMAS;
        this.SqlMode = false;
        this.RowHeader = RowHeaders.RowHeaders.MAINLABEL;
        this.RowProperties = false;
        this.OnlyVisibles = false;
        this.UsePropertyNames = false;
        this.RepeatValues = false;
        this.ApplyConversion = false;
        this.ApplyFormat = false;
        this.Calculated = false;
        this.Pagination = false;
        this.Pagination_RegPage = 10;
        this.Pagination_NumPage = 1;
    }

    //LK.SCHEMAS
	LkSchemas(rowHeader = RowHeaders.RowHeaders.MAINLABEL, rowProperties = false, onlyVisibles = false, usePropertyNames = false,
    		repeatValues = false, applyConversion = false, applyFormat = false, calculated = false,
    		pagination = false, regPage = 10, numPage = 1)
    {
        this.SchemaType = SchemaTypes.SchemaTypes.LKSCHEMAS;
        this.SqlMode = false;
        this.RowHeader = rowHeader;
        this.RowProperties = rowProperties;
        this.OnlyVisibles = onlyVisibles;
        this.UsePropertyNames = usePropertyNames;
        this.RepeatValues = repeatValues;
        this.ApplyConversion = applyConversion;
        this.ApplyFormat = applyFormat;
        this.Calculated = calculated;
        this.Pagination = pagination;
        this.Pagination_RegPage = regPage;
        this.Pagination_NumPage = numPage;
    }

    //SQLMODE
	SqlMode(onlyVisibles = false, applyConversion = false, applyFormat = false, calculated = false,
    		pagination = false, regPage = 10, numPage = 1)
    {
        this.SchemaType = SchemaTypes.SchemaTypes.LKSCHEMAS;
        this.SqlMode = true;
        this.RowHeader = RowHeaders.RowHeaders.NONE;
        this.RowProperties = true;
        this.OnlyVisibles = onlyVisibles;
        this.UsePropertyNames = true;
        this.RepeatValues = true;
        this.ApplyConversion = applyConversion;
        this.ApplyFormat = applyFormat;
        this.Calculated = calculated;
        this.Pagination = pagination;
        this.Pagination_RegPage = regPage;
        this.Pagination_NumPage = numPage;
    }

    //DICTIONARIES
	Dictionaries(rowHeader = RowHeaders.RowHeaders.MAINLABEL, repeatValues = false, applyConversion = false, applyFormat = false, calculated = false,
        pagination = false, regPage = 10, numPage = 1)
    {
        this.SchemaType = SchemaTypes.SchemaTypes.DICTIONARIES;
        this.SqlMode = false;
        this.RowHeader = rowHeader;
        this.RowProperties = false;
        this.OnlyVisibles = false;
        this.UsePropertyNames = false;
        this.RepeatValues = repeatValues;
        this.ApplyConversion = applyConversion;
        this.ApplyFormat = applyFormat;
        this.Calculated = calculated;
        this.Pagination = pagination;
        this.Pagination_RegPage = regPage;
        this.Pagination_NumPage = numPage;
    }

	None(rowHeader = RowHeaders.RowHeaders.MAINLABEL, repeatValues = false, 
    		pagination = false, regPage = 10, numPage = 1)
    {
        this.SchemaType = SchemaTypes.SchemaTypes.NONE;
        this.SqlMode = false;
        this.RowHeader = rowHeader;
        this.RowProperties = false;
        this.OnlyVisibles = false;
        this.UsePropertyNames = false;
        this.RepeatValues = repeatValues;
        this.ApplyConversion = false;
        this.ApplyFormat = false;
        this.Calculated = false;
        this.Pagination = pagination;
        this.Pagination_RegPage = regPage;
        this.Pagination_NumPage = numPage;
    }

    GetString()
    {
        var str = this.SchemaType + DBMV_Mark.AM_str +
            (this.SqlMode ? "1" : "0") + DBMV_Mark.AM_str +
            (this.UsePropertyNames ? "1" : "0") + DBMV_Mark.AM_str +
            (this.RowProperties ? "1" : "0") + DBMV_Mark.AM_str +
            (this.OnlyVisibles ? "1" : "0") + DBMV_Mark.AM_str +
         this.RowHeader + DBMV_Mark.AM_str +
        (this.RepeatValues ? "1" : "0") + DBMV_Mark.AM_str +
        (this.ApplyConversion ? "1" : "0") + DBMV_Mark.AM_str +
        (this.ApplyFormat ? "1" : "0") + DBMV_Mark.AM_str +
        (this.Calculated ? "1" : "0") + DBMV_Mark.AM_str +
         (this.Pagination ? "1" : "0") + DBMV_Mark.VM_str +
         this.Pagination_RegPage + DBMV_Mark.VM_str +
         this.Pagination_NumPage;
        return str;
    }
}

module.exports = {TableOptions}