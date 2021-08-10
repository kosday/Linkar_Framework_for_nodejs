var ffi = require('ffi');
var ref = require('ref');

class LinkarCLib {
	constructor() {

		var arch = process.arch;
		if(arch == "x64" || arch == "x32")
		{
			var currentPath = (process.platform === 'linux' ? __dirname.replace(/\\/g, "/") + "/linux.so/" + arch + "/" : __dirname.replace(/\\/g, "/") + "/DLL/" + arch + "/" );		
			var path_linkar = currentPath + 'Linkar';	
			this.lib_linkar = ffi.Library(path_linkar, {
				'LkExecutePersistentOperation': ['char*', ['pointer', 'pointer', 'uint8', 'string', 'uint8', 'uint8', 'uint32']],
				'LkExecuteDirectOperation': ['char*', ['pointer', 'string', 'uint8', 'string', 'uint8', 'uint8', 'uint32']],
				'LkFreeMemory': ['void', ['char*']]
			});
		}
		else
		{
			console.log("ERROR: Invalid " + arch + " architecture");
		}
	}
}

var linkar = new LinkarCLib();
var encoding = 'latin1';

/*
	Class: CredentialOptions
		Contains the necessary information to connect to the Database.

		Property: Host (string)
			Address or hostname where Linkar Server is listening.
			
		Property: EntryPoint (string)
			The EntryPoint Name defined in Linkar Server.
			
		Property: Port (number)
			Port number where the EntryPoint keeps listening.
			
		Property: Username (string)
			Linkar Server username.
			
		Property: Password (string)
			Password of the Linkar Server user.
			
		Property: Language (string)
			Used to make the database routines know in which language they must answer. The Error messages coming from the Database are in English by default, but you can customize

		Property: FreeText (string)
			Free text that will appear in the Linkar MANAGER to identify in an easy way who is making the petition. For example if the call is made from a ERP, here we can write "MyERP".
			
		Property: PluginId (string)
			Internal ID for plugin to enable its use in Linkar Server. Used by Plugin developers.
*/
class CredentialOptions {
	
	/*
		Constructor: constructor
			Initializes a new instance of the CredentialOptions class
			
		Arguments:
			host - Address or hostname where Linkar Server is listening.
			entrypoint - The EntryPoint Name defined in Linkar Server.
			port - Port number where the EntryPoint keeps listening.
			username - Linkar Server username.
			password - Password of the Linkar Server user.
			language - Used to make the database routines know in which language they must answer. The Error messages coming from the Database are in English by default, but you can customize.
			freeText - Free text that will appear in the Linkar MANAGER to identify in an easy way who is making the petition. For example if the call is made from a ERP, here we can write "MyERP".
			pluginId - Internal ID for plugin to enable its use in Linkar Server. Used by Plugin developers.
	*/
	constructor(host, entrypoint, port, username, password, language = "", freeText = "", pluginId = "") {
		this.Host = host;
		this.EntryPoint = entrypoint;
		this.Port = port;
		this.Username = username;
		this.Password = password;
		this.Language = language;
		this.FreeText = freeText;
		this.PluginId = pluginId;
	}

	toString() {
		var separator = '\u001C';
		return this.Host + separator +
			this.EntryPoint + separator +
			this.Port + separator +
			this.Username + separator +
			this.Password + separator +
			this.Language + separator +
			this.FreeText + separator +
			this.PluginId;
	}
}

/*
	Class: ConnectionInfo
		Contains the necessary information to stablished a permanent session with LinkarSERVER. Used by Login operation and Permanent operations.
*/
class ConnectionInfo {
	
	/*
		Constructor: constructor
			Initializes a new instance of the CredentialOptions class
		
		Arguments:
			sessionId - A unique Identifier for the stablished session in LinkarSERVER. This value is set after Login operation.
			lkConnectionId - Internal LinkarSERVER ID to keep the session. This value is set after Login operation.
			publicKey - The public key used to encrypt transmission data between LinkarCLIENT and LinkarSERVER. This value is set after Login operation.
			crdOptions - The CredentialOptions object with the necessary information to connect to the LinkarSERVER.

	*/
	constructor(sessionId, lkConnectionId, publicKey, crdOptions) {
		this.SessionId = sessionId;
		this.LkConnectionId = lkConnectionId;
		this.PublicKey = publicKey;
		this.CredentialOptions = crdOptions;
		this.ReceiveTimeout = 0;
	}

	fromString(str) {
		var separator = '\u001C';
		var arr = str.split(separator);
		this.CredentialOptions = new CredentialOptions(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]);
		this.SessionId = arr[8];
		this.LkConnectionId = arr[9];
		this.PublicKey = arr[10];
		this.ReceiveTimeout = arr[11];
	}

	toString() {
		var separator = '\u001C';
		return this.CredentialOptions.toString() + separator +
			this.SessionId + separator +
			this.LkConnectionId + separator +
			this.PublicKey + separator +
			this.ReceiveTimeout;
	}
}

/*
	Class: Linkar
		Class with two static functions to perform Direct and Persistent operation with Linkar Server
*/
class Linkar {

