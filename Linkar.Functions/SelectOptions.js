var DBMV_Mark = require('./DBMV_Mark')
var CommonOptions = require('./CommonOptions')

class SelectOptions {
	
constructor(onlyRecordId = false, pagination = false, regPage = 10, numPage = 0, calculated = false, conversion = false, formatSpec = false, originalRecords = false){
	this.CommonOptions =  new CommonOptions.CommonOptions(calculated,conversion,formatSpec,originalRecords);
	this.OnlyRecordId = onlyRecordId;
	this.Pagination = pagination;
	this.Pagination_RegPage = regPage;
	this.Pagination_NumPage = numPage;
	this.Calculated = this.CommonOptions.Calculated;
	this.Conversion = this.CommonOptions.Conversion;
	this.FormatSpec = this.CommonOptions.FormatSpec;
	this.OriginalRecords = this.CommonOptions.OriginalRecords;
}

GetString()
{
	var str = (this.Pagination ? "1" : "0") + DBMV_Mark.VM_str + this.Pagination_RegPage + DBMV_Mark.VM_str + this.Pagination_NumPage + DBMV_Mark.AM_str +
				 (this.OnlyRecordId ? "1" : "0") + DBMV_Mark.AM +
				 this.CommonOptions.GetStringAM();
	return str;
}
}

module.exports = {SelectOptions}
