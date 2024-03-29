var DBMV_Mark = require('./DBMV_Mark')
var SchemaTypes = require('./SCHEMA_TYPE')
var RowHeaders = require('./ROWHEADERS_TYPE')

/*
	Class: LkPropertiesOptions
		Contains the options to obtain the list of Properties of the different types of schemas with the LkProperties function.
		
		Property: SchemaType
			<SCHEMA_TYPE>
			
			Indicates the type of LkSchemas used.
			
		Property: RowHeaders
			<ROWHEADERS_TYPE>
			
			Include headings in first row MAINLABEL (main headings), SHORTLABEL (short label headings), and NONE (without headings).

		Property: SqlMode
			boolean

			SQLMODE type schemas

		Property: RowProperties
			boolean

			First row contains property names.

		Property: OnlyVisibles
			boolean
			
			Use only Visible Schemas and Properties.

		Property: UsePropertyNames
			boolean
			
			Use Properties and Table names.

		Property: Pagination
			boolean
			
			Indicates if pagination is being used or not.

		Property: Pagination_RegPage
			number
			
			In case of pagination indicates the number of records by page. It must be bigger than 0.

		Property: Pagination_NumPage
			number
			
			In case of pagination it indicates the page number to obtain. Must be greater than 0.
*/
class LkPropertiesOptions
{
	/*
		Constructor: constructor
			Initializes a new instance of the LkPropertiesOptions class.
			
			The object is created with the default values for list of Schema Properties of LKSCHEMAS type.
	*/
	constructor() {
		this.SchemaType = SchemaTypes.SCHEMA_TYPE.LKSCHEMAS;
		this.SqlMode = false;
		this.RowHeader = RowHeaders.ROWHEADERS_TYPE.MAINLABEL;
		this.RowProperties = false;
		this.OnlyVisibles = false;
		this.UsePropertyNames = false;
		this.Pagination = false;
		this.Pagination_RegPage = 10;
		this.Pagination_NumPage = 1;
	}

	//LK.SCHEMAS
	/*
		Function: LkSchemas
			Initializes the instance of the LkPropertiesOptions class.
			
			Constructor of object used to obtain a list of Properties of the LKSCHEMAS schema type.

		Arguments:
			rowHeaders - (<ROWHEADERS_TYPE>) Include headings in first row MAINLABEL (main headings), SHORTLABEL (short label headings), and NONE (without headings).
			rowProperties - (boolean) First row contains property names.
			onlyVisibles - (boolean) Use only Visible Schemas and Properties.
			usePropertyNames - (boolean) Use Properties and Table names.
			pagination - (boolean) True if pagination is being used.
			regPage - (number) For use with pagination, indicates the number of records by page. Must be greater than 0.
			numPage - (number) For use with pagination, indicates the page number to obtain. Must be greater than 0.
	*/
	LkSchemas(rowHeader = RowHeaders.ROWHEADERS_TYPE.MAINLABEL, rowProperties = false, onlyVisibles = false, usePropertyNames = false, pagination = false, regPage = 10, numPage = 1) {
		this.SchemaType = SchemaTypes.SCHEMA_TYPE.LKSCHEMAS;
		this.SqlMode = false;
		this.RowHeader = rowHeader;
		this.RowProperties = rowProperties;
		this.OnlyVisibles = onlyVisibles;
		this.UsePropertyNames = usePropertyNames;
		this.Pagination = pagination;
		this.Pagination_RegPage = regPage;
		this.Pagination_NumPage = numPage;
	}

	//SQLMODE
	/*
		Function: SqlMode
			Initializes the instance of the LkPropertiesOptions class.
			
			Constructor of object used to obtain a list of Properties of the SQLMODE schema type.

		Arguments:
			onlyVisibles - (boolean) Use only Visible Schemas and Properties.
			pagination - (boolean) True if pagination is being used.
			regPage - (number) For use with pagination, indicates the number of records by page. Must be greater than 0.
			numPage - (number) For use with pagination, indicates the page number to obtain. Must be greater than 0.
		
	*/
	SqlMode(onlyVisibles = false, pagination = false, regPage = 10, numPage = 1) {
		this.SchemaType = SchemaTypes.SCHEMA_TYPE.LKSCHEMAS;
		this.SqlMode = true;
		this.RowHeader = RowHeaders.ROWHEADERS_TYPE.NONE;
		this.RowProperties = true;
		this.OnlyVisibles = onlyVisibles;
		this.UsePropertyNames = true;
		this.Pagination = pagination;
		this.Pagination_RegPage = regPage;
		this.Pagination_NumPage = numPage;
	}

	//DICTIONARIES
	/*
		Function: Dictionaries
			Initializes the instance of the LkPropertiesOptions class.
			
			Constructor of object used to obtain a list of Properties of the DICTIONARIES schema type.

		Arguments:
			rowHeaders - (<ROWHEADERS_TYPE>)Include headings in first row MAINLABEL (main headings), SHORTLABEL (short label headings), and NONE (without headings).
			pagination - (boolean) True if pagination is being used.
			regPage - (number) For use with pagination, indicates the number of records by page. Must be greater than 0.
			numPage - (number) For use with pagination, indicates the page number to obtain. Must be greater than 0.
	*/
	Dictionaries(rowHeader = RowHeaders.ROWHEADERS_TYPE.MAINLABEL, pagination = false, regPage = 10, numPage = 1) {
		this.SchemaType = SchemaTypes.SCHEMA_TYPE.DICTIONARIES;
		this.SqlMode = false;
		this.RowHeader = rowHeader;
		this.RowProperties = true;
		this.OnlyVisibles = true;
		this.UsePropertyNames = false;
		this.Pagination = pagination;
		this.Pagination_RegPage = regPage;
		this.Pagination_NumPage = numPage;
	}

	/*
		Function: GetString
			Composes the LkProperties options string for processing through LinkarSERVER to the database.
			
		Returns:
			string
			
			The string ready to be used by LinkarSERVER.
	*/
	GetString() {
		var str = this.SchemaType + DBMV_Mark.AM_str +
			(this.SqlMode ? "1" : "0") + DBMV_Mark.AM_str +
			(this.UsePropertyNames ? "1" : "0") + DBMV_Mark.AM_str +
			(this.RowProperties ? "1" : "0") + DBMV_Mark.AM_str +
			(this.OnlyVisibles ? "1" : "0") + DBMV_Mark.AM_str +
		this.RowHeader + DBMV_Mark.AM_str +
		(this.Pagination ? "1" : "0") + DBMV_Mark.VM_str +
		this.Pagination_RegPage + DBMV_Mark.VM_str +
		this.Pagination_NumPage;
		return str;
	}
}

module.exports = {LkPropertiesOptions}