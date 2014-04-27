
function announcementCallback(msg) {
	var newNode = document.createElement("p");
	newNode.appendChild(document.createTextNode(msg.toString()));
	document.getElementById("body").appendChild(newNode);
	return;
}; 
var nextQuery;

function setQueryIndexToZero() {nextQuery = 0;};

function queryCallback(msg) {
	var newNode = document.createElement("p");
	newNode.appendChild(document.createTextNode(msg.toString()));
	document.getElementById("body").appendChild(newNode);
	setTimeout(respondToQuery, 1000);
	return;

};

function respondToQuery() {
	var newNode = document.createElement("p");
	newNode.appendChild(document.createTextNode("RESPONSE: " + r[nextQuery].toString()));
	document.getElementById("body").appendChild(newNode);
	postQueryResponse(r[nextQuery]);
	nextQuery = nextQuery + 1;
	return;
};


