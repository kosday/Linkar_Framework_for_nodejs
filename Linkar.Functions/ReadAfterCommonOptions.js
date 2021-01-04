var DBMV_Mark = require('./DBMV_Mark')
var CommonOptions = require('./CommonOptions')

class ReadAfterCommonOptions extends CommonOptions.CommonOptions {
	
constructor(readAfter = false, calculated = false, conversion = false, formatSpec = false, originalRecords = false){
	super(calculated, conversion, formatSpec, originalRecords);
	this.ReadAfter = readAfter;
}

    GetStringAM()
    {
        return (this.ReadAfter ? "1" : "0") + DBMV_Mark.AM_str + super.GetStringAM();
    }
}

module.exports = {ReadAfterCommonOptions}
