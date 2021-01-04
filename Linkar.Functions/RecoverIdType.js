var DBMV_Mark = require('./DBMV_Mark')

class RecoverIdType
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

    // CUSTOM
    Custom(){//(custom){
        //this.ActiveTypeCustom = custom;
        this.ActiveTypeCustom = true;
    }
	
	GetStringAM()
	{
        var opLinkar;
        if (this.ActiveTypeLinkar)
            opLinkar = "1" + DBMV_Mark.VM_str + this.Prefix + DBMV_Mark.VM_str + this.Separator;
        else
            opLinkar = "0" + DBMV_Mark.VM_str + "" + DBMV_Mark.VM_str + "";

        var opCustom;
        if (this.ActiveTypeCustom)
            opCustom = "1";
        else
            opCustom = "0";

        var str = opLinkar + DBMV_Mark.AM_str + opCustom;
        return str;
    }	
}

module.exports = {RecoverIdType}
