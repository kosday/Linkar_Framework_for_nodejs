////////////////
// Library Links
////////////////
var Linkar = require('linkar_framework/Linkar/Linkar')
var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
var LinkarFunctionsPersistentMV = require("linkar_framework/Linkar.Functions.Persistent.MV/LinkarClient")
var LinkarStrings = require("linkar_framework/Linkar.Strings/StringFunctions")

////////////////
// Auxiliary functions
////////////////
// Extract data from string result and print
function process_result(transaction, lkString) {
  // Check Errors in transaction
  var lstError = LinkarStrings.StringFunctions.ExtractErrors(lkString)
  if (lstError.length > 0) {
    console.log("Found " + lstError.length + " errors in '" + transaction + "' transaction")
    for (var i = 0; i < lstError.length; i++)
      console.log(lstError[i])
  } else {
    console.log("No errors in transaction!")
  }

  //Extract values
  if (transaction == 'Subroutine') {
    var lstOutArgs = LinkarStrings.StringFunctions.ExtractSubroutineArgs(lkString)
    return { 'lstError': lstError, 'lstOutArgs': lstOutArgs }
  }
  else if (transaction == 'Conversion') {
    var lstConversion = LinkarStrings.StringFunctions.ExtractConversion(lkString)
    return { 'lstError': lstError, 'lstConversion': lstConversion }
  }
  else if (transaction == 'Format') {
    var lstFormat = LinkarStrings.StringFunctions.ExtractFormat(lkString)
    return { 'lstError': lstError, 'lstFormat': lstFormat }
  }
  else if (transaction == 'Execute' || transaction == 'ResetCommonBlocks') {
    var lstCapturing = LinkarStrings.StringFunctions.ExtractCapturing(lkString)
    var lstReturning = LinkarStrings.StringFunctions.ExtractReturning(lkString)
    return { 'lstError': lstError, 'lstCapturing': lstCapturing, 'lstReturning': lstReturning }
  }
  else {
    var lstRecordIds = LinkarStrings.StringFunctions.ExtractRecordIds(lkString)
    var lstRecord = LinkarStrings.StringFunctions.ExtractRecords(lkString)
    return { 'lstError': lstError, 'lstRecordIds': lstRecordIds, 'lstRecord': lstRecord }
  }
}

/********************************/
/* DEMO                         */
/********************************/

console.log("Demo start");

var customVars = '';
var receiveTimeout = -1;

