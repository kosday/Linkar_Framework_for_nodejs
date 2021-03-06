/*
	Constant: TOTAL_RECORDS_KEY
	The tag value for "TOTAL_RECORDS_KEY" in Database operation responses of MV type.
*/
var TOTAL_RECORDS_KEY = "TOTAL_RECORDS";

/*
	Constant: TOTAL_RECORDS
	The tag value for "TOTAL_RECORDS" in Database operation responses of MV type.
*/
var RECORD_IDS_KEY = "RECORD_ID";

/*
	Constant: RECORDS_KEY
	The tag value for "RECORDS_KEY" in Database operation responses of MV type.
*/
var RECORDS_KEY = "RECORD";

/*
	Constant: CALCULATED_KEY
	The tag value for "CALCULATED_KEY" in Database operation responses of MV type.
*/
var CALCULATED_KEY = "CALCULATED";

/*
	Constant: RECORD_DICTS_KEY
	The tag value for "RECORD_DICTS_KEY" in Database operation responses of MV type.
*/
var RECORD_DICTS_KEY = "RECORD_DICTS";

/*
	Constant: RECORD_ID_DICTS_KEY
	The tag value for "RECORD_ID_DICTS_KEY" in Database operation responses of MV type.
*/
var RECORD_ID_DICTS_KEY = "RECORD_ID_DICTS";

/*
	Constant: CALCULATED_DICTS_KEY
	The tag value for "CALCULATED_DICTS_KEY" in Database operation responses of MV type.
*/
var CALCULATED_DICTS_KEY = "CALCULATED_DICTS";

/*
	Constant: ARGUMENTS_KEY
	The tag value for "ARGUMENTS_KEY" in Database operation responses of MV type.
*/
var ARGUMENTS_KEY = "ARGUMENTS";

/*
	Constant: ORIGINAL_RECORDS_KEY
	The tag value for "ORIGINAL_RECORDS_KEY" in Database operation responses of MV type.
*/
var ORIGINAL_RECORDS_KEY = "ORIGINALRECORD";

/*
	Constant: FORMAT
	The tag value for "FORMAT" in Database operation responses of MV type.
*/
var FORMAT_KEY = "FORMAT";

/*
	Constant: CONVERSION
	The tag value for "CONVERSION" in Database operation responses of MV type.
*/
var CONVERSION_KEY = "CONVERSION";

/*
	Constant: CAPTURING
	The tag value for "CAPTURING" in Database operation responses of MV type.
*/
var CAPTURING_KEY = "CAPTURING";

/*
	Constant: RETURNING
	The tag value for "RETURNING" in Database operation responses of MV type.
*/
var RETURNING_KEY = "RETURNING";

/*
	Constant: ROWHEADERS
	The tag value for "ROWHEADERS" in Database operation responses of MV type.
*/
var ROWHEADERS_KEY = "ROWHEADERS";

/*
	Constant: ROWPROPERTIES
	The tag value for "ROWPROPERTIES" in Database operation responses of MV type.
*/
var ROWPROPERTIES_KEY = "ROWPROPERTIES";

/*
	Constant: ROWPROPERTIES
	The tag value for "ROWPROPERTIES" in Database operation responses of MV type.
*/
var ERRORS_KEY = "ERRORS";

/*
	Constant: DC4
	ASCII character used as separator of the arguments of a subroutine.
*/
var DC4 = '\u0014';

/*
	Constant: DC4_str
	ASCII character used as separator of the arguments of a subroutine.
*/
var DC4_str = "\u0014";

/*
	Constant: FS
	When the responses of the operations are of MV type, this character is used to separate the header (the ThisList property in LkData) from the data.
*/
var FS = '\u001C';

/*
	Constant: FS_str
	When the responses of the operations are of MV type, this character is used to separate the header (the ThisList property in LkData) from the data.
*/
var FS_str = "\u001C";

/*
	Constant: RS
	ASCII character used by Linkar as separator of items in lists. For example, list of records.
*/
var RS = '\u001E';

/*
	Constant: RS_str
	ASCII character used by Linkar as separator of items in lists. For example, list of records.
*/
var RS_str = "\u001E";

/*
	Constant: AM
	Character ASCII 253. VM Multi-value mark.
*/
var AM = '\u00FE';

/*
	Constant: AM_str
	Character ASCII 253. VM Multi-value mark.
*/
var AM_str = "\u00FE";

/*
	Constant: VM
	Character ASCII 253. VM Multi-value mark.
*/
var VM = '\u00FD';

