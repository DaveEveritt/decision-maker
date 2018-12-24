// Gets multiple 'elems' by ID
const getElemsById = function(ids) {
	if(ids === undefined || (typeof ids !== 'object') || (ids.length === 0)) {
		alert('Expecting an array based parameter, or no ids given, exiting');
		return null;
	}
	for(var i = 0; i < ids.length; i++) {
		elems[i] = document.getElementById(ids[i]);
	}
	return ids;
};
