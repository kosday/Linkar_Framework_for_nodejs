var ffi = require('ffi');
var ref = require('ref');

class LinkarCLib {
	constructor() {
		//var path_linkarStringsHelper = (process.platform === 'linux' ? './DLL/x64/Linkar.Strings.Helper' : './Linkar/DLL/x64/Linkar.Strings.Helper');
		//var path_linkarFunctions = (process.platform === 'linux' ? './DLL/x64/Linkar.Functions' : './Linkar/DLL/x64/Linkar.Functions');
		//var path_linkar = (process.platform === 'linux' ? './DLL/x64/Linkar' : './Linkar/DLL/x64/Linkar');

		var currentPath = (process.platform === 'linux' ? __dirname.replace(/\\/g, "/") + "/DLL/x64/" : __dirname.replace(/\\/g, "/") + "/DLL/x64/" );

		var path_linkarStringsHelper = currentPath + 'Linkar.Strings.Helper';
		var path_linkarFunctions = currentPath + 'Linkar.Functions';
		var path_linkar = currentPath + 'Linkar';

		this.lib_linkarStringsHelper = ffi.Library(path_linkarStringsHelper, {})
		this.lib_linkar = ffi.Library(path_linkar, {
			'LkExecutePersistentOperation': ['char*', ['pointer', 'pointer', 'uint8', 'string', 'uint8', 'uint8', 'uint32']],
			'LkExecuteDirectOperation': ['char*', ['pointer', 'string', 'uint8', 'string', 'uint8', 'uint8', 'uint32']],
		});

		this.lib_linkarFunctions = ffi.Library(path_linkarFunctions, {
			'LkFreeMemory': ['void', ['char*']]
		});
	}
}

var linkar = new LinkarCLib();
var encoding = 'latin1';

class CredentialOptions {
	constructor(host, entrypoint, port, username, password, language, freeText) {
		this.Host = host;
		this.EntryPoint = entrypoint;
		this.Port = port;
		this.Username = username;
		this.Password = password;
		this.Language = language;
		this.FreeText = freeText;
	}

	toString() {
		var separator = '\u001C';
		return this.Host + separator +
			this.EntryPoint + separator +
			this.Port + separator +
			this.Username + separator +
			this.Password + separator +
			this.Language + separator +
			this.FreeText + separator;
	}
}

class ConnectionInfo {
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

class Linkar {

	/* Linkar Functions */

	LkFreeMemory(lkString) {
		linkar.lib_linkarFunctions.LkFreeMemory(lkString)
	}

	/* Utils (Not from C) */

	LkAllocateBuffer(input_buffer) {
		var output_buffer = Buffer.alloc(input_buffer.length, 0)
		input_buffer.copy(output_buffer, 0);
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

	LkExecuteDirectOperation(credentialOptions, operationCode, operationArgs, inputDataFormat, outputDataFormat, receiveTimeout) {
		var pointer = ref.alloc(ref.types.CString);
		var pOperationArgs = this.LkAllocateBuffer(Buffer.from(operationArgs, encoding))
		var ret_cxx_value = linkar.lib_linkar.LkExecuteDirectOperation(pointer, credentialOptions.toString(), operationCode, pOperationArgs, inputDataFormat, outputDataFormat, receiveTimeout)

		if (!ref.isNull(ret_cxx_value)) {
			return this.LkCloneAndFree(ret_cxx_value, true).toString(encoding);
		}
		else {
			var errPointer = ref.readPointer(pointer, 0, pointer.length)
			throw this.LkCloneAndFree(errPointer, true).toString(encoding);
		}
	}

	LkExecutePersistentOperation(connectionInfo, operationCode, operationArgs, inputDataFormat, outputDataFormat, receiveTimeout) {
		var pointer = ref.alloc(ref.types.CString);
		var pOperationArgs = this.LkAllocateBuffer(Buffer.from(operationArgs, encoding))
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