/*
	Constant: VM_str
	Character ASCII 253. VM Multi-value mark.
*/
var VM_str = "\u00FD";

/*
	Class: StringFunctions
		Set of functions that help manipulate the character strings that are used as input and output data in MV type operations 
*/
class StringFunctions
{
	/*
		Function: ExtractTotalRecords
			Looks for the TOTAL_RECORDS_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			number
		
		The value of TOTAL_RECORDS_KEY tag.
	*/
	static ExtractTotalRecords(lkString) {
		var block = this.GetData(lkString, TOTAL_RECORDS_KEY, FS_str, AM_str);
		try {  
			var result = Integer.parseInt(block);  
			return result;  
		} catch (e) {  
			return 0;  
		}  
	}

	/*
		Function: ExtractRecordIds
			Looks for the RECORD_IDS_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of RECORD_IDS_KEY tag.
	*/
	static ExtractRecordIds(lkString) {
		var valueTag = this.GetData(lkString, RECORD_IDS_KEY, FS_str, AM_str);
		return this.splitArray(valueTag, RS_str);
	}

	/*
		Function: ExtractRecords
			Looks for the RECORDS_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of RECORDS_KEY tag.
	*/
	static ExtractRecords(lkString) {
		var valueTag = this.GetData(lkString, RECORDS_KEY, FS_str, AM_str);
		return this.splitArray(valueTag, RS_str);
	}

	/*
		Function: ExtractErrors
			Looks for the ERRORS_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of ERRORS_KEY tag.
	*/
	static ExtractErrors(lkString) {
		var valueTag = this.GetData(lkString, ERRORS_KEY, FS_str, AM_str);
		return this.splitArray(valueTag, AM_str);
	}

	/*
		Function: FormatError
			This function formats the message error by split into Error Code and Error Message.
		
		Arguments:
			error - (string) The value of ERRORS_KEY tag.
		
		Return:
			string
		
			The error formated.
	*/
	static FormatError(error) {
		var result = error;
		var items = error.split(VM_str, -1);
		if(items.length == 2)
			result = "ERROR CODE: " + items[0] + " ERROR MESSAGE: " + items[1];
	
		return result;
	}

	/*
		Function: ExtractRecordsCalculated
			Looks for the CALCULATED_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of CALCULATED_KEY tag.
	*/
	static ExtractRecordsCalculated(lkString) {
		var valueTag = this.GetData(lkString, CALCULATED_KEY, FS_str, AM_str);
		return this.splitArray(valueTag, RS_str);
	}

	/*
		Function: ExtractRecordsDicts
			Looks for the RECORD_DICTS_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of RECORD_DICTS_KEY tag.
	*/
	static ExtractRecordsDicts(lkString) {
		var valueTag = this.GetData(lkString, RECORD_DICTS_KEY, FS_str, AM_str);
		return this.splitArray(valueTag, AM_str);
	}

	/*
		Function: ExtractRecordsCalculatedDicts
			Looks for the CALCULATED_DICTS_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of CALCULATED_DICTS_KEY tag.
	*/
	static ExtractRecordsCalculatedDicts(lkString) {
		var valueTag = this.GetData(lkString, CALCULATED_DICTS_KEY, FS_str, AM_str);
		return this.splitArray(valueTag, AM_str);
	}

	/*
		Function: ExtractRecordsIdDicts
			Looks for the RECORD_ID_DICTS_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of RECORD_ID_DICTS_KEY tag.
	*/
	static ExtractRecordsIdDicts(lkString) {
		var valueTag = this.GetData(lkString, RECORD_ID_DICTS_KEY, FS_str, AM_str);
		return this.splitArray(valueTag, AM_str);
	}

	/*
		Function: ExtractOriginalRecords
			Looks for the ORIGINAL_RECORDS_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of ORIGINAL_RECORDS_KEY tag.
	*/
	static ExtractOriginalRecords(lkString) {
		var valueTag = this.GetData(lkString, ORIGINAL_RECORDS_KEY, FS_str, AM_str);
		return this.splitArray(valueTag, RS_str);
	}

	/*
		Function: ExtractDictionaries
			Looks for the RECORDS_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of RECORDS_KEY tag.
	*/
	static ExtractDictionaries(lkString) {
		var valueTag = this.GetData(lkString, RECORDS_KEY, FS_str, AM_str);
		return this.splitArray(valueTag, RS_str);
	}

	/*
		Function: ExtractConversion
			Looks for the CONVERSION_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of CONVERSION_KEY tag.
	*/
	static ExtractConversion(lkString) {
		return this.GetData(lkString, CONVERSION_KEY, FS_str, AM_str);
	}

