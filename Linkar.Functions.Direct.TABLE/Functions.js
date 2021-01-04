const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const LinkarFunctionsDirect = require("../Linkar.Functions.Direct/DirectFunctions")

class Functions {

    static LkSchemas(credentialOptions, lkSchemasOptions = new LinkarFunctions.LkSchemasOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.LkSchemas(credentialOptions, lkSchemasOptions,
            LinkarFunctions.DATAFORMATSCH_TYPE.TABLE, customVars, receiveTimeout)
    }

    static LkProperties(credentialOptions, filename, lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.LkProperties(credentialOptions, filename, lkPropertiesOptions,
            LinkarFunctions.DATAFORMATSCH_TYPE.TABLE, customVars, receiveTimeout)
    }

    static GetTable(credentialOptions, filename, selectClause = "", dictClause = "", sortClause = "", tableOptions = new LinkarFunctions.TableOptions(),
        customVars = "", receiveTimeout = 0) {
           return LinkarFunctionsDirect.DirectFunctions.Select(credentialOptions, filename, selectClause, dictClause, sortClause, tableOptions,
            customVars, receiveTimeout)
    }

}

module.exports = { Functions }
