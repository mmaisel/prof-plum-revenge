/**
 * Client Message and Transport Subsystem (CMTS)
 * This subsystem is responsible for sending and receiving messages from the
 * game server. All messages follow formatted in a JSON structure.
 */

var Message = {

	announcement: function(type) {
		var a = new Gameobjects.announcement();
		a.type = type;
		a.playerName = player_name;
		a.playerCharacter = player_character;
		return a;
	},

	query: function(type) {
		var q = new Gameobjects.query();
		a.type = type;
		a.playerName = player_name;
		a.playerCharacter = player_character;
		return q;
	},

}; // Message

var CMTS = {

	// H4x0rzzzz!!!
	postJSON: function(url, data, callback) {
	    return jQuery.ajax({
	        'type': 'POST',
	        'url': url,
	        'contentType': 'application/json',
	        'data': JSON.stringify(data),
	        'dataType': 'json',
	        'success': callback
	    });
	},

	sendMessage : function(message) {
		console.log("[SEND]: " + JSON.stringify(message));
		CMTS.postJSON("/api/game/" + club_uuid, message, function(response) {
			console.log("[RESPONSE]: " + JSON.stringify(response));
		});
		// TODO: Do your $postJSON() call here to post the message to server
	},

	getMessage : function() {
		$.getJSON("/api/game/" + club_uuid, function(message) {
			console.log("[GET]: " + JSON.stringify(message));
			// TODO: Do your $getJSON() call here to get latest message from 
			// server then extract the type and command and call into playTurn()

		});
	},
}