	/*
		Function: ExtractFormat
			Looks for the FORMAT_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of FORMAT_KEY tag.
	*/
	static ExtractFormat(lkString) {
		return this.GetData(lkString, FORMAT_KEY, FS_str, AM_str);
	}

	/*
		Function: ExtractCapturing
			Looks for the CAPTURING_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of CAPTURING_KEY tag.
	*/
	static ExtractCapturing(lkString) {
		return this.GetData(lkString, CAPTURING_KEY, FS_str, AM_str);
	}

	/*
		Function: ExtractReturning
			Looks for the RETURNING_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of RETURNING_KEY tag.
	*/
	static ExtractReturning(lkString) {
		return this.GetData(lkString, RETURNING_KEY, FS_str, AM_str);
	}

	/*
		Function: ExtractSubroutineArgs
			Looks for the ARGUMENTS_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of ARGUMENTS_KEY tag.
	*/
	static ExtractSubroutineArgs(lkString) {
		var args = this.GetData(lkString, ARGUMENTS_KEY, FS_str, AM_str);
		return this.splitArray(args, DC4_str);
	}

	/*
		Function: ExtractRowProperties
			Looks for the ROWPROPERTIES_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of ROWPROPERTIES_KEY tag.
	*/
	static ExtractRowProperties(lkString) {
		var rowProperties = this.GetData(lkString, ROWPROPERTIES_KEY, FS_str, AM_str);
		return this.splitArray(rowProperties, AM_str);
	}

	/*
		Function: ExtractRowHeaders
			Looks for the ROWHEADERS_KEY tag inside "<lkString>", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
		
		Return:
			string
		
			The value of ROWHEADERS_KEY tag.
	*/
	static ExtractRowHeaders(lkString) {
		var rowHeaders = this.GetData(lkString, ROWHEADERS_KEY, FS_str, AM_str);
		return this.splitArray(rowHeaders, AM_str);
	}

	/*
		Function: GetData
			Looks for the "tag" inside the "lkString", and extracts its value.
		
		Arguments:
			lkString - (string) A string obtained as a result of executing an operation.
			tag - (string) The tag to looking for
			delimiter - (string) Delimiter char of every main items in "lkString".
			delimiterThisList - (string) Delimiter char inside the first item of "lkString". The first item of "lkString" is always the header tags (THISLIST).
		
		Return:
			string
		
			The value of tag.
	*/
	static GetData(lkString, tag, delimiter, delimiterThisList) {
		var block = "";
		var parts = lkString.split(delimiter, -1);
		if (parts.length >= 1)
		{
			var headersList = parts[0].split(delimiterThisList, -1);
			var i;
			for (i = 1; i < headersList.length; i++)
			{
				if (tag.toUpperCase() == headersList[i].toUpperCase())
				{                    
					block = parts[i];
					break;
				}
			}
		}
		return block;
	}

	/*
		Function: splitArray
			Auxiliary function to extract arrays inside a tag value.
		
		Arguments:
			valueTag - (string) The string to be splitted.
			delimiter - (string) The char to use for split.
		
		Return:
			string
		
			The array extracted.
	*/
	static splitArray(valueTag, delimiter) {
		if ((valueTag == null || valueTag.length == 0))
			return [];
		else
			return valueTag.split(delimiter, -1);
	}

	/* Composition Functions */

	/*
		Function: ComposeRecordIds
			Composes the final string of various "recordsIds". Used by CRUD Operations.
		
		Arguments:
			recordIds - (array) Array with the "recordIds" to be joined</param>
		
		Return:
			string
		
			The final string of "recordIds" to be used by CRUD Operations.
	*/
	static ComposeRecordIds(recordIds) {
		return this.JoinArray(recordIds, RS_str);
	}

	/*
		Function: ComposeRecords
			Composes the final string of various "records". Used by CRUD Operations.
		
		Arguments:
			records - (array) Array with the "records" to be joined.
		
		Return:
			string
		
			The final string of "records" to be used by CRUD Operations.
	*/
	static ComposeRecords(records) {
		return this.JoinArray(records, RS_str);
	}

	/*
		Function: ComposeOriginalRecords
			Composes the final string of various "originalRecords". Used by CRUD Operations.
		
		Arguments:
			originalRecords - (array) Array with the "originalRecords" to be joined.
		
		Return:
			string
		
			The final string of "originalRecords" to be used by CRUD Operations.
	*/
	static ComposeOriginalRecords(originalRecords) {
		return this.JoinArray(originalRecords, RS_str);
	}

