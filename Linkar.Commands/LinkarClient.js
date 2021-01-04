const ENVELOPE_FORMAT = require('./ENVELOPE_FORMAT')
const OPERATION_CODE = require('../Linkar.Functions/OPERATION_CODE')
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

    SendCommand(command, commandFormat, receiveTimeout = 0) {
        var opArgs = customVars + LinkarFunctions.ASCII_Chars.US_str + options + LinkarFunctions.ASCII_Chars.US_str + command;    
        var opCode;
        if (commandFormat == ENVELOPE_FORMAT.ENVELOPE_FORMAT.JSON)
            opCode = OPERATION_CODE.OPERATION_CODE.COMMAND_JSON;
        else
            opCode = OPERATION_CODE.OPERATION_CODE.COMMAND_XML;
        var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
        var outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;  

        var result = linkar.LkExecutePersistentOperation(this.ConnectionInfo, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
        return result;
    }
}

module.exports = { LinkarClient }
