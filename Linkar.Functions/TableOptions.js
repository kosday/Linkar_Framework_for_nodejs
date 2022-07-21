var DBMV_Mark = require('./DBMV_Mark')
var SchemaTypes = require('./SCHEMA_TYPE')
var RowHeaders = require('./ROWHEADERS_TYPE')

/*
	Class: TableOptions
		Detailed options to be used in GetTable and related functions.
		
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

		Property: RepeatValues
			boolean
			
			Repeat common atributes in MV and SV groups.

		Property: ApplyConversion
			boolean
			
			Execute Conversions: With Dictionaries, conversion defined in the dictionary. With Schemas conversions defined in Linkar Schemas.

		Property: ApplyFormat
			boolean
			
			Execute Formats. With Dictionaries, formats defined in the dictionary. With Schemas formats defined in Linkar Schemas.

		Propery: Calculated
			boolean
			
			Return the resulting values from the calculated dictionaries.

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
class TableOptions
{
	/*
		Constructor: constructor
		
		Initializes a new instance of the TableOptions class.
		
		The object is created with the default values for queries with LKSCHEMAS type schemas.
	*/
	constructor() {
		this.SchemaType = SchemaTypes.SCHEMA_TYPE.LKSCHEMAS;
		this.SqlMode = false;
		this.RowHeader = RowHeaders.ROWHEADERS_TYPE.MAINLABEL;
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
	/*
		Function: LkSchemas
			Initializes the instance of the TableOptions class.
			
			Constructor of object used to obtain queries of the LKSCHEMAS schema type.

		Arguments:
			rowHeaders - (<ROWHEADERS_TYPE>) Include headings in first row MAINLABEL (main headings), SHORTLABEL (short label headings), and NONE (without headings).
			rowProperties - (boolean) First row contains property names.
			onlyVisibles - (boolean) Use only Visible Schemas and Properties.
			usePropertyNames - (boolean) Use Properties and Table names.
			repeatValues - (boolean) Repeat common atributes in MV and SV groups.
			applyConversion - (boolean) Execute Conversions: With Dictionaries, conversion defined in the dictionary. With Schemas conversions defined in Linkar Schemas.
			applyFormat - (boolean) Execute Formats. With Dictionaries, formats defined in the dictionary. With Schemas formats defined in Linkar Schemas.
			calculated - (boolean) Return the resulting values from the calculated dictionaries.
			pagination - (boolean) True if pagination is being used.
			regPage - (number) For use with pagination, indicates the number of records by page. Must be greater than 0.
			numPage - (number) For use with pagination, indicates the page number to obtain. Must be greater than 0.
	*/
	LkSchemas(rowHeader = RowHeaders.ROWHEADERS_TYPE.MAINLABEL, rowProperties = false, onlyVisibles = false, usePropertyNames = false,
			repeatValues = false, applyConversion = false, applyFormat = false, calculated = false,
			pagination = false, regPage = 10, numPage = 1) {
		this.SchemaType = SchemaTypes.SCHEMA_TYPE.LKSCHEMAS;
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
	/*
		Function: SqlMode
			Initializes the instance of the TableOptions class.
			
			Constructor of object used to perform queries of the SQLMODE type schemas.

		Arguments:
			onlyVisibles - (boolean) Use only Visible Schemas and Properties.
			applyConversion - (boolean) Execute Conversions: With Dictionaries, conversion defined in the dictionary. With Schemas conversions defined in Linkar Schemas.
			applyFormat - (boolean) Execute Formats. With Dictionaries, formats defined in the dictionary. With Schemas formats defined in Linkar Schemas.
			calculated - (boolean) Return the resulting values from the calculated dictionaries.
			pagination - (boolean) True if pagination is being used.
			regPage - (number) For use with pagination, indicates the number of records by page. Must be greater than 0.
			numPage - (number) For use with pagination, indicates the page number to obtain. Must be greater than 0.
	*/
	SqlMode(onlyVisibles = false, applyConversion = false, applyFormat = false, calculated = false,
			pagination = false, regPage = 10, numPage = 1) {
		this.SchemaType = SchemaTypes.SCHEMA_TYPE.LKSCHEMAS;
		this.SqlMode = true;
		this.RowHeader = RowHeaders.ROWHEADERS_TYPE.NONE;
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
	/*
		Function: Dictionaries
			Initializes the instance of the TableOptions class.
			
			Constructor of object used to perform queries of the DICTIONARIES type schemas.

		Arguments:
			rowHeaders - (<ROWHEADERS_TYPE>) Include headings in first row MAINLABEL (main headings), SHORTLABEL (short label headings), and NONE (without headings).
			repeatValues - (boolean) Repeat common atributes in MV and SV groups.
			applyConversion - (boolean) Execute Conversions: With Dictionaries, conversion defined in the dictionary. With Schemas conversions defined in Linkar Schemas.
			applyFormat - (boolean) Execute Formats. With Dictionaries, formats defined in the dictionary. With Schemas formats defined in Linkar Schemas.
			calculated - (boolean) Return the resulting values from the calculated dictionaries.
			pagination - (boolean) True if pagination is being used.
			regPage - (number) For use with pagination, indicates the number of records by page. Must be greater than 0.
			numPage - (number) For use with pagination, indicates the page number to obtain. Must be greater than 0.
	*/
	Dictionaries(rowHeader = RowHeaders.ROWHEADERS_TYPE.MAINLABEL, repeatValues = false, applyConversion = false, applyFormat = false, calculated = false,
		pagination = false, regPage = 10, numPage = 1) {
		this.SchemaType = SchemaTypes.SCHEMA_TYPE.DICTIONARIES;
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

	/*
		Function: None
			Initializes the instance of the TableOptions class.
			
			Constructor of object used to perform queries without schema information.

		Arguments:
			rowHeaders - (<ROWHEADERS_TYPE>) Include headings in first row MAINLABEL (main headings), SHORTLABEL (short label headings), and NONE (without headings).
			repeatValues - (boolean) Repeat common atributes in MV and SV groups.
			pagination - (boolean) True if pagination is being used.
			regPage - (number) For use with pagination, indicates the number of records by page. Must be greater than 0.
			numPage - (number) For use with pagination, indicates the page number to obtain. Must be greater than 0.
	*/
	None(rowHeader = RowHeaders.ROWHEADERS_TYPE.MAINLABEL, repeatValues = false, 
			pagination = false, regPage = 10, numPage = 1) {
		this.SchemaType = SchemaTypes.SCHEMA_TYPE.NONE;
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

	/*
		Function: GetString
			Composes the GetTable options string for processing through LinkarSERVER to the database.
			
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