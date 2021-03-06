var CommonOptions = require('./CommonOptions')

/*
	Class: ReadOptions
		Object that works as an argument in Read function and defines the function options.
				
	Property: Calculated
		boolean
		
		Returns the resulting values from the calculated dictionaries.

	Property: Conversion
		boolean
		
		Executes the defined conversions in the dictionaries before returning.

	Property: FormatSpec
		string
		
		Executes the defined formats in the dictionaries before returning.

	Property: OriginalRecords
		boolean
		
		Returns a copy of the records in MV format.
*/
class ReadOptions {
	/*
		Constructor: constructor
			Initializes a new instance of the ReadOptions class
			
		Arguments:
			calculated - (boolean) Return the resulting values from the calculated dictionaries.
			conversion - (boolean) Execute the defined conversions in the dictionaries before returning.
			formatSpec - (boolean) Execute the defined formats in the dictionaries before returning.
			originalRecords - (boolean) Return a copy of the records in MV format.
		
	*/
	constructor(calculated = false, conversion = false, formatSpec = false, originalRecords = false){
		this.CommonOptions =  new CommonOptions.CommonOptions(calculated,conversion,formatSpec,originalRecords);
		this.Calculated = this.CommonOptions.Calculated;
		this.Conversion = this.CommonOptions.Conversion;
		this.FormatSpec = this.CommonOptions.FormatSpec;
		this.OriginalRecords = this.CommonOptions.OriginalRecords;
	}
	
	/*
		Function: GetString
			Composes the Read options string for processing through LinkarSERVER to the database.
			
		Returns:
			string
			
			The string ready to be used by LinkarSERVER
	*/
	GetString()
	{
		return this.CommonOptions.GetStringAM();
	}
}

module.exports = {ReadOptions}
