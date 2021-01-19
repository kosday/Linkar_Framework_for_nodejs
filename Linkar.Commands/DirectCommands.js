const ENVELOPE_FORMAT = require('./ENVELOPE_FORMAT')
const OPERATION_CODE = require('../Linkar.Functions/OPERATION_CODE')
const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const Linkar = require("../Linkar/Linkar")
const linkar = new Linkar.Linkar();

/*
	Class: DirectCommands
		These functions perform direct (without establishing permanent session) operations with any kind of output format type.
*/
class DirectCommands {

	/*
		Function: SendCommand
			Allows a variety of direct operations using standard templates (XML, JSON).
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			command - (string) Content of the operation you want to send.
			commandFormat - (string) Indicates in what format you are doing the operation: XML or JSON.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
		string
		
		The results of the operation.
	*/
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

	/*
		Function: SendJsonCommand
			Allows a variety of direct operations using standard JSON templates.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			command - (string) Content of the operation you want to send.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely. 
		
		Returns:
		string
		
		The results of the operation.
	*/
	static SendJsonCommand(credentialOptions, command, receiveTimeout = 0) {
		return SendCommand(credentialOptions, command, ENVELOPE_FORMAT.ENVELOPE_FORMAT.JSON, receiveTimeout );
	}

	/*
		Function: SendXmlCommand
			Allows a variety of direct operations using standard XML templates.
		
		Arguments:
			"credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			"command - (string) Content of the operation you want to send.
			"receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
		string
		
		The results of the operation.
	*/
	static SendXmlCommand(credentialOptions, command, receiveTimeout = 0) {
		return SendCommand(credentialOptions, command, ENVELOPE_FORMAT.ENVELOPE_FORMAT.XML, receiveTimeout );
	}
}

module.exports = { DirectCommands }
