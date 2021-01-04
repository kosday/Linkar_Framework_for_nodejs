var Linkar = require('linkar_framework/Linkar/Linkar')
var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
var LinkarFunctionsPersistentMV = require("linkar_framework/Linkar.Functions.Persistent.MV/LinkarClient")
var LinkarStrings = require("linkar_framework/Linkar.Strings/StringFunctions")

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
  var crdOpt = new Linkar.CredentialOptions(
    "192.168.100.100",		// Linkar Server IP or Hostname
    "QMWINQ",			        // EntryPoint Name
    11300,				        // Linkar Server EntryPoint port
    "admin",				      // Linkar Server Username
    "1234",			          // Linkar Server Username Password
    "",					          // Language
    "Test Node.js")		    // Free text

  console.log("PORT: " + crdOpt.Port)

  var clt = new LinkarFunctionsPersistentMV.LinkarClient();
  var sessionId = clt.Login(crdOpt, "", 600);
  console.log("SessionId:" + sessionId)

  ////////////////
  // LkNew
  ////////////////
  console.log("-- LkNew --")
  console.log("--------")
  var filename = 'LK.CUSTOMERS'
  var strNewId = 'A90'
  var strNewRecord = 'CUSTOMER 99' + LinkarFunctions.DBMV_Mark.AM_str + 'ADDRESS 99' + LinkarFunctions.DBMV_Mark.AM_str + '999 - 999 - 99'
  var newBuffer = LinkarStrings.StringFunctions.ComposeNewBuffer(strNewId, strNewRecord)
  var newOptions = new LinkarFunctions.NewOptions(new LinkarFunctions.RecordIdType(), true, false, false, false, false);
  var result = clt.New(filename, newBuffer, newOptions, "", 60)
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
  result = LinkarFunctions.MvOperations.LkExtract(strRecord, 1)
  console.log(result)

  /////////////////
  // LkReplace
  /////////////////
  console.log("-- LkReplace --")
  console.log("--------")
  var replaceVal = "UPDATED CUSTOMER"
  result = LinkarFunctions.MvOperations.LkReplace(strRecord, replaceVal, 1)
  console.log(result)

  /////////////////
  // LkChange
  /////////////////
  console.log("-- LkChange --")
  console.log("--------")
  result = LinkarFunctions.MvOperations.LkChange(strRecord, "9", "8")
  console.log(result)

  /////////////////
  // LkCount
  /////////////////
  console.log("-- LkCount --")
  console.log("--------")
  result = LinkarFunctions.MvOperations.LkCount(strRecord, LinkarFunctions.DBMV_Mark.AM)
  console.log(result)

  /////////////////
  // LkDCount
  /////////////////
  console.log("-- LkDCount --")
  console.log("--------")
  result = LinkarFunctions.MvOperations.LkDCount(strRecord, LinkarFunctions.DBMV_Mark.AM)
  console.log(result)

  /////////////////
  // LkUpdate
  /////////////////
  console.log("-- LkUpdate --")
  console.log("--------")

  var updateOptions = new LinkarFunctions.UpdateOptions(false, true, false, false, false, false);
  var updateBuffer = LinkarStrings.StringFunctions.ComposeUpdateBuffer(strNewId, strNewRecord)
  result = clt.Update(filename, updateBuffer, updateOptions, "", 60)

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
  var readOptions = new LinkarFunctions.ReadOptions(true, false, false, false);
  result = clt.Read(filename, strNewId, dictionaries, readOptions, "", 60)

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

  var deleteBuffer = LinkarStrings.StringFunctions.ComposeDeleteBuffer(strNewId)
  var deleteOptions = new LinkarFunctions.DeleteOptions(false, new LinkarFunctions.RecoverIdType());
  result = clt.Delete(filename, deleteBuffer, deleteOptions, "", 60)

  output = process_result('Delete', result)


  /////////////////
  // LkSubroutine
  /////////////////
  console.log("-- LkSubRoutine --")
  console.log("--------")

  var subroutineName = 'SUB.DEMOLINKAR'
  var args = LinkarStrings.StringFunctions.ComposeSubroutineArgs(["0", "qwerty", ""]);
  result = clt.Subroutine(subroutineName, 3, args, "", 60)

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

  result = clt.Conversion(expression, code, conversionType, "", 60)

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

  result = clt.Format(expression, formatSpec, "", 60)

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

  result = clt.Execute(statement, "", 60)

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

  result = clt.Dictionaries(filename, "", 60)

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
  var selectOptions = new LinkarFunctions.SelectOptions(false, false, 0, 0, true, false, false, false);

  var selectClause = ""
  var sortClause = "BY ID"
  var dictClause = ""
  var preSelectClause = ""

  result = clt.Select(filename, selectClause, sortClause, dictClause, preSelectClause, selectOptions, "", 600)

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

  var lkSchemasOptions = new LinkarFunctions.LkSchemasOptions();
  result = clt.LkSchemas(lkSchemasOptions, "", 600)

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

  var lkPropertiesOptions = new LinkarFunctions.LkPropertiesOptions();
  filename = "LK.ORDERS"

  result = clt.LkProperties(filename, lkPropertiesOptions, "", 600)

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
  result = clt.ResetCommonBlocks("", 600)
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
  result = clt.Logout("", 600)

  console.log("Demo OK!")

}
catch (err) {
  console.log("ERROR: " + err);
}