try {
  ////////////////
  // LkLogin
  ////////////////
  console.log("LkLogin")
  console.log("--------")
  
  // Create credentials
  var crdOpt = new Linkar.CredentialOptions(
    "127.0.0.1",				// Linkar Server IP or Hostname
    "EP_NAME",			        // EntryPoint Name
    11300,				        // Linkar Server EntryPoint port
    "admin",				    // Linkar Server Username
    "admin",			        // Linkar Server Username Password
    "",					        // Language
    "Test Node.js")		    	// Free text

  console.log("PORT: " + crdOpt.Port)
  // Create Linkar Client
  var clt = new LinkarFunctionsPersistentMV.LinkarClient();
  // Execute Login operation
  clt.Login(crdOpt, "", 600);

  ////////////////
  // LkNew
  ////////////////
  console.log("-- LkNew --")
  console.log("--------")
  
  // In this demo we are going to work with the LK.CUSTOMERS file
  var filename = 'LK.CUSTOMERS'
  // Generate New operation buffer
  var strNewId = 'A90'
  var strNewRecord = 'CUSTOMER 99' + LinkarFunctions.DBMV_Mark.AM_str + 'ADDRESS 99' + LinkarFunctions.DBMV_Mark.AM_str + '999 - 999 - 99'
  var newBuffer = LinkarStrings.StringFunctions.ComposeNewBuffer(strNewId, strNewRecord)
  // Create New operation options
  var newOptions = new LinkarFunctions.NewOptions(new LinkarFunctions.RecordIdType(), true, false, false, false, false);
  // Execute New operation
  var result = clt.New(filename, newBuffer, newOptions, "", 60)
  // Extract data from string result and print
  var output = process_result('New', result)
  var lstRecordIds = output['lstRecordIds']
  var lstRecord = output['lstRecord']
  var strRecordId = lstRecordIds[0]
  var strRecord = lstRecord[0]
  console.log('strRecordId: ' + strRecordId)
  console.log('strRecord: ' + strRecord)

  /////////////////
  // LkExtract
  /////////////////
  console.log("-- LkExtract --")
  console.log("--------")
  
  // Extract and print one element from multivalue string
  result = LinkarFunctions.MvOperations.LkExtract(strRecord, 1)
  console.log(result)

  /////////////////
  // LkReplace
  /////////////////
  console.log("-- LkReplace --")
  console.log("--------")
  
  // Replace one element from multivalue string and print
  var replaceVal = "UPDATED CUSTOMER"
  result = LinkarFunctions.MvOperations.LkReplace(strRecord, replaceVal, 1)
  console.log(result)

  /////////////////
  // LkChange
  /////////////////
  console.log("-- LkChange --")
  console.log("--------")
  
  // Replaces the occurrences of a substring inside a string, by other substring and print
  result = LinkarFunctions.MvOperations.LkChange(strRecord, "9", "8")
  console.log(result)

  /////////////////
  // LkCount
  /////////////////
  console.log("-- LkCount --")
  console.log("--------")
  
  // Counts the occurrences of a substring inside a string and print
  result = LinkarFunctions.MvOperations.LkCount(strRecord, LinkarFunctions.DBMV_Mark.AM)
  console.log(result)

  /////////////////
  // LkDCount
  /////////////////
  console.log("-- LkDCount --")
  console.log("--------")
  
  // Counts the delimited substrings inside a string and print
  result = LinkarFunctions.MvOperations.LkDCount(strRecord, LinkarFunctions.DBMV_Mark.AM)
  console.log(result)

  /////////////////
  // LkUpdate
  /////////////////
  console.log("-- LkUpdate --")
  console.log("--------")
  
  // Create Update operation options
  var updateOptions = new LinkarFunctions.UpdateOptions(false, true, false, false, false, false);
  // Generate Update operation buffer
  var updateBuffer = LinkarStrings.StringFunctions.ComposeUpdateBuffer(strNewId, strNewRecord)
  // Execute Update operation
  result = clt.Update(filename, updateBuffer, updateOptions, "", 60)
  // Extract data from string result and print
  output = process_result('Update', result)
  lstRecordIds = output['lstRecordIds']
  lstRecord = output['lstRecord']
  if (lstRecordIds.length > 0) {
    console.log("--> Data Contents")
    for (i = 0; i < lstRecordIds.length; i++) {
      console.log("Id:" + lstRecordIds[i] + " Data:" + lstRecord[i])
    }
  }


  /////////////////
  // LkRead
  /////////////////
  console.log("-- LkRead --")
  console.log("--------")

  var dictionaries = ""
  // Create Read operation options
  var readOptions = new LinkarFunctions.ReadOptions(true, false, false, false);
  // Execute Read operation
  result = clt.Read(filename, strNewId, dictionaries, readOptions, "", 60)
  // Extract data from string result and print
  output = process_result('Read', result)
  lstRecordIds = output['lstRecordIds']
  lstRecord = output['lstRecord']
  if (lstRecordIds.length > 0) {
    console.log("--> Data Contents")
    for (i = 0; i < lstRecordIds.length; i++) {
      console.log("Id:" + lstRecordIds[i] + " Data:" + lstRecord[i])
    }
  }

  /////////////////
  // LkDelete
  /////////////////
  console.log("-- LkDelete --")
  console.log("--------")
  
  // Generate Delete operation buffer
  var deleteBuffer = LinkarStrings.StringFunctions.ComposeDeleteBuffer(strNewId)
  // Create Delete operation options
  var deleteOptions = new LinkarFunctions.DeleteOptions(false, new LinkarFunctions.RecoverIdType());
  // Execute Delete operation
  result = clt.Delete(filename, deleteBuffer, deleteOptions, "", 60)
  // Extract data from string result and print
  output = process_result('Delete', result)


  /////////////////
  // LkSubroutine
  /////////////////
  console.log("-- LkSubRoutine --")
  console.log("--------")  
  
  var subroutineName = 'SUB.DEMOLINKAR'
  // Generate Subroutine operation buffer
  var args = LinkarStrings.StringFunctions.ComposeSubroutineArgs(["0", "qwerty", ""]);
  // Execute Subroutine operation
  result = clt.Subroutine(subroutineName, 3, args, "", 60)
  // Extract data from string result and print
  output = process_result('Subroutine', result)
  if (output['lstError'].length == 0) {
    lstOutArgs = output['lstOutArgs']
    console.log("Arguments result -> " + lstOutArgs)
  } else {
    console.log(output['lstError'])
    console.log("Error while conversion")
  }

  /////////////////
  // LkConversion
  /////////////////

  console.log("-- LkConversion --")
  console.log("--------")
  
  var code = "D2-"
  var expression = "13320"
  var conversionType = 'O'.charCodeAt(0)
  // Execute Conversion operation
  result = clt.Conversion(expression, code, conversionType, "", 60)
  // Extract data from string result and print
  output = process_result('Conversion', result)
  if (output['lstError'].length == 0) {
    lstConversion = output['lstConversion'];
    console.log("Arguments result -> " + lstConversion)
  } else {
    console.log(output['lstError'])
    console.log("Error while conversion")
  }

  /////////////////
  // LkFormat
  /////////////////
  console.log("-- LkFormat --")
  console.log("--------")
  
  var formatSpec = "R%10"
  var expression = "HELLO"
  // Execute Format operation
  result = clt.Format(expression, formatSpec, "", 60)
  // Extract data from string result and print
  output = process_result('Format', result)
  if (output['lstError'].length == 0) {
    lstFormat = output['lstFormat'];
    console.log("Format result -> " + lstFormat)
  } else {
    console.log(output['lstError'])
    console.log("Error while conversion")
  }


  /////////////////
  // LkExecute
  /////////////////
  console.log("-- LkExecute --")
  console.log("--------")
  
  var statement = "WHO"
  // Run Execute operation
  result = clt.Execute(statement, "", 60)
  // Extract data from string result and print
  output = process_result('Execute', result)
  if (output['lstError'].length == 0) {
    lstReturning = output['lstReturning'];
    console.log("Execute returning result -> " + lstReturning)
    lstCapturing = lstCapturing = output['lstCapturing'];
    console.log("Execute capturing result -> " + lstCapturing)
  } else {
    console.log(output['lstError'])
    console.log("Error while conversion")
  }

  /////////////////
  // LkDictionaries
  /////////////////
  console.log("-- LkDictionaries --")
  console.log("--------")

  // Execute Dictionaries operation
  result = clt.Dictionaries(filename, "", 60)
  // Extract data from string result and print
  output = process_result('Dictionaries', result)
  if (output['lstError'].length == 0) {
    console.log("Dictionaries is OK!")
    lstRecordIds = output['lstRecordIds']
    lstRecord = output['lstRecord']
    if (lstRecordIds.length > 0) {
      console.log("--> Data Contents")
      for (i = 0; i < lstRecordIds.length; i++) {
        console.log("Id:" + lstRecordIds[i] + " Data:" + lstRecord[i])
      }
    }
  } else {
    console.log(output['lstError'])
    console.log("Error while Dictionaries")
  }



  /////////////////
  // LkSelect
  /////////////////
  console.log("-- LkSelect --")
  console.log("--------")
  // Create Select operation options
  var selectOptions = new LinkarFunctions.SelectOptions(false, false, 0, 0, true, false, false, false);

  var selectClause = ""
  var sortClause = "BY ID"
  var dictClause = ""
  var preSelectClause = ""
  // Execute Select operation
  result = clt.Select(filename, selectClause, sortClause, dictClause, preSelectClause, selectOptions, "", 600)
  // Extract data from string result and print
  output = process_result('Select', result)
  if (output['lstError'].length == 0) {
    console.log("Select is OK!")
    lstRecordIds = output['lstRecordIds']
    lstRecord = output['lstRecord']
    if (lstRecordIds.length > 0) {
      console.log("--> Data Contents")
      for (i = 0; i < lstRecordIds.length; i++)
        console.log("Id:" + lstRecordIds[i] + " Data:" + lstRecord[i])
    }
  } else {
    console.log(output['lstError'])
    console.log("Error while conversion")
  }

  /////////////////
  // LkSchemas
  /////////////////
  console.log("-- LkSchemas --")
  console.log("--------")
  
  // Create LkSchemas operation options
  var lkSchemasOptions = new LinkarFunctions.LkSchemasOptions();
  // Execute LkSchemas operation
  result = clt.LkSchemas(lkSchemasOptions, "", 600)
  // Extract data from string result and print
  output = process_result('Schemas', result)
  if (output['lstError'].length == 0) {
    console.log("Schemas is OK!")

    lstRecordIds = output['lstRecordIds']
    lstRecord = output['lstRecord']
    if (lstRecordIds.length > 0) {
      console.log("--> Data Contents")
      for (i = 0; i < lstRecordIds.length; i++)
        console.log("Id:" + lstRecordIds[i] + " Data:" + lstRecord[i])
    }


  } else {
    console.log(output['lstError'])
    console.log("Error while conversion")
  }

  /////////////////
  // LkProperties
  /////////////////
  console.log("-- LkProperties --")
  console.log("--------")

  // Create LkProperties operation options
  var lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions();
  filename = "LK.ORDERS"
  // Execute LkProperties operation
  result = clt.LkProperties(filename, lkPropertiesOptions, "", 600)
  // Extract data from string result and print
  output = process_result('Properties', result)
  if (output['lstError'].length == 0) {
    console.log("Properties is OK!")

    lstRecordIds = output['lstRecordIds']
    lstRecord = output['lstRecord']
    if (lstRecordIds.length > 0) {
      console.log("--> Data Contents")
      for (i = 0; i < lstRecordIds.length; i++) {
        console.log("Id:" + lstRecordIds[i] + " Data:" + lstRecord[i])
      }
    }
  } else {
    console.log(output['lstError'])
    console.log("Error while conversion")
  }

  /////////////////
  // LkResetCommonBlocks
  /////////////////
  console.log("-- LkResetCommonBlocks --")
  console.log("--------")
  
  // Execute ResetCommonBlocks operation
  result = clt.ResetCommonBlocks("", 600)
  // Extract data from string result and print
  output = process_result('ResetCommonBlocks', result)

  if (output['lstError'].length == 0) {
    lstReturning = output['lstReturning'];
    console.log("ResetCommonBlocks returning result -> " + lstReturning)
    lstCapturing = lstCapturing = output['lstCapturing'];
    console.log("ResetCommonBlocks capturing result -> " + lstCapturing)
  } else {
    console.log(output['lstError'])
    console.log("Error while ResetCommonBlocks")
  }


  /////////////////
  // LkLogout
  /////////////////
  console.log("-- LkLogout --")
  console.log("--------")
  
  // Execute Logout operation
  result = clt.Logout("", 600)

  console.log("Demo OK!")

}
catch (err) {
  console.log("ERROR: " + err);
}