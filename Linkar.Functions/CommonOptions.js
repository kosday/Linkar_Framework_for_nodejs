var DBMV_Mark = require('./DBMV_Mark')

class CommonOptions {	
    
    constructor(calculated = false, conversion = false, formatSpec = false, originalRecords = false){
        this.Calculated = calculated;
        this.Conversion = conversion;
        this.FormatSpec = formatSpec;
        this.OriginalRecords = originalRecords;
    }

    GetStringAM()
    {
        var str = (this.Calculated ? "1" : "0") + DBMV_Mark.AM_str +
                     "" + DBMV_Mark.AM_str + // Old dictionaries
                     (this.Conversion ? "1" : "0") + DBMV_Mark.AM_str +
                     (this.FormatSpec ? "1" : "0") + DBMV_Mark.AM_str +
                     (this.OriginalRecords ? "1" : "0");
        return str;
    }
}

module.exports = { CommonOptions }