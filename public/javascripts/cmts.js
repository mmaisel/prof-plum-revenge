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
		console.log("[POST]: " + JSON.stringify(message));
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
		// jqhxr implements the Promise API so it is possible to implement a 
		// chain of done (success) fail (error) and always (complete regardless
		// of error or success) callbacks.
		var jqxhr = $.getJSON("/api/club/" + club_uuid + "/" + player_uuid);

		/**
		 * If you need additional code beyond what is done in the callback
		 * inside $.getJSON then that work would go here.
		 */
		jqxhr.done(function(msg) {
			var xx = msg.message;
			console.log("[GET]: " + JSON.stringify(xx));

			// Create a generic message
			var m = new Gameobjects.message();

			// Get the message type (query or annoucement... doesn't matter)
			m.type = MESSAGE_TYPES[xx.type.name];
			
			// Player name is a string
			if (xx.playerName != undefined) {
				m.playerName = xx.playerName;
			}

			// Player character is a string 
			if (xx.playerCharacter != undefined) {
				m.playerCharacter = CHARACTER_TYPES[xx.playerCharacter];
			}

			// Triglyph is a dictionary of room, suspect, and weapon
			if  (xx.triglyph != undefined) {
				m.triglyph = new Gameobjects.triglyph(
					xx.triglyph.room,
					xx.triglyph.suspect,
					xx.triglyph.weapon);
			}


			// card is a string
			if (xx.card != undefined) {
				m.card = CARD_TYPES[xx.card];
			}
			
			// Space is a whitespace separated string
			if (xx.space != undefined) {
				m.space = SPACE_TYPES[xx.space];
			}
			
			// Text is a string
			if (xx.text != undefined) {
				m.text = xx.text;	
			}
			
			if (xx.spaces != undefined) {
				m.spaces = [];
				if (xx.spaces != "no space") {
					for (var i = 0; i < xx.spaces.length; i++) {
						m.spaces.push(SPACE_TYPES[xx.spaces[i]]);
					}					
				}
			}
	
			if (xx.actions != undefined) {
				m.actions = [];
				for (var i = 0; i < xx.actions.length; i++) {
					m.actions.push(ACTION_TYPES[xx.actions[i]]);
				}
			}

			if (xx.cards != undefined) {
				m.cards = [];
				for (var i = 0; i < xx.cards.length; i++) {
					m.cards.push(CARD_TYPES[xx.cards[i]]);
				}
			}


			console.log(m);

			GameBoard.playTurn(m);

		});

		/**
		 * If for whatever reason there is a failure with retrieving data
		 * from the game server this callback will be called
		 */
		jqxhr.fail(function() { // If there was an error connecting
			console.log( "Problem with connecting to game server" );
		});

		/**	
		 * If the connection is complete (regardless of success or failure)
		 * you can add functionality to do cleanup or whatever here.
		 */
		jqxhr.always(function() {
			//console.log( "complete" );
			// Don't modify message here unless you really mean to.
		});

	},
}
