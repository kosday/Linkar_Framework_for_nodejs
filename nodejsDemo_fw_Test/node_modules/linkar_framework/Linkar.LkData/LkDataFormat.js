const LinkarStrings = require("../Linkar.Strings/StringFunctions")
const LkData = require("./LkData")

/*
	Class: LkDataFormat
		Class to management the result of the operations Format.
	
		Property: Format
		string
		
		The value of Format operation.
*/
class LkDataFormat extends LkData.LkData {

	/*
		Constructor: constructor
			Initializes a new instance of the LkDataCRUD class.
			
		Arguments:
			formatResult - (string) The string result of the Format operation execution.
	*/
	constructor(formatResult) {
		super(formatResult);
		this.Format = LinkarStrings.StringFunctions.ExtractFormat(formatResult);
	}

}

module.exports = {LkDataFormat}