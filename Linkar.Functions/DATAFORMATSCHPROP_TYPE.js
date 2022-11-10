/*
	enum: DATAFORMATSCHPROP_TYPE
	Specify the output formats of LkSchemas and LkProperties operations.
	Used only by LkSchemas and LkProperties functions.
	There are 4 possible options: MV, XML, JSON and TABLE.
		
	Defined constants of DATAFORMATSCHPROP_TYPE:
	
		MV - 0x01
		XML - 0x02
		JSON - 0x03
		TABLE - 0x04
		XML_DICT - 0x05
		XML_SCH - 0x06
		JSON_DICT - 0x07
		JSON_SCH - 0x08
*/
const DATAFORMATSCHPROP_TYPE = {
    MV: 0x01,
	XML: 0x02,
	JSON: 0x03,
	TABLE: 0x04,
    XML_DICT: 0x05,
	XML_SCH: 0x06,
	JSON_DICT: 0x07,
	JSON_SCH: 0x08
  }

  module.exports = { DATAFORMATSCHPROP_TYPE }