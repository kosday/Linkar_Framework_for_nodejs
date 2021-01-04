var TOTAL_RECORDS_KEY = "TOTAL_RECORDS";
var RECORD_IDS_KEY = "RECORD_ID";
var RECORDS_KEY = "RECORD";
var CALCULATED_KEY = "CALCULATED";
var RECORD_DICTS_KEY = "RECORD_DICTS";
var RECORD_ID_DICTS_KEY = "RECORD_ID_DICTS";
var CALCULATED_DICTS_KEY = "CALCULATED_DICTS";
var ARGUMENTS_KEY = "ARGUMENTS";
var ORIGINAL_RECORDS_KEY = "ORIGINALRECORD";
var FORMAT_KEY = "FORMAT";
var CONVERSION_KEY = "CONVERSION";
var CAPTURING_KEY = "CAPTURING";
var RETURNING_KEY = "RETURNING";
var ROWHEADERS_KEY = "ROWHEADERS";
var ROWPROPERTIES_KEY = "ROWPROPERTIES";
var ERRORS_KEY = "ERRORS";

var DC4 = '\u0014';
var DC4_str = "\u0014";
var FS = '\u001C';
var FS_str = "\u001C";
var RS = '\u001E';
var RS_str = "\u001E";
var AM = '\u00FE';
var AM_str = "\u00FE";
var VM = '\u00FD';
var VM_str = "\u00FD";

class StringFunctions
{
    static ExtractTotalRecords(lkString)
    {
        var block = this.GetData(lkString, TOTAL_RECORDS_KEY, FS_str, AM_str);
        try {  
        	var result = Integer.parseInt(block);  
            return result;  
         } catch (e) {  
            return 0;  
         }  
    }

    static ExtractRecordIds(lkString)
    {
        var valueTag = this.GetData(lkString, RECORD_IDS_KEY, FS_str, AM_str);
        return this.splitArray(valueTag, RS_str);
    }

    static ExtractRecords(lkString)
    {
        var valueTag = this.GetData(lkString, RECORDS_KEY, FS_str, AM_str);
        return this.splitArray(valueTag, RS_str);
    }

    static ExtractErrors(lkString)
    {
        var valueTag = this.GetData(lkString, ERRORS_KEY, FS_str, AM_str);
        return this.splitArray(valueTag, AM_str);
    }

    static FormatError(error)
    {
        var result = error;
        var items = error.split(VM_str, -1);
        if(items.length == 2)
            result = "ERROR CODE: " + items[0] + " ERROR MESSAGE: " + items[1];

        return result;
    }

    static ExtractRecordsCalculated(lkString)
    {
        var valueTag = this.GetData(lkString, CALCULATED_KEY, FS_str, AM_str);
        return this.splitArray(valueTag, RS_str);
    }

    static ExtractRecordsDicts(lkString)
    {
        var valueTag = this.GetData(lkString, RECORD_DICTS_KEY, FS_str, AM_str);
        return this.splitArray(valueTag, AM_str);
    }

    static ExtractRecordsCalculatedDicts(lkString)
    {
        var valueTag = this.GetData(lkString, CALCULATED_DICTS_KEY, FS_str, AM_str);
        return this.splitArray(valueTag, AM_str);
    }

    static ExtractRecordsIdDicts(lkString)
    {
        var valueTag = this.GetData(lkString, RECORD_ID_DICTS_KEY, FS_str, AM_str);
        return this.splitArray(valueTag, AM_str);
    }

    static ExtractOriginalRecords(lkString)
    {
        var valueTag = this.GetData(lkString, ORIGINAL_RECORDS_KEY, FS_str, AM_str);
        return this.splitArray(valueTag, RS_str);
    }

    static ExtractDictionaries(lkString)
    {
        var valueTag = this.GetData(lkString, RECORDS_KEY, FS_str, AM_str);
        return this.splitArray(valueTag, RS_str);
    }

    static ExtractConversion(lkString)
    {
        return this.GetData(lkString, CONVERSION_KEY, FS_str, AM_str);
    }

    static ExtractFormat(lkString)
    {
        return this.GetData(lkString, FORMAT_KEY, FS_str, AM_str);
    }

    static ExtractCapturing(lkString)
    {
        return this.GetData(lkString, CAPTURING_KEY, FS_str, AM_str);
    }

    static ExtractReturning(lkString)
    {
        return this.GetData(lkString, RETURNING_KEY, FS_str, AM_str);
    }

