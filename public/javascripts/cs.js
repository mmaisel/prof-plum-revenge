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
			MessageBox.addInfoMessage(msg.playerName + " was skipped.");
		} 

		// MOVE
		else if (msg.type === MOVE) {
			GameBoard.movePlayer(msg.playerCharacter, msg.space);
		} 

		// SUGGEST
		else if (msg.type === SUGGEST) {
			MessageBox.addInfoMessage(msg.playerName + " suggested that " + 
				msg.triglyph.suspect + " did it in the " +
				msg.triglyph.room + " with the " + 
				msg.triglyph.weapon);

		}

		// FALSE
		else if (msg.type === FALSE) {
			if (msg.card !== NOCARD) {
				GameBoard.displayCard(msg.card);
			} else {
				MessageBox.addPrivateMessage("No one had the cards you suggested!");
			}
		}

		// ACCUSE
		else if (msg.type === ACCUSE) {
			MessageBox.addInfoMessage(msg.playerName + " accused " +
				msg.triglyph.suspect + " of doing it in the " +
				msg.triglyph.room + " with the " + 
				msg.triglyph.weapon);
		}

		// WINNER
		else if (msg.type === WINNER) {
			MessageBox.addInfoMessage(msg.playerName + " won the game!");
		}

		// LOSER
		else if (msg.type === LOSER) {
			MessageBox.addInfoMessage(msg.playerName + " lost the game!");
		}

		// NEWPLAYER
		else if (msg.type === NEWPLAYER) {
			MessageBox.addInfoMessage(msg.playerName + " joined the game as " +
				msg.playerCharacter.toString());

			var label = null;
			if (msg.playerCharacter.toString() == SCARLET.toString()) {
				label = "scarlet_pname";
			}
			else if (msg.playerCharacter.toString() == MUSTARD.toString()) {
				label = "mustard_pname";
			}
			else if (msg.playerCharacter.toString() == WHITE.toString()) {
				label = "white_pname";
			}
			else if (msg.playerCharacter.toString() == GREEN.toString()) {
				label = "green_pname";
			}
			else if (msg.playerCharacter.toString() == PEACOCK.toString()) {
				label = "peacock_pname";
			}
			else if (msg.playerCharacter.toString() == PLUM.toString()) {
				label = "plum_pname";
			}

			// Set player text in players window
			$("#" + label).html(msg.playerName);
		}

		// SHOWHAND
		else if (msg.type === SHOWHAND) {
			GameBoard.showCards(msg.cards);
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
			MessageBox.addChatMessage(msg.playerName, msg.text);
		}

		// Q_CARDS
		else if (msg.type === Q_CARDS) {
			// Coming soon to a theater near you....
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
		if (card.color == undefined) {
			// Non people cards can use toString()
			newNode.src = "/assets/images/Cards/card_" + card.toString() + ".jpg";
		} else {
			// People cards get a special name
			newNode.src = "/assets/images/Cards/card_" + card.color + ".jpg";
		}
		newNode.alt = card.toString();
		newNode.title = card.toString();
		// With 9 images this will make it fit on one line
		//newNode.setAttribute('height', '100px');
		//newNode.setAttribute('width', '60px');
		//newNode.src = "/assets/images/" + card.toString() + ".jpg";
		document.getElementById("hand").appendChild(newNode);
	},

	showCards : function (cards) {
		for (var card in cards) {
			this.addToHand(cards[card]);
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

	moveToken : function (player, room) {
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
	},

	// character - character_type
	// space - space_type 
	movePlayer: function(character, space) {
		var old_loc = player_locations[character.toString()];
		var new_loc = space;

		if (old_loc == undefined) {
			// If the token isn't on the board yet then add it
			GameBoard.addToken(character, new_loc);				
		} else {
			// Move the token to the new location
			GameBoard.moveToken(character, new_loc);

			// If player moved from a hallway then its no longer occupied
			$("#" + old_loc.name).data("occupied", false);				
		}

		// Update local player location
		player_locations[character.toString()] = new_loc;

		// If the player has moved to a hallway then it is now occupied
		if (GameBoard.isHallway(new_loc) == true) {
			$("#" + new_loc.name).data("occupied", true);
		}
	},

	displayCard: function(card) {
		if ( $("#display_card_row").length ) {
			// Remove the old image from the 
			var element = document.getElementById("false_image");
			if (element != null)
				document.getElementById("display_card_row").removeChild(element);
		}

		var false_img = document.createElement("img");
		if (card.color == undefined) {
			// Non people cards can use toString()
			false_img.src = "/assets/images/Cards/card_" + card.toString() + ".jpg";
		} else {
			// People cards get a special name
			false_img.src = "/assets/images/Cards/card_" + card.color + ".jpg";
		}
		false_img.alt = card.toString();
		false_img.title = card.toString();
		false_img.setAttribute('id', 'false_image');


		document.getElementById("display_card_row").appendChild(false_img);
		$('#display_card').modal('show');
	},
};
//GameBoard.showCards( [1, 2, 3] );
//GameBoard.moveToken(MUSTARD, LIBRARY);

var MessageBox = {

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

	addInfoMessage: function(text) {
		$("#chat_box").append("[INFO]: " + text + "\n");
	},

	addPrivateMessage: function(text) {
		$("#chat_box").append("[PRIVATE]: " + text + "\n");
	},

	addChatMessage: function(player, text) {
		$("#chat_box").append("[" + player.toString() + "]: " + text + "\n");
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

}; // MessageBox


/**
 * Once the page is completely loaded we can start communicating with the
 * game server every 1000ms to pull items from our announcement queue.
 * TODO: When the game ends we need to end this by calling 
 * 		clearInterval(gameInterval);
 */
var gameInterval = setInterval( function() { CMTS.getMessage(); }, 1000 );
