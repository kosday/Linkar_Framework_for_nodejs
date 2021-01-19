/*
	enum: SCHEMA_TYPE
		The schemas type for <LkSchemasOptions>, <LkPropertiesOptions> and <TableOptions> functions
		
	Defined constants of SCHEMA_TYPE:
	
	LKSCHEMAS - 0x01
	DICTIONARIES - 0x02
	NONE - 0x03
*/
const SCHEMA_TYPE = {
    LKSCHEMAS: 0x01,
	DICTIONARIES: 0x02,
	NONE: 0x03,
  }

module.exports = { SCHEMA_TYPE }