/*
	enum: ROWHEADERS_TYPE
		Include headings in first row MAINLABEL (main headings), SHORTLABEL (short label headings), and NONE (without headings).
		
		Used by <LkSchemasOptions>, <LkPropertiesOptions> and <TableOptions>
		
	Defined constants of ROWHEADERS_TYPE:
	
	MAINLABEL - 0x01
	SHORTLABEL - 0x02
	NONE - 0x03
*/
const ROWHEADERS_TYPE = {
    MAINLABEL: 0x01,
	SHORTLABEL: 0x02,
	NONE: 0x03,
  }

module.exports = { ROWHEADERS_TYPE }
