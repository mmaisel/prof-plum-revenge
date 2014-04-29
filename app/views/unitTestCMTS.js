
var messenger = function () {
	annoucementCallback;
	queryCallback;
};

var currentA = 0;
var currentQ = 0;

function registerAnnouncementCallback(aCallback) {
	messenger.annoucementCallback = aCallback;
	currentA = 0;
	processAnnouncements();
	return 1;
};

function registerQueryCallback(qCallback) {
	messenger.queryCallback = qCallback;
	currentQ = 0;
	setTimeout(processQuery, 1000*(a.length+1));
	return 1;
};

function postQueryResponse(response) {
	if (currentQ < q.length) {
		setTimeout(processQuery,1000);
	}
	return;
};

function processAnnouncements() {
	//while (currentA < a.length) {
		messenger.annoucementCallback(a[currentA]);
		currentA = currentA + 1;
		if (currentA < a.length) setTimeout(processAnnouncements, 1000);
	//}
	return;
};

function processQuery() {
	messenger.queryCallback(q[currentQ]);
	currentQ = currentQ + 1;
	return;
};