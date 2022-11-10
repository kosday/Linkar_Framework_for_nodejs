const OPERATION_CODE = require('../Linkar.Functions/OPERATION_CODE')
const OperationArguments = require('../Linkar.Functions/OperationArguments')
const LinkarFunctions = require('../Linkar.Functions/LinkarFunctions')
const Linkar = require("../Linkar/Linkar")
const linkar = new Linkar.Linkar();

/*
	class: DirectFunctions
		These functions perform direct (without establishing permanent session) operations with any kind of output format type.

*/
class DirectFunctions {

	/*
		Function: Read
			Reads one or several records of a file.
			
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) File name to read.
			recordIds - (string) A list of item IDs to read.
			dictionaries - (string) List of dictionaries to read, separated by space. If this list is not set, all fields are returned. You may use the format LKFLDx where x is the attribute number.
			readOptions - (<ReadOptions>) Object that defines the different reading options of the Function: Calculated, dictClause, conversion, formatSpec, originalRecords.
			inputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you wish to send the record ids: MV, XML or JSON.
			outputFormat - (<DATAFORMATCRU_TYPE>) Indicates in what format you want to receive the data resulting from the Read, New, Update and Select operations: MV, XML, XML_DICT, XML_SCH, JSON, JSON_DICT or JSON_SCH.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.

		Returns:
			string
		
			The results of the operation.
	*/
	static Read(credentialOptions, filename, recordIds, dictionaries = "", readOptions = new LinkarFunctions.ReadOptions(),
		inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetReadArgs(filename, recordIds, dictionaries, readOptions, customVars);      
		var opCode = OPERATION_CODE.OPERATION_CODE.READ;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: Update
			Update one or several records of a file.
			
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) Name of the file being updated.
			records - (string) Buffer of record data to update. Inside this string are the recordIds, the modified records, and the originalRecords.
			updateOptions - (<UpdateOptions>) Object with write options, including optimisticLockControl, readAfter, calculated, dictionaries, conversion, formatSpec, originalRecords.
			inputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you wish to send the resultant writing data: MV, XML or JSON.
			outputFormat - (<DATAFORMATCRU_TYPE>) Indicates in what format you want to receive the data resulting from the Read, New, Update and Select operations: MV, XML, XML_DICT, XML_SCH, JSON, JSON_DICT or JSON_SCH.
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
	*/
	static Update(credentialOptions, filename, records, updateOptions = new LinkarFunctions.UpdateOptions(),
		inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetUpdateArgs(filename, records, updateOptions, customVars);      
		var opCode = OPERATION_CODE.OPERATION_CODE.UPDATE;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}
	
	/*
		Function: UpdatePartial
			Update one or more attributes of one or more file records.
			
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) Name of the file being updated.
			records - (string) Buffer of record data to update. Inside this string are the recordIds, the modified records, and the originalRecords.
			dictionaries - (string) List of dictionaries to write, separated by space. In MV output format is mandatory. You may use the format LKFLDx where x is the attribute number.
			updateOptions - (<UpdateOptions>) Object with write options, including optimisticLockControl, readAfter, calculated, dictionaries, conversion, formatSpec, originalRecords.
			inputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you wish to send the resultant writing data: MV, XML or JSON.
			outputFormat - (<DATAFORMATCRU_TYPE>) Indicates in what format you want to receive the data resulting from the Read, New, Update and Select operations: MV, XML, XML_DICT, XML_SCH, JSON, JSON_DICT or JSON_SCH.
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
	*/
	static UpdatePartial(credentialOptions, filename, records, dictionaries, updateOptions = new LinkarFunctions.UpdateOptions(),
		inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetUpdatePartialArgs(filename, records, dictionaries, updateOptions, customVars);      
		var opCode = OPERATION_CODE.OPERATION_CODE.UPDATEPARTIAL;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: New
			Creates one or several records of a file.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) The file name where the records are going to be created.
			records - (string) Buffer of records to write. Inside this string are the recordIds, and the records.
			newOptions - (<NewOptions>) Object with write options for the new record(s), including recordIdType, readAfter, calculated, dictionaries, conversion, formatSpec, originalRecords.
			inputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you wish to send the resultant writing data: MV, XML or JSON.
			outputFormat - (<DATAFORMATCRU_TYPE>) Indicates in what format you want to receive the data resulting from the Read, New, Update and Select operations: MV, XML, XML_DICT, XML_SCH, JSON, JSON_DICT or JSON_SCH.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.

