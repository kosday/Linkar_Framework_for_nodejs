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

    LkSchemas(lkSchemasOptions = new LinkarFunctions.LkSchemasOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.LkSchemas(lkSchemasOptions,
            LinkarFunctions.DATAFORMATSCH_TYPE.TABLE, customVars, receiveTimeout)
    }

    LkProperties(filename, lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.LkProperties(filename, lkPropertiesOptions,
            LinkarFunctions.DATAFORMATSCH_TYPE.TABLE, customVars, receiveTimeout)
    }

    GetTable(filename, selectClause = "", dictClause = "", sortClause = "", tableOptions = new LinkarFunctions.TableOptions(),
        customVars = "", receiveTimeout = 0) {
           return this.linkarClient.Select(filename, selectClause, dictClause, sortClause, tableOptions,
            customVars, receiveTimeout)
    }
}

module.exports = { LinkarClient }
