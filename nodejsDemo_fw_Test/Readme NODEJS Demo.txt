This demo shows how a persistent client works from a Node.js script.
This demo was tested in Linux and Windows Node.js v.10.13.0

You also have to edit "Demo.js" and "LkDataDemo.js" files and adjust the parameters in order to login to Linkar:

  // Create credentials
  var crdOpt = new Linkar.CredentialOptions(
    "127.0.0.1",				// Linkar Server IP or Hostname
    "EP_NAME",			        // EntryPoint Name
    11300,				        // Linkar Server EntryPoint port
    "admin",				    // Linkar Server Username
    "admin",			        // Linkar Server Username Password
    "",					        // Language
    "Test Node.js")		    	// Free text

From Node.js console, resolve the dependencies with the command:
npm install

And run the demos from Node.js console with next command:
node Demo.js
node LkDataDemo.js

Latest updates and Source code on https://github.com/kosday/Linkar-v2-with-node.JS