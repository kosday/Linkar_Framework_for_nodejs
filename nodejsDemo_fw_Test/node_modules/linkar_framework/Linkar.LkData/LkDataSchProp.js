const LinkarStrings = require("../Linkar.Strings/StringFunctions")
const LkData = require("./LkData")

/*
	Class: LkDataSchProp
		Class to management the result of the operations LkSchemas and LkProperties.
		
		Property: RowProperties
		string
		
		The RowProperties value of the LkSchemas or LkLkProperties operations.
		
		Property: RowHeaders
		string
		
		The RowHeaders value of the LkSchemas or LkProperties operations.
*/
class LkDataSchProp extends LkData.LkData {

	/*
		Constructor: constructor
			Initializes a new instance of the LkDataSchProp class.
		
		Arguments:
			lkSchemasResult - (string) The string result of the Lkchemas or LkProperties operation execution.
	*/
	constructor(lkSchemasResult) {
		super(lkSchemasResult);
		this.RowProperties = LinkarStrings.StringFunctions.ExtractRowProperties(lkSchemasResult);
		this.RowHeaders = LinkarStrings.StringFunctions.ExtractRowHeaders(lkSchemasResult);
	}

}

module.exports = {LkDataSchProp}