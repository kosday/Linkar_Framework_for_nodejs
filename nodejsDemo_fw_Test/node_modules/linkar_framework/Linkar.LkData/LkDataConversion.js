const LinkarStrings = require("../Linkar.Strings/StringFunctions")
const LkData = require("./LkData")

/*
	Class: LkDataConversion
		Class to management the result of the operations Conversion.
		
		Property: Conversion
		string
		
		The value of the Conversion operation
*/
class LkDataConversion extends LkData.LkData {

	/*
		Constructor: constructor
		
		
		Arguments:
			conversionResult - (string) The string result of the Conversion operation execution.
	*/
	constructor(conversionResult) {
		super(conversionResult);
		this.Conversion = LinkarStrings.StringFunctions.ExtractConversion(conversionResult);
	}

}

module.exports = {LkDataConversion}