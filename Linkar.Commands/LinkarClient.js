const ENVELOPE_FORMAT = require('./ENVELOPE_FORMAT')
const OPERATION_CODE = require('../Linkar.Functions/OPERATION_CODE')
const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const Linkar = require("../Linkar/Linkar")
const linkar = new Linkar.Linkar();

/*
	Class: LinkarClient
		These functions perform persistent (establishing permanent session) operations with any kind of output format type.
	
	Property: SessionId
		String
		
		SessionID of the connection.
*/
class LinkarClient {

	/*
		Constructor: constructor
			Initializes a new instance of the LinkarClt class.
			
		Arguments:
			receiveTimeout - Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely. When the receiveTimeout argument is omitted in any operation, the value set here will be applied.
	*/
	constructor(receiveTimeout = 0) {
		this.SessionId = "";
		if (receiveTimeout)
			this.ReceiveTimeout = receiveTimeout;
		else
			this.ReceiveTimeout = 0;
		this.ConnectionInfo = null;
	}

	/*
		Function: Login
			Starts the communication with a server allowing making use of the rest of functions until the Close method is executed or the connection with the server gets lost.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.

		Remarks:
			Login is actually a "virtual" operation which creates a new Client Session ID. No DBMS login is performed unless Linkar SERVER determines new Database Sessions are required. These operations are not related.
	*/
	Login(credentialOptions, customVars = "", receiveTimeout = 0) {
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
				this.SessionId = connectionInfo.SessionId;
			}
			else
			{
				this.ConnectionInfo = null;
			}
		}
	}

	/*
		Function: Logout
			Closes the communication with the server, that previously has been opened with a Login function.
		
		Arguments:
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.</param>
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.</param>
	*/
	Logout(customVars = "", receiveTimeout = 0) {
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

	/*
		Function: SendCommand
			Allows a variety of persistent operations using standard templates (XML, JSON).
		
		Arguments:
			command - (string) Content of the operation you want to send.
			commandFormat - (<ENVELOPE_FORMAT>) Indicates in what format you are doing the operation: XML or JSON.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.

		Returns:
			string
			
			The results of the operation.
	*/
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

	/*
		Function: SendJsonCommand
			Allows a variety of persistent operations using standard JSON templates.
		
		Arguments:
			command - (string) Content of the operation you want to send.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
			
		Example:
		---Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarCommands = require("linkar_framework/Linkar.Commands/LinkarClient")
		
		function MySendCommand()
		{
			try
			{
				var client = new LinkarFunctionsPersistentMV.LinkarClient();
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				client.Login(credentials);
				string command = 
						"{" +
						"	\"NAME\" : \"READ\"," +
						"	\"COMMAND\" :" + 
						"	{" +
						"		\"CALCULATED\" : \"True\" ," +
						"		\"OUTPUT_FORMAT\" : \"JSON_DICT\" ," +
						"		\"FILE_NAME\" : \"LK.CUSTOMERS\" ," +
						"		\"RECORDS\" : [" +
						"			{ \"LKITEMID\" : \"2\" }" +
						"		]" +
						"	}" +
						"}";
				var result = client.SendJsonCommand(command);
			}
			catch (error)
			{
				console.log(error);
				// Do something
			}
			return result;
		}
	*/
	SendJsonCommand(command, receiveTimeout = 0) {
		return SendCommand(command, ENVELOPE_FORMAT.ENVELOPE_FORMAT.JSON, receiveTimeout = 0);
	}

	/*
		Function: SendXmlCommand
			Allows a variety of persistent operations using standard XML templates.
		
		Arguments:
			command - (string) Content of the operation you want to send.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
			
		Example:
		---Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarCommands = require("linkar_framework/Linkar.Commands/LinkarClient")
		
		function MySendCommand()
		{
			try
			{
				var client = new LinkarFunctionsPersistentMV.LinkarClient();
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				client.Login(credentials);
				string command = 
								"&lt;COMMAND NAME=\"READ\"&gt;" +
								"   &lt;CALCULATED&gt;True&lt;/CALCULATED&gt;" +
								"   &lt;OUTPUT_FORMAT&gt;XML_DICT&lt;/OUTPUT_FORMAT&gt;" +
								"   &lt;FILE_NAME&gt;LK.CUSTOMERS&lt;/FILE_NAME&gt;" +
								"   &lt;RECORDS&gt;" +
								"       &lt;RECORD&gt;" +
								"           &lt;LKITEMID&gt;2&lt;/LKITEMID&gt;" + 
								"       &lt;/RECORD&gt;" +
								"   &lt;/RECORDS&gt;" +
								"&lt;/COMMAND&gt;"
				var result = client.SendXmlCommand(command);
			}
			catch (error)
			{
				console.log(error);
				// Do something
			}
			return result;
		}
		---
	*/
	SendXmlCommand(command, receiveTimeout = 0) {
		return SendCommand(command, ENVELOPE_FORMAT.ENVELOPE_FORMAT.XML, receiveTimeout = 0);
	}
}

module.exports = { LinkarClient }
