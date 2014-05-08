/**
 * Client Subsystem
 * This subsystem is responsible for gameboard, user interaction, and user
 * interface functionality.
 */

 
/**
 * Action Menu
 * These functions represent the buttons inside the action menu box in the UI.
 * When a button is clicked a message is created and sent to the server.
 */
var ActionMenu = {

	accuse: function(room, suspect, weapon) {
		// Create message based on user input
		var msg = Message.query(Q_ACCUSE);
		msg.triglyph = new Gameobjects.triglyph(room, suspect, weapon);
		
		// Send the message to the server
		CMTS.sendMessage(msg);
	},

	suggest: function(suspect, weapon) {
		// Create message based on user input
		var msg = Message.query(Q_SUGGEST);
		msg.triglyph = new Gameobjects.triglyph(null, suspect, weapon);
		
		// Send the message to the server
		CMTS.sendMessage(msg);
	},


	move: function(direction) {
		// There has got to be a better way to do this, but not right now...
		var loc = GAMEBOARDMOVES[player_location];
		var going_to = null;
		if (direction == UP) {
			going_to = loc.up;
		} else if (direction == DOWN) {
			going_to = loc.down;
		} else if (direction == RIGHT) {
			going_to = loc.right;
		} else if (direction == LEFT) {
			going_to = loc.left;
		} else if (direction == SECRETROOM) {
			going_to = loc.secret;
		} else {
			console.log("FAILED: Bad direction");
			return;
		}

		/*var a = new Gameobjects.announcement();
		a.type = MOVE;
		a.playerCharacter = PLUM;
		a.room = BALLKITCHEN;
		GameBoard.playTurn(a);*/

		var msg = Message.query(Q_ACTION);
		msg.playerCharacter = player_character;
		msg.room = going_to;

		// Send the message to the server
		CMTS.sendMessage(msg);
	},


	endTurn: function() {
		var msg = Message.query(Q_ACTION);
		msg.actions = [ A_ENDTURN ];
		CMTS.sendMessage(msg);
	},

}; // ActionMenu 



