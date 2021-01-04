const ENVELOPE_FORMAT = require('./ENVELOPE_FORMAT')
const Functions = require("./Functions")

class JsonCommands {

    static SendCommand(credentialOptions, command, receiveTimeout = 0) {
        return Functions.SendCommand(credentialOptions, command, ENVELOPE_FORMAT.ENVELOPE_FORMAT.JSON, receiveTimeout );
    }
}

module.exports = { JsonCommands }