	/* Linkar Functions */

	LkFreeMemory(lkString) {
		linkar.lib_linkar.LkFreeMemory(lkString)
	}

	/* Utils (Not from C) */

	LkAllocateBuffer(input_buffer) {
		var output_buffer = Buffer.alloc(input_buffer.length, 0)
		input_buffer.copy(output_buffer, 0);
		return output_buffer
	}

	LkAllocateInputBuffer(input_buffer) {
		var output_buffer = Buffer.alloc(input_buffer.length + 1, 0)
		input_buffer.copy(output_buffer, 0);
		output_buffer[input_buffer.length] = 0;
		return output_buffer
	}

	LkCloneAndFree(ret_cxx_value, free) {
		var buff = ref.reinterpretUntilZeros(ret_cxx_value, 1)
		var output_buffer = this.LkAllocateBuffer(buff);

		if (free)
			this.LkFreeMemory(ret_cxx_value);
		return output_buffer;
	}

	/* Linkar */

	/*
		Function:	LkExecuteDirectOperation
			Execute "direct operations". These operations don't stablish a permanent session. Once the operations is finished, the session is closed.
		
		Arguments:
			credentialOptions - (<CredentialOptions>) The credentials for access to LinkarSERVER.
			operationCode - (<OPERATION_CODE>) Code of the operation to be performed.
			operationArgs - (string) Specific arguments of every operation.
			inputDataFormat - (number <DATAFORMAT_TYPE>, <DATAFORMATCRU_TYPE> or <DATAFORMATSCH_TYPE>) Format of the input data.
			outputDataFormat - (number <DATAFORMAT_TYPE>, <DATAFORMATCRU_TYPE> or <DATAFORMATSCH_TYPE>) Format of the output data.
			receiveTimeout - (number) Maximum time in seconds to wait the response from LinkarSERVER. A value less or equal to 0, wait for response indefinitely.
			
		Returns:
			Complex string with the result of the operation.
	*/
	LkExecuteDirectOperation(credentialOptions, operationCode, operationArgs, inputDataFormat, outputDataFormat, receiveTimeout) {
		var pointer = ref.alloc(ref.types.CString);
		var pOperationArgs = this.LkAllocateInputBuffer(Buffer.from(operationArgs, encoding))
		var ret_cxx_value = linkar.lib_linkar.LkExecuteDirectOperation(pointer, credentialOptions.toString(), operationCode, pOperationArgs, inputDataFormat, outputDataFormat, receiveTimeout)

		if (!ref.isNull(ret_cxx_value)) {
			return this.LkCloneAndFree(ret_cxx_value, true).toString(encoding);
		}
		else {
			var errPointer = ref.readPointer(pointer, 0, pointer.length)
			throw this.LkCloneAndFree(errPointer, true).toString(encoding);
		}
	}

	/*
		Function:	LkExecutePersistentOperation
			Execute "persistent operations". These operations required that a session will be stablished previously with Login operation.
		
		Arguments:
			connectionInfo - (<ConnectionInfo>) Contains the data necessary to access an established LinkarSERVER session.
			operationCode - (<OPERATION_CODE>) Code of the operation to be performed.
			operationArgs - (string) Specific arguments of every operation.
			inputDataFormat - (number <DATAFORMAT_TYPE>, <DATAFORMATCRU_TYPE> or <DATAFORMATSCH_TYPE>) Format of the input data.
			outputDataFormat - (number <DATAFORMAT_TYPE>, <DATAFORMATCRU_TYPE> or <DATAFORMATSCH_TYPE>) Format of the output data.
			receiveTimeout - (number) Maximum time in seconds to wait the response from LinkarSERVER. A value less or equal to 0, wait for response indefinitely.
			
		Returns:
			Complex string with the result of the operation.
	*/
	LkExecutePersistentOperation(connectionInfo, operationCode, operationArgs, inputDataFormat, outputDataFormat, receiveTimeout) {
		var pointer = ref.alloc(ref.types.CString);
		var pOperationArgs = this.LkAllocateInputBuffer(Buffer.from(operationArgs, encoding))
		var pointerConnInfo = ref.alloc(ref.types.CString, connectionInfo.toString())
		var ret_cxx_value = linkar.lib_linkar.LkExecutePersistentOperation(pointer, pointerConnInfo, operationCode, pOperationArgs, inputDataFormat, outputDataFormat, receiveTimeout)
		
		if (!ref.isNull(ret_cxx_value)) {
			var ciPointer = ref.readPointer(pointerConnInfo, 0, pointerConnInfo.length)
			var connectionInfoStr = this.LkCloneAndFree(ciPointer, (operationCode == 1)).toString(encoding) // Only Free if operationCode is LOGIN
			connectionInfo.fromString(connectionInfoStr);
			return this.LkCloneAndFree(ret_cxx_value, true).toString(encoding);
		}
		else {
			var errPointer = ref.readPointer(pointer, 0, pointer.length)
			throw this.LkCloneAndFree(errPointer, true).toString(encoding);
		}
	}
}

module.exports = { Linkar, CredentialOptions, ConnectionInfo }
