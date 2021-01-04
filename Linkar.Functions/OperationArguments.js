var DBMV_Mark = require('./DBMV_Mark')
var ASCII_Chars = require('./ASCII_Chars')
var CONVERSION_TYPE = require('./CONVERSION_TYPE')
var ReadOptions = require('./ReadOptions')
var UpdateOptions = require('./UpdateOptions')
var NewOptions = require('./NewOptions')
var DeleteOptions = require('./DeleteOptions')
var SelectOptions = require('./SelectOptions')

class OperationArguments {

	static GetReadArgs(filename, recordIds, dictionaries, readOptions, customVars)
    {
        if (!readOptions)
            readOptions = new ReadOptions.ReadOptions();

        var options = readOptions.GetString();
        var inputData = filename + DBMV_Mark.AM + recordIds + DBMV_Mark.AM + dictionaries;

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + inputData;
        return cmdArgs;
    }

    static GetUpdateArgs(filename, records, updateOptions, customVars)
    {
        if (!updateOptions)
            updateOptions = new UpdateOptions.UpdateOptions();

        var options = updateOptions.GetString();
        var inputData = filename + DBMV_Mark.AM + records;

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + inputData;
        return cmdArgs;
    }

    static GetNewArgs(filename, records, newOptions, customVars)
    {
        if (!newOptions)
            newOptions = new NewOptions.NewOptions();

        var options = newOptions.GetString();
        var inputData = filename + DBMV_Mark.AM + records;

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + inputData;
        return cmdArgs;
    }

    static GetDeleteArgs(filename, records, deleteOptions, customVars)
    {
        if (!deleteOptions)
            deleteOptions = new DeleteOptions.DeleteOptions();

        var options = deleteOptions.GetString();
        var inputData = filename + DBMV_Mark.AM + records;

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + inputData;
        return cmdArgs;
    }

    static GetSelectArgs(filename, selectClause, sortClause, dictClause, preSelectClause,
        selectOptions, customVars)
    {
        if (!selectOptions)
            selectOptions = new SelectOptions.SelectOptions();

        var options = selectOptions.GetString();
        var inputData = filename + DBMV_Mark.AM +
            selectClause + DBMV_Mark.AM +
            sortClause + DBMV_Mark.AM +
            dictClause + DBMV_Mark.AM +
            preSelectClause;

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + inputData;
        return cmdArgs;
    }

    static GetSubroutineArgs(subroutineName, argsNumber, args, customVars)
    {
        var options = "";
        var inputData1 = subroutineName + DBMV_Mark.AM_str + argsNumber;
        var inputData2 = args;
        var inputData = inputData1 + ASCII_Chars.FS_str + inputData2;

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + inputData;
        return cmdArgs;
    }

    static GetConversionArgs(expression, code, conversionType, customVars)
    {
        var options = (conversionType == CONVERSION_TYPE.CONVERSION_TYPE.INPUT ? "I" : "O");
        var inputData = code + ASCII_Chars.FS_str + expression;

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + inputData;
        return cmdArgs;
    }

    static GetFormatArgs(expression, formatSpec, customVars)
    {
        var options = "";
        var inputData = formatSpec + ASCII_Chars.FS_str + expression;

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + inputData;
        return cmdArgs;
    }

    static GetDictionariesArgs(filename, customVars)
    {
        var options = "";

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + filename;
        return cmdArgs;
    }

    static GetExecuteArgs(statement,customVars)
    {
        var options = "";

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + statement;
        return cmdArgs;
    }

    static GetSendCommandArgs(command)
    {
        var options = "";

        var customVars = "";
        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + command;
        return cmdArgs;
    }

    static GetVersionArgs()
    {
        var options = "";

        var cmdArgs = "" + ASCII_Chars.US_str + options + ASCII_Chars.US_str + "";
        return cmdArgs;
    }

    static GetLkSchemasArgs(lkSchemasOptions, customVars)
    {
        var options = lkSchemasOptions.GetString();

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + "";
        return cmdArgs;
    }

    static GetLkPropertiesArgs(filename, lkPropertiesOptions, customVars)
    {
        var options = lkPropertiesOptions.GetString();

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + filename;
        return cmdArgs;
    }

    static GetGetTableArgs(filename, selectClause, dictClause, sortClause, tableOptions, customVars)
    {
        var options = tableOptions.GetString();
        var inputData = filename + DBMV_Mark.AM +
            selectClause + DBMV_Mark.AM +
            dictClause + DBMV_Mark.AM +
            sortClause;

        var cmdArgs = customVars + ASCII_Chars.US_str + options + ASCII_Chars.US_str + inputData;
        return cmdArgs;
    }

    static GetResetCommonBlocksArgs()
    {
        var options = "";

        var cmdArgs = "" + ASCII_Chars.US_str + options + ASCII_Chars.US_str + "";
        return cmdArgs;
    }
}

module.exports = {OperationArguments}
