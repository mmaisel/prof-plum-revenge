
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
	processQuery();
	return 1;
};

function postQueryResponse(response) {
	if (currentQ < q.length) {
		processQuery();
	}
	return;
};

function processAnnouncements() {
	while (currentA < a.length) {
		messenger.annoucementCallback(a[currentA]);
		currentA = currentA + 1;
	}
};

function processQuery() {
	messenger.queryCallback(q[currentQ]);
	currentQ = currentQ + 1;
};