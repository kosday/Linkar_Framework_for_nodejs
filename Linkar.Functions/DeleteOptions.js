var DBMV_Mark = require('./DBMV_Mark')
var RecoverIdType = require('./RecoverIdType')

class DeleteOptions
{
	constructor(optimisticLockControl = false, recoverIdType = new RecoverIdType.RecoverIdType()){

	this.OptimisticLockControl = optimisticLockControl;
	this.RecoverIdType = recoverIdType;

	this.ActiveTypeLinkar = this.RecoverIdType.ActiveTypeLinkar;
	this.Prefix = this.RecoverIdType.Prefix;
	this.Separator = this.RecoverIdType.Separator;
	this.FormatSpec = this.RecoverIdType.FormatSpec;
	this.ActiveTypeCustom = this.RecoverIdType.ActiveTypeCustom;
	}

    GetString()
	{		
		var str = (this.OptimisticLock ? "1" : "0") + DBMV_Mark.AM_str +
					this.RecoverIdType.GetStringAM();
		
		return str;
    }
}

module.exports = {DeleteOptions}