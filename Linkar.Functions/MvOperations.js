var DBMV_Mark = require('./DBMV_Mark')

class MvOperations
{

	static LkDCount(str, delimiter)
    {
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

    static LkCount(str, delimiter)
    {
    	if (str == null || str.length == 0)
            return 0;
        else if (delimiter == null || delimiter.length == 0)
            return str.length;
        else
        {
        	return this.LkDCount(str, delimiter) - 1;
        }
    }
    
    static LkExtract(str, field, value = 0, subvalue = 0)
    {
        var aux = "";

        if (field > 0)
        {
            var parts = str.split(DBMV_Mark.AM,-1);
            console.log(parts)
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

	static LkChange(str, strOld, strNew)
    {
        var re = new RegExp(strOld, 'g');
        return str.replace(re, strNew);
    }
    
	static LkReplace(str, newVal, field, value = 0, subvalue = 0)
    {
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
    		var cstr = String.valueOf(DBMV_Mark.AM);
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
    		var cstr = String.valueOf(DBMV_Mark.VM);
    		for (var index = 0; index < value; index++)
    			createdstr += cstr;
    		str = createdstr;
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
    		var cstr = String.valueOf(DBMV_Mark.SM);
    		for (var index = 0; index < subvalue; index++)
    			createdstr += cstr;
    		str = createdstr;
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