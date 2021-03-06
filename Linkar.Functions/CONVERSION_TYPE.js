/*
	enum: CONVERSION_TYPE
	The conversion type for LkConversion functions.
	
	There are 2 possible options:
	
		ICONV - Perform ICONV type conversions. 
		OCONV - Perform OCONV type conversions. 
	
	Defined constants of CONVERSION_TYPE:
	
		ICONV - 'I'
		OCONV - 'O'
*/
const CONVERSION_TYPE = {
    INPUT: 1,
    OUTPUT: 2
  }

  module.exports = { CONVERSION_TYPE }