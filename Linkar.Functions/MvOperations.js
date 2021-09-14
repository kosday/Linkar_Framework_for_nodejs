var DBMV_Mark = require('./DBMV_Mark')

/*
	Class: MvOperations
		This class contains the basic functions to work with multivalue strings. These functions are locally executed.
*/
class MvOperations
{
	/*
		Function: LkDCount
			Counts the delimited substrings inside a string.
			
		Arguments:
			str - (string) Source string of delimited fields.
			delimiter - (string) The separator character(s) used to delimit fields in the string.
		
		Returns:
			number
			
			The number of occurrences found.
			
		Example:
		---Code
		int result = MvOperations.LkCount("CUSTOMER UPDATE 2þADDRESS 2þ444", "þ");		---
	*/
	static LkDCount(str, delimiter) {
		if (str == null || str.length == 0)
			return 0;
		else if (delimiter == null || delimiter.length == 0)
			return str.length;
		else
		{
			var parts = str.split(delimiter, -1);
			return parts.length;
		}
	}

	/*
		Function: LkCount
			Counts the occurrences of a substring inside a string.
			
		Arguments:
			str - (string) Source string of delimited fields.
			delimiter - (string) The separator character(s) used to delimit fields in the string.

		Returns:
			number
			
			The number of occurrences found.

		Example:
		---Code
		int result = MvOperations.LkDCount("CUSTOMER UPDATE 2þADDRESS 2þ444", "þ");
	*/
	static LkCount(str, delimiter) {
		if (str == null || str.length == 0)
			return 0;
		else if (delimiter == null || delimiter.length == 0)
			return str.length;
		else
		{
			return this.LkDCount(str, delimiter) - 1;
		}
	}

