const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const LinkarFunctionsPersistent = require("../Linkar.Functions.Persistent/LinkarClient");

class LinkarClient {

    constructor(receiveTimeout)
    {
        this.linkarClient = new LinkarFunctionsPersistent.LinkarClient(receiveTimeout);
    }

    Login(credentialOptions, customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Login(credentialOptions, customVars, receiveTimeout)
    }

    Logout(customVars = "", receiveTimeout = 0) {
        return this.linkarClient.Logout(customVars, receiveTimeout)
 }

    Read(filename, recordIds, dictionaries = "", readOptions = new LinkarFunctions.ReadOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Read(filename, recordIds, dictionaries, readOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    Update(filename, records, updateOptions = new LinkarFunctions.UpdateOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Update(filename, records, updateOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    New(filename, records, newOptions = new LinkarFunctions.NewOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.New(filename, records, newOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    Delete(filename, records, deleteOptions = new LinkarFunctions.DeleteOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Delete(filename, records, deleteOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    Select(filename, selectClause = "", sortClause = "", dictClause = "", preSelectClause = "", selectOptions = new LinkarFunctions.SelectOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Select(filename, selectClause, sortClause, dictClause, preSelectClause, selectOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    Subroutine(subroutineName, argsNumber, args,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Subroutine(subroutineName, argsNumber, args,
            LinkarFunctions.DATAFORMAT_TYPE.MV, LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    Conversion(expression, code, conversionType,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Conversion(expression, code, conversionType,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    Format(expression, formatSpec,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Format(expression, formatSpec,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    Dictionaries(filename,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Dictionaries(filename,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    Execute(statement,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Execute(statement,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    GetVersion(receiveTimeout = 0) {
           return this.linkarClient.GetVersion(LinkarFunctions.DATAFORMAT_TYPE.MV, receiveTimeout)
    }

    LkSchemas(lkSchemasOptions = new LinkarFunctions.LkSchemasOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.LkSchemas(lkSchemasOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    LkProperties(filename, lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.LkProperties(filename, lkPropertiesOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    ResetCommonBlocks(receiveTimeout = 0) {
           return this.linkarClient.ResetCommonBlocks(LinkarFunctions.DATAFORMAT_TYPE.MV, receiveTimeout)
    }
}

module.exports = { LinkarClient }
