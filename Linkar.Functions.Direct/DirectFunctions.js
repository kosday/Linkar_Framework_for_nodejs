const OperationArguments = require('../Linkar.Functions/OperationArguments')
const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const Linkar = require("../Linkar/Linkar")
const linkar = new Linkar.Linkar();

class DirectFunctions {

    static Read(credentialOptions, filename, recordIds, dictionaries = "", readOptions = new LinkarFunctions.ReadOptions(),
        inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetReadArgs(filename, recordIds, dictionaries, readOptions, customVars);      
        var opCode = LinkarFunctions.OPERATION_CODE.READ;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static Update(credentialOptions, filename, records, updateOptions = new LinkarFunctions.UpdateOptions(),
        inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetUpdateArgs(filename, records, updateOptions, customVars);      
        var opCode = LinkarFunctions.OPERATION_CODE.UPDATE;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static New(credentialOptions, filename, records, newOptions = new LinkarFunctions.NewOptions(),
        inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetNewArgs(filename, records, newOptions, customVars);       
        var opCode = LinkarFunctions.OPERATION_CODE.NEW;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static Delete(credentialOptions, filename, records, deleteOptions = new LinkarFunctions.DeleteOptions(),
        inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetDeleteArgs(filename, records, deleteOptions, customVars);      
        var opCode = LinkarFunctions.OPERATION_CODE.DELETE;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static Select(credentialOptions, filename, selectClause = "", sortClause = "", dictClause = "", preSelectClause = "", selectOptions = new LinkarFunctions.SelectOptions(),
        outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetSelectArgs(filename, selectClause, sortClause, dictClause, preSelectClause,
            selectOptions, customVars);     
        var opCode = LinkarFunctions.OPERATION_CODE.SELECT;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static Subroutine(credentialOptions, subroutineName, argsNumber, args,
        inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetSubroutineArgs(subroutineName, argsNumber, args, customVars);     
        var opCode = LinkarFunctions.OPERATION_CODE.SUBROUTINE;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static Conversion(credentialOptions, expression, code, conversionType,
        outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetConversionArgs(expression, code, conversionType, customVars);;        
        var opCode = LinkarFunctions.OPERATION_CODE.CONVERSION;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static Format(credentialOptions, expression, formatSpec,
        outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetFormatArgs(expression, formatSpec, customVars);      
        var opCode = LinkarFunctions.OPERATION_CODE.FORMAT;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static Dictionaries(credentialOptions, filename,
        outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetDictionariesArgs(filename, customVars);       
        var opCode = LinkarFunctions.OPERATION_CODE.DICTIONARIES;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static Execute(credentialOptions, statement,
        outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetExecuteArgs(statement, customVars);       
        var opCode = LinkarFunctions.OPERATION_CODE.EXECUTE;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static GetVersion(credentialOptions,
        outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetVersionArgs();    
        var opCode = LinkarFunctions.OPERATION_CODE.VERSION;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static LkSchemas(credentialOptions, lkSchemasOptions = new LinkarFunctions.LkSchemasOptions(),
        outputFormat = LinkarFunctions.DATAFORMATSCH_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetLkSchemasArgs(lkSchemasOptions, customVars);       
        var opCode = LinkarFunctions.OPERATION_CODE.LKSCHEMAS;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static LkProperties(credentialOptions, filename, lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions(),
        outputFormat = LinkarFunctions.DATAFORMATSCH_TYPE.MV, customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetLkPropertiesArgs(filename, lkPropertiesOptions, customVars);        
        var opCode = LinkarFunctions.OPERATION_CODE.LKPROPERTIES;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static GetTable(credentialOptions, filename, selectClause = "", dictClause = "", sortClause = "", tableOptions = new LinkarFunctions.TableOptions(),
        customVars = "", receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetGetTableArgs(filename, selectClause, dictClause, sortClause, tableOptions, customVars);      
        var opCode = LinkarFunctions.OPERATION_CODE.GETTABLE;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
        var outputFormat = LinkarFunctions.DATAFORMATSCH_TYPE.TABLE;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }

    static ResetCommonBlocks(credentialOptions,
        outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, receiveTimeout = 0) {
        var opArgs = OperationArguments.OperationArguments.GetResetCommonBlocksArgs();             
        var opCode = LinkarFunctions.OPERATION_CODE.RESETCOMMONBLOCKS;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }
}

module.exports = { DirectFunctions }