	/*
		Function: LkExtract
			Extracts a field, value or subvalue from a dynamic array.
			
		Arguments:
			str - (string) The source string from which data is extracted.
			field - (number) The position of the attribute to extract.
			value - (number) The multivalue position to extract.
			subvalue - (number) The subvalue position to extract.

		Returns:
			string
			
			A new string with the extracted value.

		Example:
		---Code
		string result = MvOperations.LkExtract("CUSTOMER UPDATE 2þADDRESS 2þ444", 1);
		---
		*/
	static LkExtract(str, field, value = 0, subvalue = 0) {
		var aux = "";
	
		if (field > 0)
		{
			var parts = str.split(DBMV_Mark.AM,-1);
			if (field <= parts.length)
				str = aux = parts[field - 1];
		}
	
		if (value > 0)
		{
			var parts = str.split(DBMV_Mark.VM,-1);
			if (value <= parts.length)
				str = aux = parts[value - 1];
		}
	
		if (subvalue > 0)
		{
			var parts = str.split(DBMV_Mark.SM,-1);
			if (subvalue <= parts.length)
				aux = parts[subvalue - 1];
		}
	
		return aux;
	}

/*
		Function: LkChange
			Replaces the occurrences of a substring inside a string, by other substring.
			
		Arguments:
			str - (string) The string on which the value is going to change.
			strOld - (string) The value to change. 
			strNew - (string) The new value.
			occurrence - (number) The number of times it will change.
			start - (number) The position from which you are going to start changing values.

		Returns:
			string
			
			A new string with replaced text.

		Example:
		---Code
		string result = MvOperations.LkChange("CUSTOMER UPDATE 2þADDRESS 2þ444", "UPDATE", "MYTEXT", 1, 1);
		---*/
	static LkChange(str, strOld, strNew, occurrence = 0, start = 0) {
		if (str.length > 0)
		{    
			if (!start || start < 1)
				start = 1;
			if (!occurrence || occurrence < 0)
				occurrence = 0;
			var index = str.indexOf(strOld);
			if (index >= 0)
			{
				var subindex = 0;
				var next = true;
				var count = 0;
				while(next)
				{    
					subindex = str.indexOf(strOld,subindex);
					count++;
					if (subindex == -1 || count >= start)
						next = false;
					else
						subindex = subindex + strOld.length;
				}
				if (subindex >= 0)
				{
					var initstr = str.substring(0,subindex);
					var endstr = str.substring(subindex);
					var maxocc = endstr.split(strOld).length;
					if (occurrence && occurrence > 0)
					{
						for (var occ = 0; occ < occurrence; occ++)
						{
							if (occ > maxocc)
								break;
							endstr = endstr.replace(strOld, strNew);
						}
					}
					else
					{
						var re = new RegExp(strOld, 'g');
						endstr = endstr.replace(re, strNew);
					}
					return initstr + endstr;
				}
				else
				{
					return str;
				}
			}
			else
			{
				return str;
			}

		}
		else 
			return str;
	}

/*
		Function: LkReplace
			Replaces a field, value or subvalue from a dynamic array, returning the result.
			
		Arguments:
			str - (string) The string on which you are going to replace a value.
			newVal - (string) New value that will be replaced in the indicated string.
			field - (number) The position of the attribute where you want to replace.
			value - (number) The multivalue position where you want to replace.
			subvalue - (number) The subvalue position where you want to replace.
		
		Returns
			string
			
			A new string with the replaced value.

		Example:
		---Code
		string result = MvOperations.LkReplace("CUSTOMER UPDATE 2þADDRESS 2þ444", "MYTEXT", 1);
		---
	*/
	static LkReplace(str, newVal, field, value = 0, subvalue = 0) {
		var result = "";
	
		var len = str.length;
		var i = 0;
	
		field--;
		while (field > 0 && len > 0)
		{
			if (str.charAt(i) == DBMV_Mark.AM)
				field--;
			i++;
			len--;
		}
		if (field > 0)
		{
			var createdstr = "";
			var cstr = DBMV_Mark.AM;/*String.valueOf(DBMV_Mark.AM);*/
			for (var index = 0; index < field; index++)
				createdstr += cstr;
			str += createdstr;
			i += field;
		}
	
		value--;
		while (value > 0 && len > 0)
		{
			if (str.charAt(i) == DBMV_Mark.AM)
				break;
	
			if (str.charAt(i) == DBMV_Mark.VM)
				value--;
			i++;
			len--;
		}
		if (value > 0)
		{
			var createdstr = "";
			var cstr = DBMV_Mark.VM;/*String.valueOf(DBMV_Mark.VM);*/
			for (var index = 0; index < value; index++)
				createdstr += cstr;
			str = str.substring(0, i) + createdstr + str.substring(i);
			i += value;
		}
	
		subvalue--;
		while (subvalue > 0 && len > 0)
		{
			if (str.charAt(i) == DBMV_Mark.VM || str.charAt(i) == DBMV_Mark.AM)
				break;
	
			if (str.charAt(i) == DBMV_Mark.SM)
				subvalue--;
	
			i++;
			len--;
		}
		if (subvalue > 0)
		{
			var createdstr = "";
			var cstr = DBMV_Mark.SM;/*String.valueOf(DBMV_Mark.SM);*/
			for (var index = 0; index < subvalue; index++)
				createdstr += cstr;
			str = str.substring(0, i) + createdstr + str(i);
			i += subvalue;
		}
	
		if (i >= str.length)
			result = str + newVal;
		else
		{
			var nextAM = str.indexOf(DBMV_Mark.AM, i);
			if (nextAM == -1)
				nextAM = Number.MAX_SAFE_INTEGER;
			var nextVM = str.indexOf(DBMV_Mark.VM, i);
			if (nextVM == -1)
				nextVM = Number.MAX_SAFE_INTEGER;
			var nextSM = str.indexOf(DBMV_Mark.SM, i);
			if (nextSM == -1)
				nextSM = Number.MAX_SAFE_INTEGER;
			var j = Math.min(nextAM, Math.min(nextVM, nextSM));
			if (j == Number.MAX_SAFE_INTEGER)
				j = str.length;
	
			var part1 = str.substring(0, i);
			var part2 = str.substring(j);
			result = part1 + newVal + part2;
		}
	
		return result;
	}
}

module.exports = { MvOperations }