    static ExtractSubroutineArgs(lkString)
    {
        var args = this.GetData(lkString, ARGUMENTS_KEY, FS_str, AM_str);
        return this.splitArray(args, DC4_str);
    }

    static ExtractRowProperties(lkString)
    {
        var rowProperties = this.GetData(lkString, ROWPROPERTIES_KEY, FS_str, AM_str);
        return this.splitArray(rowProperties, AM_str);
    }

    static ExtractRowHeaders(lkString)
    {
        var rowHeaders = this.GetData(lkString, ROWHEADERS_KEY, FS_str, AM_str);
        return this.splitArray(rowHeaders, AM_str);
    }

    static GetData(lkString, tag, delimiter, delimiterThisList)
    {
        var block = "";
        var parts = lkString.split(delimiter, -1);
        if (parts.length >= 1)
        {
            var headersList = parts[0].split(delimiterThisList, -1);
            var i;
            for (i = 1; i < headersList.length; i++)
            {
                //if (tag.toUpperCase().equals(headersList[i].toUpperCase()))                
                if (tag.toUpperCase() == headersList[i].toUpperCase())
                {                    
                    block = parts[i];
                    break;
                }
            }
        }
        return block;
    }

    static splitArray(valueTag, delimiter)
    {
        if ((valueTag == null || valueTag.length == 0))
            return [];
        else
            return valueTag.split(delimiter, -1);
    }

    /* Composition Functions */

    static ComposeRecordIds(recordIds)
    {
        return this.JoinArray(recordIds, RS_str);
    }

    static ComposeRecords(records)
    {
        return this.JoinArray(records, RS_str);
    }
    
    static ComposeOriginalRecords(originalRecords)
    {
        return this.JoinArray(originalRecords, RS_str);
    }

    static ComposeDictionaries(dictionaries)
    {
        return this.JoinArray(dictionaries, " ");
    }

    static ComposeExpressions(expressions)
    {
        return this.JoinArray(expressions, VM_str);
    }

    static ComposeSubroutineArgs(args)
    {
        return this.JoinArray(args, DC4_str);
    }

    static JoinArray(items, delimiter)
    {
        if (items != null && items.length > 0)
            return items.join(delimiter);//String.join(delimiter, items);
        else
            return "";
    }

    /*static ComposeUpdateBuffer(recordIds, records, originalRecords)
    {
        return recordIds + FS + records + FS + originalRecords;
    }
    
    static ComposeUpdateBuffer(recordIds, records)
    {
        return ComposeUpdateBuffer(recordIds,records,"");
    }

    static ComposeUpdateBuffer(recordIds, records, originalRecords) 
    {
        if ((recordIds.length != records.length && originalRecords == null) ||
            (recordIds.length != originalRecords.length))
            throw "The arrays must have the same length";

        return ComposeUpdateBuffer(ComposeRecordIds(recordIds), ComposeRecords(records), ComposeRecords(originalRecords));
    }
    
    static ComposeUpdateBuffer(recordIds, records) 
    {
        return ComposeUpdateBuffer(recordIds, records, null);
    }*/

    static ComposeUpdateBuffer(recordIds, records, originalRecords) 
    {
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

    /*static ComposeNewBuffer(recordIds, records)
    {
        return recordIds + FS + records;
    }*/

    static ComposeNewBuffer(recordIds, records) 
    {
        if (Array.isArray(recordIds))
        {
            if (recordIds.length != records.length)
                throw "The arrays must have the same length";
            return ComposeRecordIds(recordIds)  + FS + ComposeRecords(records);            
        }
        else
            return recordIds + FS + records;
    }

    /*static ComposeDeleteBuffer(recordIds, originalRecords)
    {
        if (originalRecords != null)
            return recordIds + FS + originalRecords;
        else
            return recordIds;
    }
    
    static ComposeDeleteBuffer(recordIds)
    {
        return ComposeDeleteBuffer(recordIds, null);
    }

    static ComposeDeleteBuffer(recordIds, originalRecords) 
    {
        if (originalRecords != null && recordIds.length != originalRecords.length)
            throw "The arrays must have the same length";
        return ComposeDeleteBuffer(ComposeRecordIds(recordIds), ComposeRecords(originalRecords));
    }
    
    static ComposeDeleteBuffer(recordIds) 
    {
        return ComposeDeleteBuffer(recordIds, null);
    }*/

    static ComposeDeleteBuffer(recordIds, originalRecords) 
    {
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
