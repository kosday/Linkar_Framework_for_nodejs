const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const LinkarFunctionsDirect = require("../Linkar.Functions.Direct/DirectFunctions")

/*
	enum: XML output formats for Read, Update, New and Select
	
		Defined constants of XML_FORMAT:
	
		XML (0x02) - Show the results of the operation in XML format.
		XML_DICT (0x05) - Show the results of the operation in XML_DICT format, using the dictionaries.
		XML_SCH (0x06) - Show the results of the operation in XML_SCH format, using the schema properties.
*/
const XML_FORMAT = {
	XML: 0x02,
	XML_DICT: 0x05,
	XML_SCH: 0x06
  }

/*
	class: Functions
		These functions perform direct (without establishing permanent session) operations with output format type XML.
*/
class Functions {
	
	/*
		Function: Read
			Reads one or several records of a file, with XML input and output format.
			
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) File name to read.
			recordIds - (string) A list of item IDs to read.
			dictionaries - (string) List of dictionaries to read, separated by space. If this list is not set, all fields are returned. You may use the format LKFLDx where x is the attribute number.
			readOptions - (<ReadOptions>) Object that defines the different reading options of the Function: Calculated, dictClause, conversion, formatSpec, originalRecords.
			xmlFormat - (<XML_FORMAT>) Different XML output formats.
			customVars - (string)Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.

		Returns:
			string
		
			The results of the operation.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyRead()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.Read(credentials, "LK.CUSTOMERS",
								"<?xml version=\"1.0\" encoding=\"utf-16\"?>" + 
								"<LINKAR>" +
								"  <RECORDS>" +
								"    <RECORD>" +
								"      <LKITEMID>2</LKITEMID>" +
								"    </RECORD>" +
								"  </RECORDS>" +
								"</LINKAR>");

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
	static Read(credentialOptions, filename, recordIds, dictionaries = "", readOptions = new LinkarFunctions.ReadOptions(),
		xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.Read(credentialOptions, filename, recordIds, dictionaries, readOptions,
			LinkarFunctions.DATAFORMAT_TYPE.XML, xmlFormat, customVars, receiveTimeout)
	}
	
	/*
		Function: Update
			Update one or several records of a file, with XML input and output format.
			
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) Name of the file being updated.
			records - (string) Buffer of record data to update. Inside this string are the recordIds, the modified records, and the originalRecords.
			updateOptions - (<UpdateOptions>) Object with write options, including optimisticLockControl, readAfter, calculated, dictionaries, conversion, formatSpec, originalRecords.
			xmlFormat - (<XML_FORMAT>) Different XML output formats.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.

		Returns:
			string
		
			The results of the operation.
			
		Remarks:
		Inside the records argument, the recordIds and the modified records always must be specified. But the originalRecords not always.
		When <UpdateOptions> argument is specified and the <UpdateOptions.OptimisticLockControl> property is set to true, a copy of the record must be provided before the modification (originalRecords argument)
		to use the Optimistic Lock technique. This copy can be obtained from a previous <Read> operation. The database, before executing the modification, 
		reads the record and compares it with the copy in originalRecords, if they are equal the modified record is executed.
		But if they are not equal, it means that the record has been modified by other user and its modification will not be saved.
		The record will have to be read, modified and saved again.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyUpdate()
		{
			try{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.Update(credentials, "LK.CUSTOMERS",
								"<?xml version=\"1.0\" encoding=\"utf-16\"?>" +
								"<LINKAR>" +
								"  <RECORDS>" +
								"    <RECORD>" +
								"      <LKITEMID>2</LKITEMID>" +
								"      <NAME>CUSTOMER 2</NAME>" +
								"      <ADDR>ADDRESS 2</ADDR>" +
								"      <PHONE>444</PHONE>" +
								"    </RECORD>" +
								"  </RECORDS>" +
								"</LINKAR>");
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
	static Update(credentialOptions, filename, records, updateOptions = new LinkarFunctions.UpdateOptions(),
		xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.Update(credentialOptions, filename, records, updateOptions,
			LinkarFunctions.DATAFORMAT_TYPE.XML, xmlFormat, customVars, receiveTimeout)
	}
	
	/*
		Function: UpdatePartial
			Update one or more attributes of one or more file records, with XML input and output format.
			
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) Name of the file being updated.
			records - (string) Buffer of record data to update. Inside this string are the recordIds, the modified records, and the originalRecords.
			updateOptions - (<UpdateOptions>) Object with write options, including optimisticLockControl, readAfter, calculated, dictionaries, conversion, formatSpec, originalRecords.
			xmlFormat - (<XML_FORMAT>) Different XML output formats.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.

		Returns:
			string
		
			The results of the operation.
			
		Remarks:
		Inside the records argument, the recordIds and the modified records always must be specified. But the originalRecords not always.
		When <UpdateOptions> argument is specified and the <UpdateOptions.OptimisticLockControl> property is set to true, a copy of the record must be provided before the modification (originalRecords argument)
		to use the Optimistic Lock technique. This copy can be obtained from a previous <Read> operation. The database, before executing the modification, 
		reads the record and compares it with the copy in originalRecords, if they are equal the modified record is executed.
		But if they are not equal, it means that the record has been modified by other user and its modification will not be saved.
		The record will have to be read, modified and saved again.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyUpdatePartial()
		{
			try{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.UpdatePartial(credentials, "LK.CUSTOMERS",
								"<?xml version=\"1.0\" encoding=\"utf-16\"?>" +
								"<LINKAR>" +
								"  <RECORDS>" +
								"    <RECORD>" +
								"      <LKITEMID>2</LKITEMID>" +
								"      <NAME>CUSTOMER 2</NAME>" +
								"    </RECORD>" +
								"  </RECORDS>" +
								"</LINKAR>");
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
	static UpdatePartial(credentialOptions, filename, records, updateOptions = new LinkarFunctions.UpdateOptions(),
		xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.UpdatePartial(credentialOptions, filename, records, "", updateOptions,
			LinkarFunctions.DATAFORMAT_TYPE.XML, xmlFormat, customVars, receiveTimeout)
	}
	
	/*
		Function: New
			Creates one or several records of a file, with XML input and output format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) The file name where the records are going to be created.
			records - (string) Buffer of records to write. Inside this string are the recordIds, and the records.
			newOptions - (<NewOptions>) Object with write options for the new record(s), including recordIdType, readAfter, calculated, dictionaries, conversion, formatSpec, originalRecords.
			xmlFormat - (<XML_FORMAT>) Different XML output formats.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.

		Remarks:
			Inside the records argument, the records always must be specified.
			But the recordIds only must be specified when <NewOptions> argument is NULL, or when the <RecordIdType> argument of the <NewOptions> constructor is NULL.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyNew()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.New(credentials, "LK.CUSTOMERS",
								"<?xml version=\"1.0\" encoding=\"utf-16\"?>" +
								"<LINKAR>" +
								"  <RECORDS>" +
								"    <RECORD>" +
								"      <LKITEMID>2</LKITEMID>" +
								"      <NAME>CUSTOMER 2</NAME>" +
								"      <ADDR>ADDRESS 2</ADDR>" +
								"      <PHONE>444</PHONE>" +
								"    </RECORD>" +
								"  </RECORDS>" +
								"</LINKAR>");
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
	static New(credentialOptions, filename, records, newOptions = new LinkarFunctions.NewOptions(),
		xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.New(credentialOptions, filename, records, newOptions,
			LinkarFunctions.DATAFORMAT_TYPE.XML, xmlFormat, customVars, receiveTimeout)
	}

	/*
		Function: Delete
			Deletes one or several records in file, with XML input and output format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) The file name where the records are going to be created.
			records - (string) Buffer of records to be deleted.
			deleteOptions - (<DeleteOptions>) Object with options to manage how records are deleted, including optimisticLockControl, recoverRecordIdType.
			xmlFormat - (<XML_FORMAT>) Different XML output formats.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.

		Returns:
			string
			
			The results of the operation.
			
		Remarks:
			Inside the records argument, the recordIds always must be specified. But the originalRecords not always.
			When <deleteOptions> argument is specified and the <DeleteOptions.OptimisticLockControl> property is set to true,
			a copy of the record must be provided before the deletion to use the Optimistic Lock technique.
			This copy can be obtained from a previous <Read> operation. The database, before executing the deletion, 
			reads the record and compares it with the copy in originalRecords, if they are equal the record is deleted.
			But if they are not equal, it means that the record has been modified by other user and the record will not be deleted.
			The record will have to be read, and deleted again.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyDelete()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.Delete(credentials, "LK.CUSTOMERS",
								"<?xml version=\"1.0\" encoding=\"utf-16\"?>" +
								"<LINKAR>" +
								"  <RECORDS>" +
								"    <RECORD>" +
								"      <LKITEMID>2</LKITEMID>" +
								"    </RECORD>" +
								"  </RECORDS>" +
								"</LINKAR>");
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
	static Delete(credentialOptions, filename, records, deleteOptions = new LinkarFunctions.DeleteOptions(),
		customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.Delete(credentialOptions, filename, records, deleteOptions,
			LinkarFunctions.DATAFORMAT_TYPE.XML, DATAFORMAT_TYPE.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
	}
	
	/*
		Function: Select
			Executes a Query in the Database, with XML output format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) Name of file on which the operation is performed. For example LK.ORDERS
			selectClause - (string) Statement fragment specifies the selection condition. For example WITH CUSTOMER = '1'
			sortClause - (string) Statement fragment specifies the selection order. If there is a selection rule, Linkar will execute a SSELECT, otherwise Linkar will execute a SELECT. For example BY CUSTOMER
			dictClause - (string) Space-delimited list of dictionaries to read. If this list is not set, all fields are returned. For example CUSTOMER DATE ITEM. You may use the format LKFLDx where x is the attribute number.
			preSelectClause - (string) An optional command that executes before the main Select
			selectOptions - (<SelectOptions>) Object with options to manage how records are selected, including calculated, dictionaries, conversion, formatSpec, originalRecords, onlyItemId, pagination, regPage, numPage.
			xmlFormat - (<XML_FORMAT>) Different XML output formats.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
			
		Remarks:
			In the preSelectClause argument these operations can be carried out before executing the Select statement:
			
				- Previously call to a saved list with the GET.LIST command to use it in the Main Select input
				- Make a previous Select to use the result as the Main Select input, with the SELECT or SSELECT commands.In this case the entire sentence must be indicated in the PreselectClause. For example:SSELECT LK.ORDERS WITH CUSTOMER = '1'
				- Exploit a Main File index to use the result as a Main Select input, with the SELECTINDEX command. The syntax for all the databases is SELECTINDEX index.name.value. For example SELECTINDEX ITEM,"101691"

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MySelect()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.Select(credentials, "LK.CUSTOMERS");
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
	static Select(credentialOptions, filename, selectClause = "", sortClause = "", dictClause = "", preSelectClause = "", selectOptions = new LinkarFunctions.SelectOptions(),
		xmlFormat = XML_FORMAT.XML, customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.Select(credentialOptions, filename, selectClause, sortClause, dictClause, preSelectClause, selectOptions,
			xmlFormat, customVars, receiveTimeout)
	}
	
	/*
		Function: Subroutine
			Executes a subroutine, with XML input and output format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			subroutineName - (string) Name of BASIC subroutine to execute.
			argsNumber - (number) Number of arguments.
			arguments - (string) The subroutine arguments list. Each argument is a substring separated with the ASCII char DC4 (20).
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MySubroutine()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.Subroutine(credentials, "SUB.DEMOLINKAR", 3,
								"<?xml version=\"1.0\" encoding=\"utf-16\"?>" +
								"<LINKAR>" +
								"  <ARGUMENTS>" +
								"    <ARGUMENT>0</ARGUMENT>" +
								"    <ARGUMENT>qwerty</ARGUMENT>" +
								"    <ARGUMENT></ARGUMENT>" +
								"  </ARGUMENTS>" +
								"</LINKAR>");
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
	static Subroutine(credentialOptions, subroutineName, argsNumber, args,
		customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.Subroutine(credentialOptions, subroutineName, argsNumber, args,
			LinkarFunctions.DATAFORMAT_TYPE.XML, LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
	}
	
	/*
		Function: Conversion
			Returns the result of executing ICONV() or OCONV() functions from a expression list in the Database, with XML output format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			conversionType - (<CONVERSION_TYPE>) Indicates the conversion type, input or output: INPUT=ICONV(); OUTPUT=OCONV()
			expression - (string) The data or expression to convert. May include MV marks (value delimiters), in which case the conversion will execute in each value obeying the original MV mark.
			code - (string) The conversion code. Must obey the Database conversions specifications.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyConversion()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.Conversion(credentials, CONVERSION_TYPE.INPUT,"31-12-2017þ01-01-2018","D2-");
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
	static Conversion(credentialOptions, expression, code, conversionType,
		customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.Conversion(credentialOptions, expression, code, conversionType,
			LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
	}
	
	/*
		Function: Format
			Returns the result of executing the FMT function in a expressions list in the Database, with XML output format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			expression - (string) The data or expression to format. If multiple values are present, the operation will be performed individually on all values in the expression.
			formatSpec - (string) Specified format.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyFormat()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.Format(credentials, "1þ2","R#10");
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
	static Format(credentialOptions, expression, formatSpec,
		customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.Format(credentialOptions, expression, formatSpec,
			LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
	}
	
	/*
		Function: Dictionaries
			Returns all the dictionaries of a file, with XML output format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) File name.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyDictionaries()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.Dictionaries(credentials, "LK.CUSTOMERS");
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
	static Dictionaries(credentialOptions, filename,
		customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.Dictionaries(credentialOptions, filename,
			LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
	}
	
	/*
		Function: Execute
			Allows the execution of any command from the Database, with XML output format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			statement - (string) The command you want to execute in the Database.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyExecute()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.Execute(credentials, "WHO");
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
	static Execute(credentialOptions, statement,
		customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.Execute(credentialOptions, statement,
			LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
	}
	
	/*
		Function: GetVersion
			Allows getting the server version, with XML output format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
		
		Remarks:
			This function returns the following information:
			
				LKMVCOMPONENTSVERSION - MV Components version.
				LKSERVERVERSION - Linkar SERVER version.
				LKCLIENTVERSION - Used client library version.
				DATABASE - Database.
				OS - Operating system.
				DATEZERO - Date zero base in YYYYMMDD format.
				DATEOUTPUTCONVERSION - Output conversion for date used by Linkar Schemas.
				TIMEOUTPUTCONVERSION - Output conversion for time used by Linkar Schemas.
				MVDATETIMESEPARATOR - DateTime used separator used by Linkar Schemas, for instance 18325,23000.
				MVBOOLTRUE - Database used char for the Boolean true value used by Linkar Schemas.
				MVBOOLFALSE - Database used char for the Boolean false value used by Linkar Schemas.
				OUTPUTBOOLTRUE - Used char for the Boolean true value out of the database used by Linkar Schemas.
				OUTPUTBOOLFALSE - Used char for the Boolean false value out of the database used by Linkar Schemas.
				MVDECIMALSEPARATOR - Decimal separator in the database. May be point, comma or none when the database does not store decimal numbers. Used by Linkar Schemas.
				OTHERLANGUAGES - Languages list separated by commas.
				TABLEROWSEPARATOR - It is the decimal char that you use to separate the rows in the output table format. By default 11.
				TABLECOLSEPARATOR - It is the decimal char that you use to separate the columns in the output table format. By default 9.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyGetVersion()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.GetVersion(credentials);
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
	static GetVersion(credentialOptions,
		receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.GetVersion(credentialOptions,
			LinkarFunctions.DATAFORMAT_TYPE.XML, receiveTimeout)
	}
	
	/*
		Function: LkSchemas
			Returns a list of all the Schemas defined in Linkar Schemas, or the EntryPoint account data files, with XML output format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
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
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyLkSchemas()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");

				var result = LinkarFunctionsDirectMV.Functions.LkSchemas(credentials);
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
	static LkSchemas(credentialOptions, lkSchemasOptions = new LinkarFunctions.LkSchemasOptions(),
		customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.LkSchemas(credentialOptions, lkSchemasOptions,
			LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
	}
	
	/*
		Function: LkProperties
			Returns the Schema properties list defined in Linkar Schemas or the file dictionaries, with XML output format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
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
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyLkProperties()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");

				var result = LinkarFunctionsDirectMV.Functions.LkProperties(credentials, "LK.CUSTOMERS");
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
	static LkProperties(credentialOptions, filename, lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions(),
		customVars = "", receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.LkProperties(credentialOptions, filename, lkPropertiesOptions,
			LinkarFunctions.DATAFORMAT_TYPE.XML, customVars, receiveTimeout)
	}
	
	/*
		Function: ResetCommonBlocks
			Resets the COMMON variables with the 100 most used files, with XML output format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.

		Example:
		--- Code
		var Linkar = require('linkar_framework/Linkar/Linkar')
		var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
		var LinkarFunctionsDirectXML = require("linkar_framework/Linkar.Functions.Direct.XML/Functions")
		
		function MyResetCommonBlocks()
		{
			try
			{
				var credentials = new Linkar.CredentialOptions("127.0.0.1", "EPNAME", 11300, "admin", "admin");
				
				var result = LinkarFunctionsDirectMV.Functions.ResetCommonBlocks(credentials);
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
	static ResetCommonBlocks(credentialOptions,
		receiveTimeout = 0) {
		return LinkarFunctionsDirect.DirectFunctions.ResetCommonBlocks(credentialOptions, 
			LinkarFunctions.DATAFORMAT_TYPE.XML, receiveTimeout)
	}
}

module.exports = { Functions, XML_FORMAT }
