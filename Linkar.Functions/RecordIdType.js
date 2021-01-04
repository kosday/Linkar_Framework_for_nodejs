var DBMV_Mark = require('./DBMV_Mark')

class RecordIdType
{
    // NONE
    constructor(){

    }

    // LINKAR
    Linkar(prefix, separator, formatSpec){
        this.ActiveTypeLinkar = true;
        this.Prefix = prefix;
        this.Separator = separator;
        this.FormatSpec = formatSpec;
    }

    // RANDOM
    Random(numeric, length){
        this.ActiveTypeRandom = true;
        this.Numeric = numeric;
        this.Length = length;
    }

    // CUSTOM
    Custom(){//(custom){
        //this.ActiveTypeCustom = custom;
        this.ActiveTypeCustom = true;
    }
	
	GetStringAM()
	{
		var opLinkar;
		if (this.ActiveTypeLinkar)
			opLinkar = "1" + DBMV_Mark.VM_str + this.Prefix + DBMV_Mark.VM_str + this.Separator + DBMV_Mark.VM_str + this.FormatSpec;
		else
			opLinkar = "0" + DBMV_Mark.VM_str + "" + DBMV_Mark.VM_str + "" + DBMV_Mark.VM_str + "";
	
		var opRamdom;
		if (this._ActiveTypeRandom)
			opRamdom = "1" + DBMV_Mark.VM_str + (this.Numeric ? "1" : "0") + DBMV_Mark.VM_str + this.Length;
		else
			opRamdom = "0" + DBMV_Mark.VM_str + "" + DBMV_Mark.VM_str + "";
	
		var str = opLinkar + DBMV_Mark.AM_str +
					(this._ActiveTypeCustom ? "1" : "0") + DBMV_Mark.AM_str +
					opRamdom;
	
		return str;
	}	
}

module.exports = {RecordIdType}
