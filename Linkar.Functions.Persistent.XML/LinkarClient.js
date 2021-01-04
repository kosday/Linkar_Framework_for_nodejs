const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const LinkarFunctionsPersistent = require("../Linkar.Functions.Persistent/LinkarClient")

const XML_FORMAT = {
    XML: 0x02,
	XML_DICT: 0x05,
	XML_SCH: 0x06
  }

class LinkarClient {

    constructor(receiveTimeout = 0)
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
        xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Read(filename, recordIds, dictionaries, readOptions,
            DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, xmlFormat, customVars, receiveTimeout)
    }

    Update(filename, records, updateOptions = new LinkarFunctions.UpdateOptions(),
        xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Update(filename, records, updateOptions,
            DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, xmlFormat, customVars, receiveTimeout)
    }

    New(filename, records, newOptions = new LinkarFunctions.NewOptions(),
        xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
           return this.linkarClient.New(filename, records, newOptions,
            DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, xmlFormat, customVars, receiveTimeout)
    }

    Delete(filename, records, deleteOptions = new LinkarFunctions.DeleteOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Delete(filename, records, deleteOptions,
            DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    Select(filename, selectClause = "", sortClause = "", dictClause = "", preSelectClause = "", selectOptions = new LinkarFunctions.SelectOptions(),
        xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Select(filename, selectClause, sortClause, dictClause, preSelectClause, selectOptions,
            xmlFormat, customVars, receiveTimeout)
    }

    Subroutine(subroutineName, argsNumber, args,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Subroutine(subroutineName, argsNumber, args,
            DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    Conversion(expression, code, conversionType,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Conversion(expression, code, conversionType,
            DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    Format(expression, formatSpec,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Format(expression, formatSpec,
            DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    Dictionaries(filename,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Dictionaries(filename,
            DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    Execute(statement,
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Execute(statement,
            DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    GetVersion(receiveTimeout = 0) {
           return this.linkarClient.GetVersion(DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, receiveTimeout)
    }

    LkSchemas(lkSchemasOptions = new LinkarFunctions.LkSchemasOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.LkSchemas(lkSchemasOptions,
            DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    LkProperties(filename, lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.LkProperties(filename, lkPropertiesOptions,
            DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    ResetCommonBlocks(receiveTimeout = 0) {
           return this.linkarClient.ResetCommonBlocks(DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, receiveTimeout)
    }
}

module.exports = { LinkarClient, XML_FORMAT }
