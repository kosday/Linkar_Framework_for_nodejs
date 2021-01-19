const LinkarStrings = require("../Linkar.Strings/StringFunctions")
const MvOperations = require("../Linkar.Functions/MvOperations");

/*
	Class: LkItem
		A LkItem is compose of three items: RecordId, Record and OriginalRecord. Depending on the operation, the three items may be present, or only some of them.
		Each LkItem can hold a list of dictionaries (for real fields, for ID fields, and for calculated fields)
		
		Property: RecordId
		string
		
		The ID of the record.
		
		Property: Record
		string
		
		The content of a record from database.
		
		Property: OriginalRecord
		string
		
		A copy of the original record to be used in operations where the optimistic lock option is enabled.
		
		Property Calculated
		string
		
		The content of calculated fields from database.
		
		Property: LstDictsId
		string array
		
		Array with the dictionary names for record Ids.
		
		Property: LstDicts
		string array
		
		Array with the dictionary names for record fields.
		
		Property: LstDictsCalculated
		string array
		
		Array with the dictionary names for calculated fields of the record.
*/
class LkItem {

	/*
		Constructor: constructor
			Initializes a new instance of the LkItem class.
			
		Arguments:
			recordId - (string) The ID of the record.
			record - (string) The content of a record from database.
			calculateds - (string) The content of the calculated fields of the records.
			originalRecord - (string) A copy of the original record to be used in operations where the optimistic lock option is enabled.
			lstDictsId - (string array) Optionally, array with the dictionary names for record Ids.
			lstDicts - (string array) Optionally, array with the dictionary names for record fields.
			lstDictsCalculated - (string array) Optionally, array with the dictionary names for calculated fields of the record.
	*/
	constructor(recordId = "", record = "", calculateds = "", originalRecord = "", lstDictsId = [], lstDicts = [], lstDictsCalculated = []) {
		this.RecordId = recordId;
		this.Record = record;
		this.OriginalRecord = originalRecord;
		this.Calculated = calculateds;
		this.LstDictsId = lstDictsId;
		this.LstDicts = lstDicts;
		this.LstDictsCalculated = lstDictsCalculated;
	}

	/*
		Function: get
			Get attribute (fields number or dictionary names), multivalues or subvalues from the record.
			
		Arguments:
			attribute - (number or string) The field number or dictionary name to get.
			mv - (number) The multivalue number to get.
			sv - (number) The subvalue number to get.
			
		Returns:
			string
			
			The extrated value.
	*/
	get(attribute, mv = 0, sv = 0) {
		if(typeof attribute == 'number'){
			return MvOperations.MvOperations.LkExtract(this.Record, attribute, mv, sv);
		}
		else
		{
			var i;
			for (i = 0; i < this.LstDictsId.length; i++)
				if (this.LstDictsId[i] == attribute)
				{
					return this.RecordId;
				}
			for (i = 0; i < this.LstDicts.length; i++)
				if (this.LstDicts[i] == attribute)
				{
					return MvOperations.MvOperations.LkExtract(this.Record, (i + 1), mv, sv);
				}
			for (i = 0; i < this.LstDictsCalculated.length; i++)
				if (this.LstDictsCalculated[i] == attribute)
				{
					return MvOperations.MvOperations.LkExtract(this.Calculated, (i + 1), mv, sv);
				}
			throw new Exception("Dictionary name not found");
		}
	}

	/*
		Function: set
			Set attribute (fields number or dictionary names), multivalues or subvalues from the record.
			
		Arguments:
			attribute - (number or string) The field number or dictionary name to set.
			mv - (number) The multivalue number to set.
			sv - (number) The subvalue number to set.
	*/
	set(value, attribute, mv = 0, sv = 0) {
		if(typeof attribute == 'number'){
			this.Record = MvOperations.MvOperations.LkReplace(this.Record, value, attribute, mv, sv);
		}
		else
		{
			if (this.LstDictsId.length == 0)
				throw new Exception("Dictionaries ID List Empty");
			var i;
			for (i = 0; i < this.LstDictsId.length; i++)
				if (this.LstDictsId[i] == attribute)
				{
					this.RecordId = value;
					return;
				}
			if (this.LstDictsId.length == 0)
				throw new Exception("Dictionaries List Empty");
			for (i = 0; i < this.LstDicts.length; i++)
				if (this.LstDicts[i] == attribute)
				{
					this.Record = MvOperations.MvOperations.LkReplace(this.Record, value, (i + 1), mv, sv);
					return;
				}
			throw new Exception("Dictionary name not found");
		}
	}

	/*
		Function: ComposeReadBuffer
			Composes the final buffer string for one or more records to be read in MV Read operations, with the RecordId information.
		
		Returns:
		string
		
		The final string buffer for MV Read operations.
	*/
	ComposeReadBuffer() {
		return this.RecordId;
	}

	/*
		Function: ComposeUpdateBuffer
			Composes the final buffer string for one or more records to be updated in MV Update operations, with the RecordId, the Record, and optionally the OriginalRecord information.
			
		Arguments:
			includeOriginalBuffer - (boolean) Determines if the OriginalRecord must be include or not in the final buffer string.
		
		Returns:
		string
		
		The final string buffer for MV Update operations.
	*/
	ComposeUpdateBuffer(includeOriginalBuffer = false) {
		if (includeOriginalBuffer)
			return LinkarStrings.StringFunctions.ComposeUpdateBuffer(this.RecordId, this.Record, this.OriginalRecord);
		else
			return LinkarStrings.StringFunctions.ComposeUpdateBuffer(this.RecordId, this.Record);
	}

	/*
		Function: ComposeNewBuffer
			Composes the final buffer string for one or more records to be created in MV New operations, with the RecordId and the Record information.
		
		Returns:
		string
		
		The final string buffer for MV New operations.
	*/
	ComposeNewBuffer() {
		return LinkarStrings.StringFunctions.ComposeNewBuffer(this.RecordId, this.Record);
	}

	/*
		Function: ComposeDeleteBuffer
			Composes the final buffer string for one or more records to be deleted in MV Delete operations, with the RecordId and optionally with the OriginalRecord information.
			
		Arguments:
			includeOriginalBuffer - (boolean) Determines if the OriginalRecord must be include or not in the final buffer string.
		
		Returns:
		string
		
		The final string buffer for MV Delete operations.
	*/
	ComposeDeleteBuffer(includeOriginalBuffer = false) {
		if (includeOriginalBuffer)
			return LinkarStrings.StringFunctions.ComposeDeleteBuffer(this.RecordId, this.OriginalRecord);
		else
			return LinkarStrings.StringFunctions.ComposeDeleteBuffer(this.RecordId);
	}

}

module.exports = {LkItem}