const LinkarStrings = require("../Linkar.Strings/StringFunctions")
const LkData = require("./LkData")

/*
	Class: LkDataSubroutine
		Class to management the result of the operations Subroutine.
		
		Property: Arguments
		string array
		
		Argument list of the Subroutine operation execution.
*/
class LkDataSubroutine extends LkData.LkData {

	/*
		Constructor: constructor
			Initializes a new instance of the LkDataCRUD class.
			
		Arguments:
			subroutineResult - (string) The string result of the Subroutine operation execution.
	*/
	constructor(subroutineResult) {
		super(subroutineResult);
		this.Arguments = LinkarStrings.StringFunctions.ExtractSubroutineArgs(subroutineResult);
	}
	
}

module.exports = {LkDataSubroutine}