	/*
		Function: ComposeDictionaries
			Composes the final string of various "dictionaries". Used by Read and Select Operations.
		
		Arguments:
			dictionaries - (array) Array with the "dictionaries" to be joined.
		
		Return:
			string
		
			The final string of "dictionaries" to be used by Read and Select Operations.
	*/
	static ComposeDictionaries(dictionaries) {
		return this.JoinArray(dictionaries, " ");
	}

	/*
		Function: ComposeExpressions
			Composes the final string of various "expressions". Used by Format and Conversion Operations.
		
		Arguments:
			expressions- (array) >Array with the "expressions" to be joined.
		
		Return:
			string
		
			The final string of "expressions" to be used in Format and Conversion Operations.
	*/
	static ComposeExpressions(expressions) {
		return this.JoinArray(expressions, VM_str);
	}

	/*
		Function: ComposeSubroutineArgs
			Composes the final string of various "arguments" of a subroutine.
		
		Arguments:
			args- (array) >Array with the "arguments" to be joined.
		
		Return:
			string
		
			The final string to be used in Subroutine Operations.
	*/
	static ComposeSubroutineArgs(args) {
		return this.JoinArray(args, DC4_str);
	}

	/*
		Function: JoinArray
			Auxiliary function to compose the final string of multiple items using "delimiter" as separation char.
		
		Arguments:
			items - (array) The "items" to be joined.
			delimiter - (string) The "delimiter" char between the "items".
		
		Return:
			string
		
			The final string with the different items joined by "delimiter" char.
	*/
	static JoinArray(items, delimiter) {
		if (items != null && items.length > 0)
			return items.join(delimiter);
		else
			return "";
	}

	/*
		Function: ComposeUpdateBuffer
			Compose the fully buffer of the Update Operations with the block of "recordIds", "records" and "originalRecords".
		
		Arguments:
			recordIds - (string or array) Block of "recordIds". You can obtain this block with <ComposeRecordIds> function or directly using an array.
			records - (string or array) Block of "records". You can obtain this block with <ComposeRecords> function or directly using an array.
			originalRecords - (string or array) Block of "originalRecords". You can obtain this block with <ComposeRecords> function or directly using an array.
		
		Return:
			string
		
		The buffer to be used by Update Operations.
	*/
	static ComposeUpdateBuffer(recordIds, records, originalRecords)  {
		if (Array.isArray(recordIds))
		{
			if ((recordIds.length != records.length && originalRecords == null) ||
				(recordIds.length != originalRecords.length))
				throw "The arrays must have the same length";
	
			return ComposeRecordIds(recordIds) + FS + ComposeRecords(records) + FS + (originalRecords?ComposeRecords(originalRecords):"");
		}
		else
			return recordIds + FS + records + FS + (originalRecords?originalRecords:"");
	}

	/*
		Function: ComposeNewBuffer
			Compose the fully buffer of the New Operations with the block of "recordIds" and "records".
		
		Arguments:
			recordIds - (string or array) Block of "recordIds". You can obtain this block with ComposeRecordIds function or directly using an array.
			records (string or array) Block of "records". You can obtain this block with ComposeRecords function or directly using an array.
		
		Return:
			string
		
			The buffer to be used by New Operations.
	*/
	static ComposeNewBuffer(recordIds, records) {
		if (Array.isArray(recordIds))
		{
			if (recordIds.length != records.length)
				throw "The arrays must have the same length";
			return ComposeRecordIds(recordIds)  + FS + ComposeRecords(records);            
		}
		else
			return recordIds + FS + records;
	}

	/*
		Function: ComposeDeleteBuffer
			Compose the fully buffer of the Delete Operations with the block of "recordIds" and "originalRecords".
		
		Arguments:
			recordIds - Block of "recordIds". You can obtain this block with ComposeRecordIds function or directly using an array.
			originalRecords - Block of "originalRecords". You can obtain this block with ComposeRecords function or directly using an array.
		
		Return:
			string
		
			The buffer to be used by Delete Operations.
	*/
	static ComposeDeleteBuffer(recordIds, originalRecords) {
		if (Array.isArray(recordIds))
		{
			if (originalRecords != null && recordIds.length != originalRecords.length)
			throw "The arrays must have the same length";
	
			return ComposeRecordIds(recordIds) + FS + (originalRecords?ComposeRecords(originalRecords):"");
		}
		else
			return recordIds + FS + (originalRecords?originalRecords:"");
	}

}

module.exports = {StringFunctions}
