var DBMV_Mark = require('./DBMV_Mark')
var CommonOptions = require('./CommonOptions')

/*
	Class: ReadAfterCommonOptions
		Auxiliary class with the ReadAfters options for <UpdateOptions> and <NewOptions> classes.
		
		*Extends:* <CommonOptions>
		
	Property: ReadAfter
		boolean
		
		Reads the record again and returns it after the update or new. <CommonOptions.Calculated>, <CommonOptions.Conversion>, <CommonOptions.FormatSpec> and <CommonOptions.OriginalRecords> properties will only make effect if this option is true.
*/
class ReadAfterCommonOptions extends CommonOptions.CommonOptions {
	
	/*
		Constructor: constructor
		
		Arguments:
			readAfter - (boolean) Reads the record again and returns it after the update or new. Calculated, conversion, formatSpec and originalRecords will only make effect if this option is true.
			calculated - (boolean) Return the resulting values from the calculated dictionaries.
			conversion - (boolean) Execute the defined conversions in the dictionaries before returning.
			formatSpec - (boolean) Execute the defined formats in the dictionaries before returning.
			originalRecords - (boolean) Return a copy of the records in MV format.
	*/
	constructor(readAfter = false, calculated = false, conversion = false, formatSpec = false, originalRecords = false){
		super(calculated, conversion, formatSpec, originalRecords);
		this.ReadAfter = readAfter;
	}

	/*
		Function: GetStringAM
			Composes the ReadAfterCommonOptions options string for use with <UpdateOptions> and <NewOptions> classes.
			
		Returns:
			string
			
			The string ready to be used by <UpdateOptions> and <NewOptions> classes
	*/
	GetStringAM() {
		return (this.ReadAfter ? "1" : "0") + DBMV_Mark.AM_str + super.GetStringAM();
	}
}

module.exports = {ReadAfterCommonOptions}
