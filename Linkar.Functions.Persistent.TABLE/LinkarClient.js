const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const LinkarFunctionsPersistent = require("../Linkar.Functions.Persistent/LinkarClient");

/*
	Class: LinkarClient
		These functions perform persistent (establishing permanent session) operations with output format type TABLE.
*/
class LinkarClient {

	/*
		Constructor: constructor
			Initializes a new instance of the LinkarClient class.
			
		Arguments:
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely. When the receiveTimeout argument is omitted in any operation, the value set here will be applied.
	*/
	constructor(receiveTimeout) {
		this.linkarClient = new LinkarFunctionsPersistent.LinkarClient(receiveTimeout);
	}

	/*
		Function: Login
			Starts the communication with a server allowing making use of the rest of functions until the Logout method is executed or the connection with the server gets lost.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Remarks:
			Login is actually a "virtual" operation which creates a new Client Session ID. No DBMS login is performed unless Linkar SERVER determines new Database Sessions are required - these operations are not related.
 	*/
	Login(credentialOptions, customVars = "", receiveTimeout = 0) {
		return this.linkarClient.Login(credentialOptions, customVars, receiveTimeout)
	}

	/*
		Function: Logout
			Closes the communication with the server, that previously has been opened with a Login function.
		
		Arguments:
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.</param>
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.</param>

		Remarks:
			Logout is actually a "virtual" operation which disposes the current Client Session ID. No DBMS logout is performed.
	*/
	Logout(customVars = "", receiveTimeout = 0) {
		return this.linkarClient.Logout(customVars, receiveTimeout)
}

	/*
		Function: LkSchemas
			Returns a list of all the Schemas defined in Linkar Schemas, or the EntryPoint account data files, with TABLE output format.
		
		Arguments:
			lkSchemasOptions - (<LkSchemasOptions>) This object defines the different options in base of the asked Schema Type: LKSCHEMAS, SQLMODE o DICTIONARIES.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
		
		Remarks:
			TABLE output format uses the defined control characters in <EntryPoints Parameters: http://kosday.com/Manuals/en_web_linkar/lk_schemas_ep_parameters.html> Table Row Separator and Column Row Separator.
			
			By default:
			
				TAB - char (9) for columns.
				VT - char (11) for rows.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsPersistentTABLE = require("linkar_framework/Linkar.Functions.Persistent.TABLE/LinkarClient")
		
		function MyLkSchemas()
		{
			try
			{
				var client = new LinkarFunctionsPersistentMV.LinkarClient();
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				client.Login(credentials);

				var result = client.LkSchemas();
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
	LkSchemas(lkSchemasOptions = new LinkarFunctions.LkSchemasOptions(),
		customVars = "", receiveTimeout = 0) {
		return this.linkarClient.LkSchemas(lkSchemasOptions,
			LinkarFunctions.DATAFORMATSCH_TYPE.TABLE, customVars, receiveTimeout)
	}
	
	/*
		Function: LkProperties
			Returns the Schema properties list defined in Linkar Schemas or the file dictionaries, with TABLE output format.
		
		Arguments:
			filename - (string) File name to LkProperties.
			lkPropertiesOptions - (<LkPropertiesOptions>) This object defines the different options in base of the asked Schema Type: LKSCHEMAS, SQLMODE o DICTIONARIES.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
		
		Remarks:
			TABLE output format uses the defined control characters in <EntryPoints Parameters: http://kosday.com/Manuals/en_web_linkar/lk_schemas_ep_parameters.html> Table Row Separator and Column Row Separator.
			
			By default:
			
				TAB - char (9) for columns.
				VT - char (11) for rows.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsPersistentTABLE = require("linkar_framework/Linkar.Functions.Persistent.TABLE/LinkarClient")
		
		function MyLkProperties()
		{
			try
			{
				var client = new LinkarFunctionsPersistentMV.LinkarClient();
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				client.Login(credentials);

				var result = client.LkProperties("LK.CUSTOMERS");
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
	LkProperties(filename, lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions(),
		customVars = "", receiveTimeout = 0) {
		return this.linkarClient.LkProperties(filename, lkPropertiesOptions,
			LinkarFunctions.DATAFORMATSCH_TYPE.TABLE, customVars, receiveTimeout)
	}
	
	/*
		Function: GetTable
			Returns a query result in a table format.
		
		Arguments:
			filename - (string) File or table name defined in Linkar Schemas. Table notation is: MainTable[.MVTable[.SVTable]]
			selectClause - (string) Statement fragment specifies the selection condition. For example WITH CUSTOMER = '1'
			dictClause - (string) Space-delimited list of dictionaries to read. If this list is not set, all fields are returned. For example CUSTOMER DATE ITEM. In NONE mode you may use the format LKFLDx where x is the attribute number.
			sortClause - (string) Statement fragment specifies the selection order. If there is a selection rule Linkar will execute a SSELECT, otherwise Linkar will execute a SELECT. For example BY CUSTOMER
			tableOptions - (<TableOptions>) Detailed options to be used, including: rowHeaders, rowProperties, onlyVisibe, usePropertyNames, repeatValues, applyConversion, applyFormat, calculated, pagination, regPage, numPage.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
		
		Remarks:
			TABLE output format uses the defined control characters in <EntryPoints Parameters: http://kosday.com/Manuals/en_web_linkar/lk_schemas_ep_parameters.html> Table Row Separator and Column Row Separator.
			
			By default:
			
				TAB - char (9) for columns.
				VT - char (11) for rows.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsPersistentTABLE = require("linkar_framework/Linkar.Functions.Persistent.TABLE/LinkarClient")
		
		function MyGetTable()
		{
			try
			{
				var client = new LinkarFunctionsPersistentMV.LinkarClient();
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				client.Login(credentials);

				var result = client.GetTable("LK.CUSTOMERS");
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
	GetTable(filename, selectClause = "", dictClause = "", sortClause = "", tableOptions = new LinkarFunctions.TableOptions(),
		customVars = "", receiveTimeout = 0) {
		return this.linkarClient.Select(filename, selectClause, dictClause, sortClause, tableOptions,
			customVars, receiveTimeout)
	}

}

module.exports = { LinkarClient }
