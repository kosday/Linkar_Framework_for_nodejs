const LinkarStrings = require("../Linkar.Strings/StringFunctions")
const LkData = require("./LkData")

/*
	Class: LkDataExecute
		Class to management the result of the operations Execute.
		
		Property: Capturing
		string
		
		The Capturing value of the Execute operation.
		
		Property: Returning
		string
		
		The Returning value of the Execute operation
*/
class LkDataExecute extends LkData.LkData {

	/*
		Constructor: constructor
			Initializes a new instance of the LkDataExecute class.
		
		Arguments:
			executeResult - (string) The string result of the Execute operation execution.
	*/
	constructor(executeResult) {
		super(executeResult);
		this.Capturing = LinkarStrings.StringFunctions.ExtractCapturing(executeResult);
		this.Returning = LinkarStrings.StringFunctions.ExtractReturning(executeResult);
	}

}

module.exports = {LkDataExecute}