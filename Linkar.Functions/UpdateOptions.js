var DBMV_Mark = require('./DBMV_Mark')
var ReadAfterCommonOptions = require('./ReadAfterCommonOptions')

/*
	Class: UpdateOptions
		Object that works as an argument in Update function and defines the function options.
	
	Property: OptimisticLockControl
		boolean
		
		If "true", the Update function will check out if the file has not been modified by other user.
		
	Remarks:
		If the optimisticLockControl property is set to true, a copy of the record must be provided before the modification (originalRecords argument)
		to use the Optimistic Lock technique. This copy can be obtained from a previous Read operation. The database, before executing the modification, 
		reads the record and compares it with the copy in originalRecords, if they are equal the modified record is executed.
		But if they are not equal, it means that the record has been modified by other user and its modification will not be saved.
		The record will have to be read, modified and saved again.
	
	Property: ReadAfter
		boolean
		
		Reads the record again and returns it after the update. Calculated, Conversion, FormatSpec and OriginalRecords will only make effect if this option is true.
		
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
class UpdateOptions {
	
	/*
		Constructor: constructor
			Initializes a new instance of the UpdateOptions class.
			
		Arguments:
			optimisticLockControl -  (boolean) If "true", the Update function will check out if the file has not been modified by other user. See <OptimisticLockControl> property.
			readAfter -  (boolean) Reads the record again and returns it after the update. Calculated, conversion, formatSpec and originalRecords will only be applied if this option is true.
			calculated -  (boolean) Return the resulting values from the calculated dictionaries.
			conversion -  (boolean) Execute the defined conversions in the dictionaries before returning.
			formatSpec -  (boolean) Execute the defined formats in the dictionaries before returning.
			originalRecords - (boolean) Return a copy of the records in MV format.
	*/
	constructor(optimisticLockControl = false, readAfter = false, calculated = false, conversion = false, formatSpec = false, originalRecords = false){
	this.OptimisticLockControl = optimisticLockControl;

	if (readAfter)
		this.ReadAfterCommonOptions = new ReadAfterCommonOptions.ReadAfterCommonOptions(readAfter, calculated, conversion, formatSpec, originalRecords)
	else
		this.ReadAfterCommonOptions = new ReadAfterCommonOptions.ReadAfterCommonOptions(readAfter, false, false, false, false)
		
	this.ReadAfter = this.ReadAfterCommonOptions.ReadAfter;
	this.Calculated = this.ReadAfterCommonOptions.Calculated;
	this.Conversion = this.ReadAfterCommonOptions.Conversion;
	this.FormatSpec = this.ReadAfterCommonOptions.FormatSpec;
	this.OriginalRecords = this.ReadAfterCommonOptions.OriginalRecords;
}

	/*
		Function: GetString
			Composes the Update options string for processing through LinkarSERVER to the database.
			
		Returns:
			string
			
			The string ready to be used by LinkarSERVER.
	*/
	GetString()
	{
		var str = (this.OptimisticLock ? "1" : "0") + DBMV_Mark.AM_str + this.ReadAfterCommonOptions.GetStringAM();
		return str;
	}
}

module.exports = {UpdateOptions}
