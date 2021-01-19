////////////////
// Library Links
////////////////
var Linkar = require('linkar_framework/Linkar/Linkar')
var LinkarFunctions = require("linkar_framework/Linkar.Functions/LinkarFunctions");
var LinkarFunctionsPersistentMV = require("linkar_framework/Linkar.Functions.Persistent.MV/LinkarClient")
var LinkarStrings = require("linkar_framework/Linkar.Strings/StringFunctions")
var LinkarData = require("linkar_framework/Linkar.LkData/LinkarData")


////////////////
// Auxiliary functions
////////////////
function PrintErrors(errors)
{
    errors.forEach(error => console.log(LinkarStrings.StringFunctions.FormatError(error)));
}

function PrintRecord(lkItem)
{
    console.log("RecordId: " + lkItem.RecordId + " Record:" + lkItem.Record);
}

function PrintRecords(lkItems)
{
    lkItems.forEach(lkItem => PrintRecord(lkItem));
}

////////////////
// Demo
////////////////

console.log("Demo start");

try {
	// Create credentials
	var crdOpt = new Linkar.CredentialOptions(
		"192.168.100.101",		// Linkar Server IP or Hostname
		"QMEP1",			// EntryPoint Name
		11301,				// Linkar Server EntryPoint port
		"admin",				// Linkar Server Username
		"admin",			// Linkar Server Username Password
		"",					// Language
		"Test Node.js");		// Free text

	// Create Linkar Client
	var lkClt = new LinkarFunctionsPersistentMV.LinkarClient(60);
	// Execute Login operation
	lkClt.Login(crdOpt);
	// In this demo we are going to work with the LK.CUSTOMERS file
	var filename = "LK.CUSTOMERS";

	// Create RECORD list with dictionaries
	console.log("NEW OPERATION (NEW98 and NEW)");
	var lstLkRecords = new LinkarData.LkItems(["ID"], ["NAME", "ADDRRESS"]);

	// Create RECORD1 from original data
	var record1 = "CUSTOMER NEW98" + LinkarFunctions.DBMV_Mark.AM_str + "ADDRESS NEW98" + LinkarFunctions.DBMV_Mark.AM_str + "998 - 998 - 998";
	var lkRecord1 = new LinkarData.LkItem("NEW98", record1);
	// Add RECORD1 to the list
	lstLkRecords.push(lkRecord1);

	// Create empty RECORD2
	var lkRecord2 = new LinkarData.LkItem("NEW99");
	// Add RECORD2 to the list
	lstLkRecords.push(lkRecord2);
	// Fill his properties using dictionaries
	lkRecord2.set("CUSTOMER NEW99", "NAME"); // Attribute 1 value
	lkRecord2.set("ADDRESS NEW99", "ADDRRESS", 1); // Attribute 2, Multivalue 1
	lkRecord2.set("STATE COUNTRY", "ADDRRESS", 2); // Attribute 2, Multivalue 2
	// Fill property using attribute number
	lkRecord2.set("999 - 999 - 999", 3); // Attribute3 value

	// Generate New operation buffer from list
	var records = lstLkRecords.ComposeNewBuffer();
	// Create New operation options
	var newOptions = new LinkarFunctions.NewOptions(null, true, false, false, false, true); // ReadAfter and OriginalRecords
	// Execute New operation
	var newResult = lkClt.New(filename, records, newOptions);
	// Create LkDataCRUD complex object from operation result string
	var lkData = new LinkarData.LkDataCRUD(newResult);
	// Print result
	console.log("TOTAL RECORDS: " + lkData.TotalItems);
	PrintErrors(lkData.Errors);
	PrintRecords(lkData.LkRecords);

	// You can extract records from list
	lkRecord1 = lkData.LkRecords.get("NEW98");
	// Or delete them from the list.
	lkData.LkRecords.removeId("NEW98");

	// After CRUD Operation we always get real dictionaries
	// You can modify values from list using these dictionaries
	lkData.LkRecords.get("NEW99").set("CUSTOMER UPDATE99", "NAME");
	lkData.LkRecords.get("NEW99").set("ADDRESS UPDATE 99", "ADDR");
	lkData.LkRecords.get("NEW99").set("(1) 999 - 999 - 999", "PHONE");

	console.log("");
	// Next step a Update
	console.log("UPDATE OPERATION (NEW99)");
	// With the optimistic lock you will avoid modifying records that have been previously modified by another user.
	var OptimisticLockControl = true;
	// Create Update operation options
	var updateOptions = new LinkarFunctions.UpdateOptions(OptimisticLockControl, true, false, false, false, true); // OptimisticLockControl, ReadAfter and OriginalRecords  
	// Generate Update operation buffer from list      
	records = lkData.LkRecords.ComposeUpdateBuffer(OptimisticLockControl);
	// Execute Update operation
	var updateResult = lkClt.Update(filename, records, updateOptions);
	// Create LkDataCRUD complex object from operation result string
	lkData = new LinkarData.LkDataCRUD(updateResult);
	// Print result
	PrintErrors(lkData.Errors);
	PrintRecords(lkData.LkRecords);

	console.log("");
	// Next step a Read
	console.log("READ OPERATION (NEW98 and NEW99)");
	// Generate Read operation buffer
	var recordIds = LinkarStrings.StringFunctions.ComposeRecordIds(["NEW98", "NEW99"]);
	// Create Read operation options
	var readOptions = new LinkarFunctions.ReadOptions(false, false, false, OptimisticLockControl);
	// Execute Read operation
	var readResult = lkClt.Read(filename, recordIds, "", readOptions);
	// Create LkDataCRUD complex object from operation result string
	var lkDataRead = new LinkarData.LkDataCRUD(readResult);
	// Print result
	console.log("TOTAL RECORDS: " + lkDataRead.TotalItems);
	// Here are different ways to access the records.
	// With position
	lkRecord1 = lkDataRead.LkRecords[0];
	PrintRecord(lkRecord1);
	// Or with ID
	lkRecord2 = lkDataRead.LkRecords.get("NEW99");
	PrintRecord(lkRecord2);
	// Now different ways to access the content of a record
	// Extract ID from his property
	var id = lkRecord2.RecordId;
	console.log("record2.RecordId: " + id);
	// Extract ID using his dictionary
	id = lkRecord2.get("ID");
	console.log("record2[\"ID\"]: " + id);
	// Get NAME attribute with his dictionary
	var name = lkRecord2.get("NAME");
	console.log("record2[\"NAME\" , 1]: " + name);
	// Get ADDR attribute first multivalue with his dictionary
	var addressLine1 = lkRecord2.get("ADDR", 1);
	console.log("record2[\"ADDR\" , 2]: " + addressLine1);
	// Get ADDR attribute second multivalue with his dictionary
	var addressLine2 = lkRecord2.get("ADDR", 2);
	console.log("record2[\"ADDR\" , 2]: " + addressLine2);
	// Get the first record NAME attribute with his dictionary
	name = lkDataRead.LkRecords[1].get("NAME");
	console.log("lkReadResult.LkRecords[1][\"NAME\"]: " + name);

	console.log("");
	// Next step a Delete
	console.log("DELETE OPERATION (NEW98 and NEW99)");
	// With the optimistic lock you will avoid deleting records that have been previously modified by another user
	OptimisticLockControl = true;
	// Create Delete operation options
	var deleteOptions = new LinkarFunctions.DeleteOptions(OptimisticLockControl);
	// Insert RECORD1 to the list, you had previously deleted it
	lkData.LkRecords.push(lkRecord1);
	// Generate Delete operation buffer
	records = lkData.LkRecords.ComposeDeleteBuffer(OptimisticLockControl);
	// Execute Delete operation
	var deleteResult = lkClt.Delete(filename, records, deleteOptions);
	// Create LkDataCRUD complex object from operation result string
	lkData = new LinkarData.LkDataCRUD(deleteResult);
	// Print result
	PrintErrors(lkData.Errors);
	PrintRecords(lkData.LkRecords);

	console.log("");
	// Next step a Subroutine
	console.log("SUBROUTINE OPERATION");
	// Generate Subroutine operation buffer
	var subArgs = LinkarStrings.StringFunctions.ComposeSubroutineArgs(["0", "aaaaaaa", ""]);
	// Execute Subroutine operation
	var subroutineResult = lkClt.Subroutine("SUB.DEMOLINKAR", 3, subArgs);
	// Create LkDataSubroutine complex object from operation result string
	var lkDataSubroutine = new LinkarData.LkDataSubroutine(subroutineResult);
	// Print result
	PrintErrors(lkDataSubroutine.Errors);
	var i;
	for (i = 0; i < lkDataSubroutine.Arguments.length; i++)
		console.log("Arg " + (i + 1) + " " + lkDataSubroutine.Arguments[i]);

	console.log("");
	// Next step a Execute
	console.log("EXECUTE WHO");
	// Execute WHO database command
	var executeResult = lkClt.Execute("WHO");
	// Create LkDataExecute complex object from operation result string
	var lkDataExecute = new LinkarData.LkDataExecute(executeResult);
	// Print result
	PrintErrors(lkDataExecute.Errors);
	console.log("CAPTURING: " + lkDataExecute.Capturing);
	console.log("RETURNING: " + lkDataExecute.Returning);

	// Execute Logout operation
	lkClt.Logout("",0);

	console.log("Demo OK!");
}
catch (err) {
  console.log("ERROR: " + err);
}