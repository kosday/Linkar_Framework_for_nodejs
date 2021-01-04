var DBMV_Mark = require('./DBMV_Mark')
var ReadAfterCommonOptions = require('./ReadAfterCommonOptions')
var RecordIdType = require('./RecordIdType')

class NewOptions
{
	constructor(recordIdType = new RecordIdType.RecordIdType(), readAfter = false, calculated = false, conversion = false, formatSpec = false, originalRecords = false){

	this.RecordIdType = recordIdType;
	this.ActiveTypeLinkar = this.RecordIdType.ActiveTypeLinkar;
	this.Prefix = this.RecordIdType.Prefix;
	this.Separator = this.RecordIdType.Separator;
	this.FormatSpec = this.RecordIdType.FormatSpec;
	this.ActiveTypeRandom = this.RecordIdType.ActiveTypeLinkar;
	this.Numeric = this.RecordIdType.Numeric;
	this.Length = this.RecordIdType.Length;
	this.ActiveTypeCustom = this.RecordIdType.ActiveTypeCustom;

	if (readAfter)
		this.ReadAfterCommonOptions = new ReadAfterCommonOptions.ReadAfterCommonOptions(readAfter, calculated, conversion, formatSpec, originalRecords)
	else
		this.ReadAfterCommonOptions = new ReadAfterCommonOptions.ReadAfterCommonOptions(readAfter, false, false, false, false)
		
	this.ReadAfter = this.ReadAfterCommonOptions.ReadAfter;
	this.Calculated = this.ReadAfterCommonOptions.Calculated;
	this.Conversion = this.ReadAfterCommonOptions.Conversion;
	this.FormatSpec = this.ReadAfterCommonOptions.FormatSpec;
	this.OriginalRecords = this.ReadAfterCommonOptions.OriginalRecords;
	}

	GetString()
	{
		var str = this.RecordIdType.GetStringAM() + DBMV_Mark.AM_str +
					this.ReadAfterCommonOptions.GetStringAM();
		return str;
    }
}

module.exports = {NewOptions}