var GameBoard = {
	
	playTurn: function(msg) {
		console.log("playTurn: Got: " + msg.type.toString());

		// NOP
		if (msg.type === NOP) {
			return; // Nothing to do here
		} 

		// SKIP
		else if (msg.type === SKIP) {
			// TODO: Provide some kind of visual feedback to tell the player
			// that they have been skipped.
		} 

		// MOVE
		else if (msg.type === MOVE) {
			var old_loc = player_locations[msg.playerCharacter.name];
			var new_loc = msg.space;

			if (old_loc == undefined) {
				// If the token isn't on the board yet then add it
				GameBoard.addToken(msg.playerCharacter, msg.space);				
			} else {
				// Move the token to the new location
				GameBoard.movePlayer(msg.playerCharacter, new_loc);

				// If player moved from a hallway then its no longer occupied
				$("#" + old_loc.name).data("occupied", false);				
			}

			// Update local player location
			player_locations[msg.playerCharacter.name] = new_loc;

			// If the player has moved to a hallway then it is now occupied
			if (GameBoard.isHallway(new_loc) == true) {
				$("#" + new_loc.name).data("occupied", true);
			}
		} 

		// SUGGEST
		else if (msg.type === SUGGEST) {

		}

		// FALSE
		else if (msg.type === FALSE) {

		}

		// ACCUSE
		else if (msg.type === ACCUSE) {

		}

		// WINNER
		else if (msg.type === WINNER) {

		}

		// LOSER
		else if (msg.type === LOSER) {

		}

		// NEWPLAYER
		else if (msg.type === NEWPLAYER) {
			// TODO : Add a token onto the board depending on the location

			// New players get a location on the board, so add it to our
			// internal location tracker to keep track of all player 
			// locations to make it easy to find them later
			//player_locations[msg.playerCharacter.name] = msg.space;
			//console.log(JSON.stringify(player_locations));
		}

		// SHOWHAND
		else if (msg.type === SHOWHAND) {

		}	

		// YOURTURN
		else if (msg.type === YOURTURN) {
			// Get the player location... Since this message should only go to
			// us we can use our internal representation to find out where
			// we are at on the game board.
			var loc = GAMEBOARDMOVES[player_location];
			console.log(loc);

			// Here we figure out what moves are available and enable those 
			// buttons. Finding out where we're at on the gameboard and then
			// finding the available spaces to move to.
			if (loc.up != null) {
				if (GameBoard.isOccupied(loc.up) == false) {
					$("#up_button").removeAttr("disabled");
				}
			}

			if (loc.down != null) {
				if (GameBoard.isOccupied(loc.down) == false) {
					$("#down_button").removeAttr("disabled");
				}
			}

			if (loc.left != null) {
				if (GameBoard.isOccupied(loc.left) == false) {
					$("#left_button").removeAttr("disabled");
				}
			}

			if (loc.right != null) {
				if (GameBoard.isOccupied(loc.right) == false) {
					$("#right_button").removeAttr("disabled");
				}
			}

			if (loc.secret != null) {
				$("#secret_room_button").removeAttr("disabled");
			}
		}

		// CHAT
		else if (msg.type === CHAT) {
			ChatRoom.addText(msg.playerName, msg.text);
		}

		// Unsupported message type
		else {
			console.log("ERROR: Bad message type received - " + msg.type.toString());
		}

	},

	isOccupied: function(location) {
		// Only hallways can be occupied
		if (GameBoard.isHallway(location) == true) {
			if ($("#" + location.name).data("occupied") == true) {
				console.log(location.name + " is occupied");
				return true;
			}
		}

		return false;
	},

	isHallway: function(location) {
		if (location.name.indexOf('-') != -1) {
			return true; // A hallway
		} else {
			return false; // Not a hallway
		}
	},

	addToHand : function (card) {
		//var newNode = document.createElement("div");
		//newNode.class = "col-md-1";
		//newNode.innerHTML = card.toString();
		//TODO: make cards images as follows:
		var newNode = document.createElement("img");
		newNode.src =  "/assets/images/card.jpg";
		newNode.alt = card.toString();
		newNode.title = card.toString();
		//newNode.src = "/assets/images/" + card.toString() + ".jpg";
		document.getElementById("hand").appendChild(newNode);
	},

	showCards : function (cards) {
		for (var card in cards) {
			this.addToHand(card);
		}
	},

	tokens : { 
		0: "scarlet_token",
		1: "mustard_token",
		2: "white_token",
		3: "green_token",
		4: "peacock_token",
		5: "plum_token",
	},

	movePlayer : function (player, room) {
		var token = document.getElementById(this.tokens[player.value]);
		var formerParent = token.parentNode;
		var room = document.getElementById(room.toString());
		var row = room.children[Math.floor(player.value/2)];
		var col = row.children[player.value%2];
		var storedInnerHtml = col.innerHTML;
		col.innerHTML = "";
		col.appendChild(token);	
		formerParent.innerHTML = storedInnerHtml;
		//token.parentNode.removeChild(token);
	},

	addToken: function(player, room) {
		var token = document.createElement("img");
		token.src =  "/assets/images/" + this.tokens[player.value] + ".png";
		token.setAttribute("id", this.tokens[player.value]);
		var room = document.getElementById(room.toString());
		var row = room.children[Math.floor(player.value/2)];
		var col = row.children[player.value%2];
		col.innerHTML = "";
		col.appendChild(token);	
	}
};
//GameBoard.showCards( [1, 2, 3] );
//GameBoard.movePlayer(MUSTARD, LIBRARY);

var ChatRoom = {

	// When a message is submitted it is displayed to all users.
	// TODO: Find a way to make the textarea autoscroll as messages come in
	// TODO: I still have the bug where the "Send" button isn't being disabled
	// after sending a message. It happened after I added the 
	// event.preventDefaults() function call in plum.scala.js.
	onSubmit: function(text) {
		var msg = new Message.query(A_CHAT);
		msg.text = text;
		CMTS.sendMessage(msg);

		// DEBUG
		/*var a = new Gameobjects.announcement();
		a.type = CHAT;
		a.playerName = player_name;
		a.text = text;
		GameBoard.playTurn(a);*/

		$("#message_input").val("");
	},

	addText: function(name, text) {
		$("#chat_box").append("[" + name + "]: " + text + "\n");
	},

	// Make sure that the submit button isn't enabled until the user has typed
	// something into the input form.
	validate: function() {
		if ( $("#message_input").val().length > 0 ) {
			$("#send_button").removeAttr("disabled");
		} else {
			$("#send_button").attr("disabled", "disabled");
		}
	},

}; // ChatRoom


/**
 * Once the page is completely loaded we can start communicating with the
 * game server every 1000ms to pull items from our announcement queue.
 * TODO: When the game ends we need to end this by calling 
 * 		clearInterval(gameInterval);
 */
var gameInterval = setInterval( function() { CMTS.getMessage(); }, 1000 );
