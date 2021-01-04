const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const LinkarFunctionsPersistent = require("../Linkar.Functions.Persistent/LinkarClient")

const JSON_FORMAT = {
    JSON: 0x03,
	JSON_DICT: 0x07,
	JSON_SCH: 0x08
  }

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
        jsonFormat = JSON_FORMAT.JSON, customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Read(filename, recordIds, dictionaries, readOptions,
            LinkarFunctions.DATAFORMAT_TYPE.JSON, jsonFormat, customVars, receiveTimeout)
    }

    Update(filename, records, updateOptions = new LinkarFunctions.UpdateOptions(),
        jsonFormat = JSON_FORMAT.JSON, customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Update(filename, records, updateOptions,
            LinkarFunctions.DATAFORMAT_TYPE.JSON, jsonFormat, customVars, receiveTimeout)
    }

    New(filename, records, newOptions = new LinkarFunctions.NewOptions(),
        jsonFormat = JSON_FORMAT.JSON, customVars = "", receiveTimeout = 0) {
           return this.linkarClient.New(filename, records, newOptions,
            LinkarFunctions.DATAFORMAT_TYPE.JSON, jsonFormat, customVars, receiveTimeout)
    }

    Delete(filename, records, deleteOptions = new LinkarFunctions.DeleteOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Delete(filename, records, deleteOptions,
            LinkarFunctions.DATAFORMAT_TYPE.JSON, LinkarFunctions.DATAFORMAT_TYPE.JSON, customVars, receiveTimeout)
    }

    Select(filename, selectClause = "", sortClause = "", dictClause = "", preSelectClause = "", selectOptions = new LinkarFunctions.SelectOptions(),
        jsonFormat = JSON_FORMAT.JSON, customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Select(filename, selectClause, sortClause, dictClause, preSelectClause, selectOptions,
            jsonFormat, customVars, receiveTimeout)
    }

    Subroutine(subroutineName, argsNumber, args,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Subroutine(subroutineName, argsNumber, args,
            LinkarFunctions.DATAFORMAT_TYPE.JSON, LinkarFunctions.DATAFORMAT_TYPE.JSON, customVars, receiveTimeout)
    }

    Conversion(expression, code, conversionType,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Conversion(expression, code, conversionType,
            LinkarFunctions.DATAFORMAT_TYPE.JSON, customVars, receiveTimeout)
    }

    Format(expression, formatSpec,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Format(expression, formatSpec,
            LinkarFunctions.DATAFORMAT_TYPE.JSON, customVars, receiveTimeout)
    }

    Dictionaries(filename,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Dictionaries(filename,
            LinkarFunctions.DATAFORMAT_TYPE.JSON, customVars, receiveTimeout)
    }

    Execute(statement,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Execute(statement,
            LinkarFunctions.DATAFORMAT_TYPE.JSON, customVars, receiveTimeout)
    }

    GetVersion(receiveTimeout = 0) {
           return this.linkarClient.GetVersion(LinkarFunctions.DATAFORMAT_TYPE.JSON, receiveTimeout)
    }

    LkSchemas(lkSchemasOptions = new LinkarFunctions.LkSchemasOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.LkSchemas(lkSchemasOptions,
            LinkarFunctions.DATAFORMAT_TYPE.JSON, customVars, receiveTimeout)
    }

    LkProperties(filename, lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.LkProperties(filename, lkPropertiesOptions,
            LinkarFunctions.DATAFORMAT_TYPE.JSON, customVars, receiveTimeout)
    }

    ResetCommonBlocks(receiveTimeout = 0) {
           return this.linkarClient.ResetCommonBlocks(LinkarFunctions.DATAFORMAT_TYPE.JSON, receiveTimeout)
    }
}

module.exports = { LinkarClient, JSON_FORMAT }
