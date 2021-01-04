const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const LinkarFunctionsDirect = require("../Linkar.Functions.Direct/DirectFunctions")

const XML_FORMAT = {
    XML: 0x02,
	XML_DICT: 0x05,
	XML_SCH: 0x06
  }

class Functions {

    static Read(credentialOptions, filename, recordIds, dictionaries = "", readOptions = new LinkarFunctions.ReadOptions(),
        xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Read(credentialOptions, filename, recordIds, dictionaries, readOptions,
            LinkarFunctions.DATAFORMAT_TYPE.XML, xmlFormat, customVars, receiveTimeout)
    }

    static Update(credentialOptions, filename, records, updateOptions = new LinkarFunctions.UpdateOptions(),
        xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Update(credentialOptions, filename, records, updateOptions,
            LinkarFunctions.DATAFORMAT_TYPE.XML, xmlFormat, customVars, receiveTimeout)
    }

    static New(credentialOptions, filename, records, newOptions = new LinkarFunctions.NewOptions(),
        xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.New(credentialOptions, filename, records, newOptions,
            LinkarFunctions.DATAFORMAT_TYPE.XML, xmlFormat, customVars, receiveTimeout)
    }

    static Delete(credentialOptions, filename, records, deleteOptions = new LinkarFunctions.DeleteOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Delete(credentialOptions, filename, records, deleteOptions,
            LinkarFunctions.DATAFORMAT_TYPE.XML, DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    static Select(credentialOptions, filename, selectClause = "", sortClause = "", dictClause = "", preSelectClause = "", selectOptions = new LinkarFunctions.SelectOptions(),
        xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Select(credentialOptions, filename, selectClause, sortClause, dictClause, preSelectClause, selectOptions,
            xmlFormat, customVars, receiveTimeout)
    }

    static Subroutine(credentialOptions, subroutineName, argsNumber, args,
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Subroutine(credentialOptions, subroutineName, argsNumber, args,
            LinkarFunctions.DATAFORMAT_TYPE.XML, LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    static Conversion(credentialOptions, expression, code, conversionType,
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Conversion(credentialOptions, expression, code, conversionType,
            LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    static Format(credentialOptions, expression, formatSpec,
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Format(credentialOptions, expression, formatSpec,
            LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    static Dictionaries(credentialOptions, filename,
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Dictionaries(credentialOptions, filename,
            LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    static Execute(credentialOptions, statement,
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Execute(credentialOptions, statement,
            LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    static GetVersion(credentialOptions,
        receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.GetVersion(credentialOptions,
            LinkarFunctions.DATAFORMAT_TYPE.XML, receiveTimeout)
    }

    static LkSchemas(credentialOptions, lkSchemasOptions = new LinkarFunctions.LkSchemasOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.LkSchemas(credentialOptions, lkSchemasOptions,
            LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    static LkProperties(credentialOptions, filename, lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.LkProperties(credentialOptions, filename, lkPropertiesOptions,
            LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
    }

    static ResetCommonBlocks(credentialOptions,
        receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.ResetCommonBlocks(credentialOptions, 
            LinkarFunctions.DATAFORMAT_TYPE.XML, receiveTimeout)
    }
}

module.exports = { Functions, XML_FORMAT }
