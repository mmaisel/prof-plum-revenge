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
		var a = new Gameobjects.query();
		a.type = type;
		a.playerName = player_name;
		a.playerCharacter = player_character;
		return a;
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
		CMTS.postJSON("/api/club/" + club_uuid + "/" + player_uuid, message);
	},

	/**
	 * This function attempts to connect to the game server and get the latest
	 * announcement on our player queue. If the connection is successful then
	 * the message contents are copied over and returned to the user. If the 
	 * connection fails to connect to the server for any reason then the
	 * announcement type returned is NOP. This tells the announcementCallback
	 * function that there is nothing to for the moment.
	 */
	getMessage : function() {
		var message = new Gameobjects.announcement();
		message.type = NOP; // Default values are good.

		// jqhxr implements the Promise API so it is possible to implement a 
		// chain of done (success) fail (error) and always (complete regardless
		// of error or success) callbacks.
		var jqxhr = $.getJSON("/api/club/" + club_uuid + "/" + player_uuid);

		/**
		 * If you need additional code beyond what is done in the callback
		 * inside $.getJSON then that work would go here.
		 */
		jqxhr.done(function(msg) {
			console.log("[GET]: " + JSON.stringify(msg));
			message.type = msg.type;
			// TODO: do a deep copy
		});

		/**
		 * If for whatever reason there is a failure with retrieving data
		 * from the game server this callback will be called
		 */
		jqxhr.fail(function() { // If there was an error connecting
			console.log( "Problem with connecting to game server" );
			message.type = NOP; // Nothing to return
		});

		/**	
		 * If the connection is complete (regardless of success or failure)
		 * you can add functionality to do cleanup or whatever here.
		 */
		jqxhr.always(function() {
			console.log( "complete" );
			// Don't modify message here unless you really mean to.
		});

		return message;
	},
}
