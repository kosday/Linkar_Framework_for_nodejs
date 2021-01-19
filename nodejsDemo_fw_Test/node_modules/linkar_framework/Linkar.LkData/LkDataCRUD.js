const LinkarStrings = require("../Linkar.Strings/StringFunctions")
const LkData = require("./LkData")
const LkItems = require("./LkItems")
const LkItem = require("./LkItem")

/*
	Class: LkDataCRUD
		Class to management the result of the operations Read, Update, New, Delete, Select and Dictionaries.
		
		Property: TotalItems
		(number)
		
		Number of the items.
		
		Property: LkRecords
		(<LkItems>)
		
		LkItem list from the CRUD operation execution.
		
*/
class LkDataCRUD extends LkData.LkData {

	/*
		Constructor: constructor
			Initializes a new instance of the LkDataCRUD class.
			
		Arguments:
			crudOperationResult - (string) The string result of the CRUD operation execution.
	*/
	constructor(crudOperationResult) {
		super(crudOperationResult);
		this.TotalItems = LinkarStrings.StringFunctions.ExtractTotalRecords(crudOperationResult);
	
			var lstIdDicts = LinkarStrings.StringFunctions.ExtractRecordsIdDicts(crudOperationResult);
			var lstDictionaries = LinkarStrings.StringFunctions.ExtractRecordsDicts(crudOperationResult);
			var lstCalculatedDicts = LinkarStrings.StringFunctions.ExtractRecordsCalculatedDicts(crudOperationResult);
			this.LkRecords = new LkItems.LkItems(lstIdDicts, lstDictionaries, lstCalculatedDicts);
	
			var lstRecords = LinkarStrings.StringFunctions.ExtractRecords(crudOperationResult);
			var lstRecordIds = LinkarStrings.StringFunctions.ExtractRecordIds(crudOperationResult);
			var lstOriginalRecords = LinkarStrings.StringFunctions.ExtractOriginalRecords(crudOperationResult);
			var lstRecordsCalculated = LinkarStrings.StringFunctions.ExtractRecordsCalculated(crudOperationResult);
			var i;
			for (i = 0; i < lstRecordIds.length; i++)
			{
				var record = (lstRecords.length == lstRecordIds.length ? lstRecords[i] : "");
				var originalRecord = (lstOriginalRecords.length == lstRecordIds.length ? lstOriginalRecords[i] : "");
				var calculateds = (lstRecordsCalculated.length == lstRecordIds.length ? lstRecordsCalculated[i] : "");
				var lkRecord = new LkItem.LkItem(lstRecordIds[i], record, calculateds, originalRecord);
				this.LkRecords.push(lkRecord);
			}
	}

}

module.exports = {LkDataCRUD}