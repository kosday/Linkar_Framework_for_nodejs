var DBMV_Mark = require('./DBMV_Mark')
var ReadAfterCommonOptions = require('./ReadAfterCommonOptions')

class UpdateOptions {
	
constructor(optimisticLockControl = false, readAfter = false, calculated = false, conversion = false, formatSpec = false, originalRecords = false){
	this.OptimisticLockControl = optimisticLockControl;

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
        var str = (this._OptimisticLock ? "1" : "0") + DBMV_Mark.AM_str + this.ReadAfterCommonOptions.GetStringAM();
        return str;
    }
}

module.exports = {UpdateOptions}
