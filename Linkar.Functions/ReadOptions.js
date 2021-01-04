var CommonOptions = require('./CommonOptions')

class ReadOptions {
	
constructor(calculated = false, conversion = false, formatSpec = false, originalRecords = false){
	this.CommonOptions =  new CommonOptions.CommonOptions(calculated,conversion,formatSpec,originalRecords);
	this.Calculated = this.CommonOptions.Calculated;
	this.Conversion = this.CommonOptions.Conversion;
	this.FormatSpec = this.CommonOptions.FormatSpec;
	this.OriginalRecords = this.CommonOptions.OriginalRecords;
}

GetString()
{
	return this.CommonOptions.GetStringAM();
}
}

module.exports = {ReadOptions}