		Remarks:
			Inside the records argument, the records always must be specified.
			But the recordIds only must be specified when <NewOptions> argument is NULL, or when the <RecordIdType> argument of the <NewOptions> constructor is NULL.
	*/
	static New(credentialOptions, filename, records, newOptions = new LinkarFunctions.NewOptions(),
		inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetNewArgs(filename, records, newOptions, customVars);       
		var opCode = OPERATION_CODE.OPERATION_CODE.NEW;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

/*
		Function: Delete
			Deletes one or several records in file.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) The file name where the records are going to be created.
			records - (string) Buffer of records to be deleted.
			deleteOptions - (<DeleteOptions>) Object with options to manage how records are deleted, including optimisticLockControl, recoverRecordIdType.
			inputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you wish to send the resultant writing data: MV, XML or JSON.
			outputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you want to receive the data resulting from the operation: MV, XML or JSON.
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
	*/
	static Delete(credentialOptions, filename, records, deleteOptions = new LinkarFunctions.DeleteOptions(),
		inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetDeleteArgs(filename, records, deleteOptions, customVars);      
		var opCode = OPERATION_CODE.OPERATION_CODE.DELETE;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: Select
			Executes a Query in the Database.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) Name of file on which the operation is performed. For example LK.ORDERS
			selectClause - (string) Statement fragment specifies the selection condition. For example WITH CUSTOMER = '1'
			sortClause - (string) Statement fragment specifies the selection order. If there is a selection rule, Linkar will execute a SSELECT, otherwise Linkar will execute a SELECT. For example BY CUSTOMER
			dictClause - (string) Space-delimited list of dictionaries to read. If this list is not set, all fields are returned. For example CUSTOMER DATE ITEM. You may use the format LKFLDx where x is the attribute number.
			preSelectClause - (string) An optional command that executes before the main Select
			selectOptions - (<SelectOptions>) Object with options to manage how records are selected, including calculated, dictionaries, conversion, formatSpec, originalRecords, onlyItemId, pagination, regPage, numPage.
			outputFormat - (<DATAFORMATCRU_TYPE>) Indicates in what format you want to receive the data resulting from the Read, New, Update and Select operations: MV, XML, XML_DICT, XML_SCH, JSON, JSON_DICT or JSON_SCH.
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
	*/
	static Select(credentialOptions, filename, selectClause = "", sortClause = "", dictClause = "", preSelectClause = "", selectOptions = new LinkarFunctions.SelectOptions(),
		outputFormat = LinkarFunctions.DATAFORMATCRU_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetSelectArgs(filename, selectClause, sortClause, dictClause, preSelectClause,
			selectOptions, customVars);     
		var opCode = OPERATION_CODE.OPERATION_CODE.SELECT;
		var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: Subroutine
			Executes a subroutine.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			subroutineName - (string) Name of BASIC subroutine to execute.
			argsNumber - (number) Number of arguments.
			arguments - (string) The subroutine arguments list. Each argument is a substring separated with the ASCII char DC4 (20).
			inputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you wish to send the subroutine arguments: MV, XML or JSON.
			outputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you want to receive the data resulting from the operation: MV, XML or JSON.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
	*/
	static Subroutine(credentialOptions, subroutineName, argsNumber, args,
		inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetSubroutineArgs(subroutineName, argsNumber, args, customVars);     
		var opCode = OPERATION_CODE.OPERATION_CODE.SUBROUTINE;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: Conversion
			Returns the result of executing ICONV() or OCONV() functions from a expression list in the Database.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			conversionType - (<CONVERSION_TYPE>) Indicates the conversion type, input or output: INPUT=ICONV(); OUTPUT=OCONV()
			expression - (string) The data or expression to convert. May include MV marks (value delimiters), in which case the conversion will execute in each value obeying the original MV mark.
			code - (string) The conversion code. Must obey the Database conversions specifications.
			outputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you want to receive the data resulting from the operation: MV, XML or JSON.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
	*/
	static Conversion(credentialOptions, expression, code, conversionType,
		outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetConversionArgs(expression, code, conversionType, customVars);;        
		var opCode = OPERATION_CODE.OPERATION_CODE.CONVERSION;
		var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: Format
			Returns the result of executing the FMT function in a expressions list in the Database.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			expression - (string) The data or expression to format. If multiple values are present, the operation will be performed individually on all values in the expression.
			formatSpec - (string) Specified format.
			outputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you want to receive the data resulting from the operation: MV, XML or JSON.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
	*/
	static Format(credentialOptions, expression, formatSpec,
		outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetFormatArgs(expression, formatSpec, customVars);      
		var opCode = OPERATION_CODE.OPERATION_CODE.FORMAT;
		var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: Dictionaries
			Returns all the dictionaries of a file.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) File name.
			outputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you want to receive the data resulting from the operation: MV, XML or JSON.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
	*/
	static Dictionaries(credentialOptions, filename,
		outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetDictionariesArgs(filename, customVars);       
		var opCode = OPERATION_CODE.OPERATION_CODE.DICTIONARIES;
		var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: Execute
			Allows the execution of any command from the Database.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			statement - (string) The command you want to execute in the Database.
			outputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you want to receive the data resulting from the operation: MV, XML or JSON.
			customVars - (string) Free text sent to the database allows management of additional behaviours in SUB.LK.MAIN.CONTROL.CUSTOM, which is called when this parameter is set.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
	*/
	static Execute(credentialOptions, statement,
		outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetExecuteArgs(statement, customVars);       
		var opCode = OPERATION_CODE.OPERATION_CODE.EXECUTE;
		var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: GetVersion
			Allows getting the server version.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			outputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you want to receive the data resulting from the operation: MV, XML or JSON.
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
				CONVERTNUMBOOLJSON - Switch to create numeric and boolean data in JSON strings. Default is false.
	*/
	static GetVersion(credentialOptions,
		outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetVersionArgs();    
		var opCode = OPERATION_CODE.OPERATION_CODE.VERSION;
		var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: LkSchemas
			Returns a list of all the Schemas defined in Linkar Schemas, or the EntryPoint account data files.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			lkSchemasOptions - (<LkSchemasOptions>) This object defines the different options in base of the asked Schema Type: LKSCHEMAS, SQLMODE o DICTIONARIES.
			outputFormat - (<DATAFORMATSCH_TYPE>) Indicates in what format you want to receive the data resulting from the operation: MV, XML, JSON or TABLE.
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
	*/
	static LkSchemas(credentialOptions, lkSchemasOptions = new LinkarFunctions.LkSchemasOptions(),
		outputFormat = LinkarFunctions.DATAFORMATSCH_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetLkSchemasArgs(lkSchemasOptions, customVars);       
		var opCode = OPERATION_CODE.OPERATION_CODE.LKSCHEMAS;
		var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: LkProperties
			Returns the Schema properties list defined in Linkar Schemas or the file dictionaries.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			filename - (string) File name to LkProperties.
			lkPropertiesOptions - (<LkPropertiesOptions>) This object defines the different options in base of the asked Schema Type: LKSCHEMAS, SQLMODE o DICTIONARIES.
			outputFormat - (<DATAFORMATSCHPROP_TYPE>) Indicates in what format you want to receive the data resulting from the operation: MV, XML, XML:DICT, XML_SCH, JSON, JSON_DICT, JSON_SCH or TABLE.
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
	*/
	static LkProperties(credentialOptions, filename, lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions(),
		outputFormat = LinkarFunctions.DATAFORMATSCHPROP_TYPE.MV, customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetLkPropertiesArgs(filename, lkPropertiesOptions, customVars);        
		var opCode = OPERATION_CODE.OPERATION_CODE.LKPROPERTIES;
		var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: GetTable
			Returns a query result in a table format.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
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
	*/
	static GetTable(credentialOptions, filename, selectClause = "", dictClause = "", sortClause = "", tableOptions = new LinkarFunctions.TableOptions(),
		customVars = "", receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetGetTableArgs(filename, selectClause, dictClause, sortClause, tableOptions, customVars);      
		var opCode = OPERATION_CODE.OPERATION_CODE.GETTABLE;
		var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
		var outputFormat = LinkarFunctions.DATAFORMATSCH_TYPE.TABLE;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}

	/*
		Function: ResetCommonBlocks
			Resets the COMMON variables with the 100 most used files.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) Object with data necessary to access the Linkar Server: Username, Password, EntryPoint, Language, FreeText.
			outputFormat - (<DATAFORMAT_TYPE>) Indicates in what format you want to receive the data resulting from the operation: MV, XML or JSON.
			receiveTimeout - (number) Maximum time in seconds that the client will wait for a response from the server. Default = 0 to wait indefinitely.
		
		Returns:
			string
			
			The results of the operation.
	*/
	static ResetCommonBlocks(credentialOptions,
		outputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV, receiveTimeout = 0) {
		var opArgs = OperationArguments.OperationArguments.GetResetCommonBlocksArgs();             
		var opCode = OPERATION_CODE.OPERATION_CODE.RESETCOMMONBLOCKS;
		var inputFormat = LinkarFunctions.DATAFORMAT_TYPE.MV;
	
		var result = linkar.LkExecuteDirectOperation(credentialOptions, opCode, opArgs, inputFormat, outputFormat, receiveTimeout);
		return result;
	}
}

module.exports = { DirectFunctions }
