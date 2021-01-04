const DATAFORMAT_TYPE = require('../Linkar.Functions/DATAFORMAT_TYPE')
const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const LinkarFunctionsDirect = require("../Linkar.Functions.Direct/DirectFunctions")

class Functions {

    static Read(credentialOptions, filename, recordIds, dictionaries = "", readOptions = new LinkarFunctions.ReadOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Read(credentialOptions, filename, recordIds, dictionaries, readOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    static Update(credentialOptions, filename, records, updateOptions = new LinkarFunctions.UpdateOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Update(credentialOptions, filename, records, updateOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    static New(credentialOptions, filename, records, newOptions = new LinkarFunctions.NewOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.New(credentialOptions, filename, records, newOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    static Delete(credentialOptions, filename, records, deleteOptions = new LinkarFunctions.DeleteOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Delete(credentialOptions, filename, records, deleteOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    static Select(credentialOptions, filename, selectClause = "", sortClause = "", dictClause = "", preSelectClause = "", selectOptions = new LinkarFunctions.SelectOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Select(credentialOptions, filename, selectClause, sortClause, dictClause, preSelectClause, selectOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    static Subroutine(credentialOptions, subroutineName, argsNumber, args,
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Subroutine(credentialOptions, subroutineName, argsNumber, args,
            LinkarFunctions.DATAFORMAT_TYPE.MV, LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    static Conversion(credentialOptions, expression, code, conversionType,
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Conversion(credentialOptions, expression, code, conversionType,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    static Format(credentialOptions, expression, formatSpec,
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Format(credentialOptions, expression, formatSpec,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    static Dictionaries(credentialOptions, filename,
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Dictionaries(credentialOptions, filename,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    static Execute(credentialOptions, statement,
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Execute(credentialOptions, statement,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    static GetVersion(credentialOptions,
        receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.GetVersion(credentialOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, receiveTimeout)
    }

    static LkSchemas(credentialOptions, lkSchemasOptions = LinkarFunctions.LkSchemasOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.LkSchemas(credentialOptions, lkSchemasOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    static LkProperties(credentialOptions, filename, lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.LkProperties(credentialOptions, filename, lkPropertiesOptions,
            LinkarFunctions.DATAFORMAT_TYPE.MV, customVars, receiveTimeout)
    }

    static ResetCommonBlocks(credentialOptions,
        receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.ResetCommonBlocks(credentialOptions, 
            LinkarFunctions.DATAFORMAT_TYPE.MV, receiveTimeout)
    }
}

module.exports = { Functions }
