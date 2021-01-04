const ENVELOPE_FORMAT = require('./ENVELOPE_FORMAT')
const OPERATION_CODE = require('../Linkar.Functions/OPERATION_CODE')
const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const Linkar = require("../Linkar/Linkar")
const linkar = new Linkar.Linkar();

class Functions {

    static SendCommand(credentialOptions, command, commandFormat, receiveTimeout = 0) {
        var opArgs = customVars + LinkarFunctions.ASCII_Chars.US_str + options + LinkarFunctions.ASCII_Chars.US_str + command;    
        var opCode;
        if (commandFormat == ENVELOPE_FORMAT.ENVELOPE_FORMAT.JSON)
            opCode = OPERATION_CODE.OPERATION_CODE.COMMAND_JSON;
        else
            opCode = OPERATION_CODE.OPERATION_CODE.COMMAND_XML;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
        var outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;

        var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }
}

module.exports = { Functions }
