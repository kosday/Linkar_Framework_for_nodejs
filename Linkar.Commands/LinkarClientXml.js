const ENVELOPE_FORMAT = require('./ENVELOPE_FORMAT')
const LinkarClient = require("./LinkarClient")

class LinkarClientXml {

    constructor(receiveTimeout = 0)
    {
        this.linkarClient = new LinkarClient.LinkarClient(receiveTimeout);
    }

    Login(credentialOptions, customVars = "", receiveTimeout = 0)
    {
        return this.linkarClient.Login(credentialOptions, customVars, receiveTimeout)
    }

    Logout(customVars = "", receiveTimeout = 0)
    {
        return this.linkarClient.Logout(customVars, receiveTimeout)
    }

    SendCommand(command, receiveTimeout = 0) {
        return SendCommand(command, ENVELOPE_FORMAT.ENVELOPE_FORMAT.XML, receiveTimeout = 0);
    }
}

module.exports = { LinkarClientXml }