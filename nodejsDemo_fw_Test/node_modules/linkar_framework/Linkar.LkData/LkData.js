const LinkarStrings = require("../Linkar.Strings/StringFunctions")

/*
	Class: LkData
		Base class with common properties of all derived class.
	
	Property: OperationResult
	string
	
	The string that is obtained as result from the operation execution.
	
	Property: Errors
	string array
	
	List of the error of the operation execution.
	
*/
class LkData {

	/*
		Constructor: constructor
			Initializes a new instance of the LkData class.
		
		Arguments:
			opResult - (string) The string result of the operation execution.
	*/
	constructor(opResult) {
		this.OperationResult = opResult;
		this.Errors = LinkarStrings.StringFunctions.ExtractErrors(opResult);
	}

}

module.exports = {LkData}