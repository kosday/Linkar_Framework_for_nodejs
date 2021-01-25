# Linkar_Framework_for_nodejs_BETA

Linkar Framework is a set of open-source libraries that allows developers to create their own applications that connect to the linked Linkar Server to access the different MV Data-bases.

Linkar Framework is made up of a total of 15 libraries. 14 of them are open source. Only one is private and delivered compiled. This private library basically has two functions; one is to execute Persistent operations and the other to execute Direct operations:

- Persistent operations require a session to be established and closed through “Login” and “Logout” operations. The connection credentials to Linkar Server are supplied in the "Log-in" operation. Once the session is established, any operation can be executed without having to re-supply credentials.
- Direct operations do not require a session to be established. The connection credentials must always be supplied to the Linkar Server with each operation.

These two "primitive" functions, allow developers to create CRUD applications and call MV Basic subroutines across the Linkar Server. Developing an application with just these two primitives would be very difficult and time expensive.

The other 14 libraries are open-source. Developers can always design their own new custom libraries in two different ways:

- Relying on open source libraries, and designing a new one from them.
- Modifying the open-source libraries to adapt them to the specific needs of their application.

These libraries provide functions that allow the MV type input and output buffers to be conveniently manipulated. One of them also allows "Commands" to be executed (operations cre-ated using templates in XML or JSON format) across the Linkar Server. 

These libraries help developers to create applications faster. Some of them are based on the two primitive ones. For example, there are libraries that allow operations with input and output data in XML or JSON format. There are also libraries that allow you to work with input and output data in a very similar format to an MV buffer.

Developers will find functions to synchronously and asynchronously execute operations, in all these libraries. Functions that work in asynchronous mode instead of returning an object of the "string" type, return an object of  "Task <string>" type. Asynchronous functions run on a different thread than the main one, allowing the main thread not have to wait until the end of the operation. (not in C Library)

Developers who want to create an application do not need to use all these libraries. They can just use the ones required for their purpose. The following section shows the hierarchy of the Linkar FRAMEWORK libraries that will help them select the  libraries needed in each case.


## Linkar Framework hierarchy

- Linkar (Private)
- Linkar.Functions (open-source) Dependencies: Linkar
- Linkar.Strings (open-source) Dependencies: Linkar
- Linkar.LkData (open-source) Dependencies: Linkar, Linkar.Strings, Linkar.Functions
- Linkar.Commands (open-source) Dependencies: Linkar
- Linkar.Functions.Direct (open-source) Dependencies: Linkar, Linkar.Functions
	- Linkar.Functions.Direct.JSON (open-source)
	- Linkar.Functions.Direct.MV (open-source)
	- Linkar.Functions.Direct.TABLE (open-source)
	- Linkar.Functions.Direct.XML (open-source)
- Linkar.Functions.Persistent (open-source) Dependencies: Linkar, Linkar.Functions
	- Linkar.Functions.Persistent.JSON (open-source)
	- Linkar.Functions.Persistent.MV (open-source)
	- Linkar.Functions.Persistent.TABLE (open-source)
	- Linkar.Functions.Persistent.XML (open-source)
