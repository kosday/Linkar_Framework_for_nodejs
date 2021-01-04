const OPERATION_CODE = require('../Linkar.Functions/OPERATION_CODE')
const OperationArguments = require('../Linkar.Functions/OperationArguments')
const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const Linkar = require("../Linkar/Linkar")
const linkar = new Linkar.Linkar();

class LinkarClient {

    constructor(receiveTimeout = 0)
    {
        this.SessionId = "";
        this.PublicKey = "";
        this.LkConnectionId = "";
        if (receiveTimeout)
            this.ReceiveTimeout = receiveTimeout;
        else
            this.ReceiveTimeout = 0;
        this.ConnectionInfo = null;
    }

    Login(credentialOptions, customVars = "", receiveTimeout = 0)
    {
        if (this.ConnectionInfo == null)
        {
            var options = "";
            var loginArgs = (customVars?customVars:"") + LinkarFunctions.ASCII_Chars.US_chr + options;
            var byteOpCode = OPERATION_CODE.OPERATION_CODE.LOGIN;
            var byteInputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
            var byteOutputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
            receiveTimeout = (receiveTimeout?receiveTimeout:0)
            if (receiveTimeout <= 0)
            {
                if (this.ReceiveTimeout > 0)
                    receiveTimeout = this.ReceiveTimeout;
            }            
            var connectionInfo = new Linkar.ConnectionInfo("", "", "", credentialOptions);
            var loginResult = linkar.LkExecutePersistentOperation(connectionInfo, byteOpCode, loginArgs, byteInputFormat, byteOutputFormat, receiveTimeout);
            if (!(loginResult == null || loginResult.length == 0))
            {
                this.ConnectionInfo = connectionInfo;
                return connectionInfo.SessionId;
            }
            else
            {
                this.ConnectionInfo = null;
                return null;
            }
        }
    }

    Logout(customVars = "", receiveTimeout = 0)
    {
        var logoutArgs = (customVars?customVars:"");
        var byteOpCode = OPERATION_CODE.OPERATION_CODE.LOGOUT;
        var byteInputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
        var byteOutputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
        receiveTimeout = (receiveTimeout?receiveTimeout:0)
        if (receiveTimeout <= 0)
        {
            if (this.ReceiveTimeout > 0)
                receiveTimeout = this.ReceiveTimeout;
        }            
        var loginResult = linkar.LkExecutePersistentOperation(this.ConnectionInfo, byteOpCode, logoutArgs, byteInputFormat, byteOutputFormat, receiveTimeout);
        if (!(loginResult == null || loginResult.length == 0))
            this.ConnectionInfo = null;
    }

    Read(filename, recordIds, dictionaries = "", readOptions = new LinkarFunctions.ReadOptions(),
        inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetReadArgs(filename, recordIds, dictionaries, readOptions, customVars);      
        var opCode = OPERATION_CODE.OPERATION_CODE.READ;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    Update(filename, records, updateOptions = new LinkarFunctions.UpdateOptions(),
        inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetUpdateArgs(filename, records, updateOptions, customVars);       
        var opCode = OPERATION_CODE.OPERATION_CODE.UPDATE;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    New(filename, records, newOptions = new LinkarFunctions.NewOptions(),
        inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetNewArgs(filename, records, newOptions, customVars);       
        var opCode = OPERATION_CODE.OPERATION_CODE.NEW;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    Delete(filename, records, deleteOptions = new LinkarFunctions.DeleteOptions(),
        inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetDeleteArgs(filename, records, deleteOptions, customVars);       
        var opCode = OPERATION_CODE.OPERATION_CODE.DELETE;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    Select(filename, selectClause, sortClause, dictClause, preSelectClause, selectOptions = new LinkarFunctions.SelectOptions(),
        outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetSelectArgs(filename, selectClause, sortClause, dictClause, preSelectClause,
            selectOptions, customVars);       
        var opCode = OPERATION_CODE.OPERATION_CODE.SELECT;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    Subroutine(subroutineName, argsNumber, args,
        inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetSubroutineArgs(subroutineName, argsNumber, args, customVars);     
        var opCode = OPERATION_CODE.OPERATION_CODE.SUBROUTINE;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    Conversion(expression, code, conversionType,
        outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetConversionArgs(expression, code, conversionType, customVars);      
        var opCode = OPERATION_CODE.OPERATION_CODE.CONVERSION;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    Format(expression, formatSpec,
        outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetFormatArgs(expression, formatSpec, customVars);      
        var opCode = OPERATION_CODE.OPERATION_CODE.FORMAT;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    Dictionaries(filename,
        outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetDictionariesArgs(filename, customVars);      
        var opCode = OPERATION_CODE.OPERATION_CODE.DICTIONARIES;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    Execute(statement,
        outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetExecuteArgs(statement, customVars);       
        var opCode = OPERATION_CODE.OPERATION_CODE.EXECUTE;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    GetVersion(outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetVersionArgs();        
        var opCode = OPERATION_CODE.OPERATION_CODE.VERSION;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    LkSchemas(lkSchemasOptions = new LinkarFunctions.LkSchemasOptions(),
        outputFormat = LinkarFunctions.DATAFORMATSCH_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetLkSchemasArgs(lkSchemasOptions, customVars);      
        var opCode = OPERATION_CODE.OPERATION_CODE.LKSCHEMAS;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    LkProperties(filename, lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions(),
        outputFormat = LinkarFunctions.DATAFORMATSCH_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetLkPropertiesArgs(filename, lkPropertiesOptions, customVars);  
        var opCode = OPERATION_CODE.OPERATION_CODE.LKPROPERTIES;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    GetTable(filename, selectClause = "", dictClause = "", sortClause = "", tableOptions = new LinkarFunctions.TableOptions(),
        customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetGetTableArgs(filename, selectClause, dictClause, sortClause, tableOptions, customVars);       
        var opCode = OPERATION_CODE.OPERATION_CODE.GETTABLE;
        var inputFormat = LinkarFunctions.DATAFORMATSCH_TYPE.TABLE;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    ResetCommonBlocks(outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetResetCommonBlocksArgs();       
        var opCode = OPERATION_CODE.OPERATION_CODE.RESETCOMMONBLOCKS;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }
}

module.exports = { LinkarClient }
