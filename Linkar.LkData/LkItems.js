const LinkarFunctions = require("../Linkar.Functions/LinkarFunctions")
const LkItem = require("./LkItem");

/*
	Class: LkItems
			This class is to implement List of the <LkItem> elements.
			
		Property: LstDictsId
		string array
		
		Array with the dictionary names for record Ids.
		The same array for each LkItem that is stored in the list.

		Property: LstDicts
		string array
		
		Array with the dictionary names for record fields.
		The same array for each LkItem that is stored in the list.
		
		Property: LstDictsCalculated
		string array
		
		Array with the dictionary names for calculated fields of the record.
		The same array for each LkItem that is stored in the list.
*/
class LkItems extends Array {

	/*
		Constructor: constructor
			Initializes a new instance of the LkItem class.
			
		Arguments:
			lstDictsId - (string array) Array with the dictionary names for record Ids. The same array for each LkItem that is stored in the list.</param>
			lstDicts - (string array) Array with the dictionarty names for record fields. The same array for each LkItem that is stored in the list.</param>
			lstDictsCalculated - (string array) Array with the dictionary names for calculated fields of the record. The same array for each LkItem that is stored in the list.</param>
	*/
	constructor(lstDictsId = [], lstDicts = [], lstDictsCalculated = []) {
		super();
		this.LstDictsId = lstDictsId;
		this.LstDicts = lstDicts;
		this.LstDictsCalculated = lstDictsCalculated; 
	}

	/*
		Function: get
			Get a <LkItem> using its RecordId.
			
		Arguments:
			id - (string) The record Id of the LkItem.
		
		Return:
			<LkItem>
			
			The LkItem extracted.
		
	*/
	get(id) {
		if(typeof id == 'number'){
			return this[id];
		}
		else
		{
			var i;
			for (i = 0; i < this.length; i++)
				if (this[i].RecordId == id)
					return this[i];
			return null;
		}
	}

	/*
		Function: push
			Adds a new LkItem to the list. The dictionaries arrays of the list, will be copied to the LkItem added.
			
		Arguments:
			lkItem - (LkItem) The LkItem to be added.
	*/
	push(lkItem) {
		var duplicateIds = this.filter(obj => obj.RecordId == lkItem.RecordId);
		if (lkItem.RecordId && duplicateIds.length == 0)
		{
			lkItem.LstDictsId = this.LstDictsId;
			lkItem.LstDicts = this.LstDicts;
			lkItem.LstDictsCalculated = this.LstDictsCalculated;
			Array.prototype.push.call(this, lkItem)
		}        
	}

	/*
		Function: pushId
			Creates and adds LkItem with specific recordIds to the list.
			
		Arguments:
			recordIds - (string array) Array with the list of recordIds.
	*/
	pushIds(recordIds) { //Array
		var i;
		for (i = 0; i < recordIds.length; i++)
		{
			var lkRecord = new LkItem.LkItem(recordIds[i]);
			this.push(lkRecord);
		} 
	}

	/*
		Function: removeId
			Removes the LkItem specified by its recordID from the list.
			
		Arguments:
			recordId - (string) The recordId of the LkItem to be removed.
	*/
	removeId(recordId) {
		var i;
		for (i = 0; i < this.length; i++)
		{
			if (this[i].RecordId == recordId)
			{
				this.splice(i, 1); 
				break;
			}
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
		var buf = "";
		var i;
		for (i = 0; i < this.length; i++)
		{
			if (i > 0)
				buf += LinkarFunctions.ASCII_Chars.RS_chr;
			buf += this[i].RecordId;
		}
	
		return buf;
	}

	/*
		Function: ComposeUpdateBuffer
			Composes the final buffer string for one or more records to be updated in MV Update operations, with the RecordId, the Record,
			and optionally the OriginalRecord information.
			
		Arguments:
			includeOriginalBuffer - (boolean) Determines if the OriginalRecord must be include or not in the final buffer string.
			
		Returns:
		string
		
		The final string buffer for MV Update operations.
	*/
	ComposeUpdateBuffer(includeOriginalBuffer = false) {
		var buf = "";
		var i;
		for (i = 0; i < this.length; i++)
		{
			if (i > 0)
				buf += LinkarFunctions.ASCII_Chars.RS_chr;
			buf += this[i].RecordId;
		}
	
		buf += LinkarFunctions.ASCII_Chars.FS_chr;
	
		for (i = 0; i < this.length; i++)
		{
			if (i > 0)
				buf += LinkarFunctions.ASCII_Chars.RS_chr;
			buf += this[i].Record;
		}
	
		if (includeOriginalBuffer)
		{
			buf += LinkarFunctions.ASCII_Chars.FS_chr;
	
			var i;
			for (i = 0; i < this.length; i++)
			{
				if (i > 0)
					buf += LinkarFunctions.ASCII_Chars.RS_chr;
				buf += this[i].OriginalRecord;
			}
		}
	
		return buf;
	}

	/*
		Function: ComposeNewBuffer
			Composes the final buffer string for one or more records to be created in MV New operations, with the RecordId and the Record information.
		
		Returns:
		string
		
		The final string buffer for MV New operations.
	*/
	ComposeNewBuffer() {
		return this.ComposeUpdateBuffer(false);
	}

	/*
		Function: ComposeDeleteBuffer
			Composes the final buffer string for one or more records to be deleted in MV Delete operations, with the RecordId,
			and optionally with the OriginalRecord information.
			
		Arguments:
			includeOriginalBuffer - (boolean) Determines if the OriginalRecord must be include or not in the final buffer string.
			
		Returns:
		string
		
		The final string buffer for MV Delete operations.
	*/
	ComposeDeleteBuffer(includeOriginalBuffer = false) {
		var buf = "";
		var i;
		for (i = 0; i < this.length; i++)
		{
			if (i > 0)
				buf += LinkarFunctions.ASCII_Chars.RS_chr;
			buf += this[i].RecordId;
		}
	
		if (includeOriginalBuffer)
		{
			buf += LinkarFunctions.ASCII_Chars.FS_chr;
	
			for (i = 0; i < this.length; i++)
			{
				if (i > 0)
					buf += LinkarFunctions.ASCII_Chars.RS_chr;
				buf += this[i].OriginalRecord;
			}
		}
	
		return buf;
	}

}

module.exports = {LkItems}