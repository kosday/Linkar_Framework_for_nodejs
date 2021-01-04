/*//var lkfw = require('linkar_framework')
var Linkar = require('linkar_framework/Linkar/Linkar')
var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
//var LinkarFunctionsDirect = require("./Linkar.Functions.Direct/DirectFunctions")
//var LinkarFunctionsDirectMV = require("./Linkar.Functions.Direct.MV/Functions")
//var LinkarFunctionsPersistent = require("./Linkar.Functions.Persistent/LinkarClient")
var LinkarFunctionsPersistentMV = require("linkar_framework/Linkar.Functions.Persistent.MV/LinkarClient")
var LinkarStrings = require("linkar_framework/Linkar.Strings/StringFunctions")


var readOptions = new LinkarFunctions.ReadOptions(true, false, true, false);
var crdOpt = new Linkar.CredentialOptions(
    "192.168.100.100",		// Linkar Server IP or Hostname
    "QMWINQ",			// EntryPoint Name
    11300,				// Linkar Server EntryPoint port
    "admin",				// Linkar Server Username
    "1234",			// Linkar Server Username Password
    "",					// Language
    "Test Node.js")		// Free text

//DIRECT
//var lkString = LinkarFunctionsDirect.DirectFunctions.Read(crdOpt, "LK.CUSTOMERS", "1", "", readOptions, 0x01, 0x01, "", 60)

//DIRECT.MV
//var lkString = LinkarFunctionsDirectMV.Functions.Read(crdOpt, "LK.CUSTOMERS", "1", "", readOptions, "", 60)


//PERSISTENT
//var clt = new LinkarFunctionsPersistent.LinkarClient();
//var sessionId = clt.Login(crdOpt);
//var lkString = clt.Read("LK.CUSTOMERS", "1", "", readOptions, 0x01, 0x01, "", 60)

//PERSISTENT.MV
var clt = new LinkarFunctionsPersistentMV.LinkarClient();
var sessionId = clt.Login(crdOpt);
var lkString = clt.Read("LK.CUSTOMERS", "1", "", readOptions, "", 60)

var records = LinkarStrings.StringFunctions.ExtractRecords(lkString);
console.log(records);

//console.log(lkfw)
//console.log("Adios")*/