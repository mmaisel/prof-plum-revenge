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
		msg.action = A_MOVE;
		msg.space = going_to;

		// Send the message to the server
		CMTS.sendMessage(msg);
	},


	endTurn: function() {
		var msg = Message.query(Q_ACTION);
		msg.action = A_ENDTURN;
		CMTS.sendMessage(msg);
	},

}; // ActionMenu 


var GameBoard = {

	playTurn: function(msg) {
		if (msg == null)
			return;
		if (msg.type == null) {
			return;
		}

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
				MessageBox.addInfoMessage("No one had the suggested cards");
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
			if (msg.playerCharacter === SCARLET) {
				label = "scarlet_pname";
			}
			else if (msg.playerCharacter === MUSTARD) {
				label = "mustard_pname";
			}
			else if (msg.playerCharacter === WHITE) {
				label = "white_pname";
			}
			else if (msg.playerCharacter === GREEN) {
				label = "green_pname";
			}
			else if (msg.playerCharacter === PEACOCK) {
				label = "peacock_pname";
			}
			else if (msg.playerCharacter === PLUM) {
				label = "plum_pname";
			}

			// Update our internal player_character variable
			if (msg.playerName == player_name) {
				player_character = msg.playerCharacter;
				console.log("Found our own player character: " + player_character.toString());
			}

			// Set player text in players window
			$("#" + label).html(msg.playerName);
		}

		// SHOWHAND
		else if (msg.type === SHOWHAND) {
			GameBoard.showCards(msg.cards);
		}	

		// CHAT
		else if (msg.type === CHAT) {
			MessageBox.addChatMessage(msg.playerName, msg.text);
		}

		// NEXTPLAYER
		else if (msg.type === NEXTPLAYER) {
			GameBoard.highlightNextPlayer(msg.playerCharacter);
		}

		// Q_CARDS
		else if (msg.type === Q_CARDS) {
			GameBoard.displayCards(msg.cards);
		}

		// Q_SUGGEST
		else if (msg.type === Q_SUGGEST) {
			accusation = false;

			// Disable all room options for suggestions
			// TODO: Determine which room 
			$("#study_radio").attr("disabled", "disabled");
			$("#hall_radio").attr("disabled", "disabled");
			$("#lounge_radio").attr("disabled", "disabled");
			$("#billiard_radio").attr("disabled", "disabled");
			$("#dining_radio").attr("disabled", "disabled");
			$("#conservatory_radio").attr("disabled", "disabled");
			$("#ballroom_radio").attr("disabled", "disabled");
			$("#kitchen_radio").attr("disabled", "disabled");
			$("#library_radio").attr("disabled", "disabled");

			// Set button text
			$("#select_opts_button").html('Suggest!');

			// Set heading text
			$("#myModalLabel").html("Make a Suggestion");

			$('#select_options').modal({
				backdrop: 'static',
				keyboard: false
			});

			// Pull down the modal
			$("#select_options").modal("show");
		}
		
		// Q_ACCUSE
		else if (msg.type === Q_ACCUSE) {
			accusation = true;

			// Enable the room options for accusations
			$("#study_radio").removeAttr("disabled");
			$("#hall_radio").removeAttr("disabled");
			$("#lounge_radio").removeAttr("disabled");
			$("#billiard_radio").removeAttr("disabled");
			$("#dining_radio").removeAttr("disabled");
			$("#conservatory_radio").removeAttr("disabled");
			$("#ballroom_radio").removeAttr("disabled");
			$("#kitchen_radio").removeAttr("disabled");
			$("#library_radio").removeAttr("disabled");

			// Set button text
			$("#select_opts_button").html('Accuse!');

			// Set heading text
			$("#myModalLabel").html("Make an Accusation");


			$('#select_options').modal({
				backdrop: 'static',
				keyboard: false
			});

			// Pull down the modal
			$("#select_options").modal("show");
		}

		// Q_ACTION
		else if (msg.type === Q_ACTION) {

			GameBoard.disableActionButtons();		
		
			for (var action in msg.actions) {
				if (msg.actions[action] === A_MOVE) {
					/**
					 * Get the player location. Since this message should only 
					 * go to us we can use our internal representation to find 
					 * out where we are at on the game board.
					 */
					var loc = GAMEBOARDMOVES[player_location];
					console.log(loc);

					/**
					 * Here we figure out what moves are available to enable
					 * the appropriate buttons.
					 */
					if (loc.up != null) {
						if (GameBoard.isOccupied(loc.up) == false &&
							GameBoard.fromServer(loc.up, msg.spaces) == true) {
							$("#up_button").removeAttr("disabled");
						}
					}

					if (loc.down != null) {
						if (GameBoard.isOccupied(loc.down) == false &&
							GameBoard.fromServer(loc.down, msg.spaces) == true) {
							$("#down_button").removeAttr("disabled");
						}
					}

					if (loc.left != null) {
						if (GameBoard.isOccupied(loc.left) == false &&
							GameBoard.fromServer(loc.left, msg.spaces) == true) {
							$("#left_button").removeAttr("disabled");
						}
					}

					if (loc.right != null) {
						if (GameBoard.isOccupied(loc.right) == false &&
							GameBoard.fromServer(loc.right, msg.spaces) == true) {
							$("#right_button").removeAttr("disabled");
						}
					}

					if (loc.secret != null) {
						if (GameBoard.fromServer(loc.secret, msg.spaces) == true) {
							$("#secret_room_button").removeAttr("disabled");
						}
					}

					//console.log("enabled some rooms!");
				}

				else if (msg.actions[action] === A_SUGGEST) {
					$("#suggest_button").removeAttr("disabled");
					//console.log("enabled some suggestion button");
				}

				else if (msg.actions[action] === A_ACCUSE) {
					$("#accuse_button").removeAttr("disabled");
					//console.log("enabled some accuse button");
				}

				else if (msg.actions[action] === A_ENDTURN) {
					$("#end_turn_button").removeAttr("disabled");
					//console.log("enabled some end turn button");
				}

				else {
					console.log("ERROR: Bad ACTION type received - " + msg.actions[action].toString());
				}
			}
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

	// Tells us if the room next to our character is in the list of available
	// rooms provided by the server in the A_MOVE command
	fromServer: function(destination, spaces) {
		for (var space in spaces) {
			if (destination == spaces[space]) {
				return true;
			}
		}

		return false;
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

		// update our internal location variable
		if (character == player_character) {
			player_location = new_loc;
			console.log("Got my player location: " + player_location.toString());
		}

		// If the player has moved to a hallway then it is now occupied
		if (GameBoard.isHallway(new_loc) == true) {
			$("#" + new_loc.name).data("occupied", true);
		}
	},

	displayCard: function(card) {
		$("#display_card_row").empty();

		var source = "";
		if (card.color == undefined) {
			// Non people cards can use toString()
			source = "/assets/images/Cards/card_" + card.toString() + ".jpg";
		} else {
			// People cards get a special name
			source = "/assets/images/Cards/card_" + card.color + ".jpg";
		}

		var image = $('<img>').attr({	
			alt: card.toString(), 
			src: source,
		});		

		// Append the image row
		$('#display_card_row').append(image);

		$('#display_card').modal({
			backdrop: 'static',
			keyboard: false
		});

		$('#display_card').modal('show');
	},

	// Similar to displayCard(), except this goes on a different modal
	displayCards: function(cards) {
		$("#choose_card_form").empty();

		for (var i in cards) {
			//Create the label element
			var label = $('<label class="image_radio_button">');

			//Create the input element as a radio button
			var input = $('<input type="radio" name="radioImages">').attr({
				value: cards[i].toString(),
			});

			// Create an image
			var source = "";
			if (cards[i].color == undefined) {
				// Non people cards can use toString()
				source = "/assets/images/Cards/card_" + cards[i].toString() + ".jpg";
			} else {
				// People cards get a special name
				source = "/assets/images/Cards/card_" + cards[i].color + ".jpg";
			}

			var image = $('<img>').attr({	
				alt: cards[i].toString(), 
				src: source,
			});

			//Insert the input into the label
			input.appendTo(label);
			image.appendTo(label);

			// Append the image radio buttons to the form
			$('#choose_card_form').append(label);			
		}

		// User can't click their way out of this one
		$('#choose_card').modal({
			backdrop: 'static',
			keyboard: false
		});

		$('#choose_card').modal('show');
	},

	refuteSuggestion: function(card) {
		// Send the card that the player chose to refute
		var msg = Message.query(Q_CARDS);
		msg.card = card;
		CMTS.sendMessage(msg);
	},
	
	disableActionButtons: function() {
		$("#up_button").attr("disabled", "disabled");
		$("#down_button").attr("disabled", "disabled");
		$("#left_button").attr("disabled", "disabled");
		$("#right_button").attr("disabled", "disabled");
		$("#secret_room_button").attr("disabled", "disabled");
		$("#suggest_button").attr("disabled", "disabled");
		$("#accuse_button").attr("disabled", "disabled");
		$("#end_turn_button").attr("disabled", "disabled");
	},

	highlightNextPlayer: function(character) {
		if (character === SCARLET) {
			// Set the next player label
			$("#scarlet_pname").css('background-color', 'yellow');
		} else {
			// Clear out the old label
			$("#scarlet_pname").css('background-color', 'white');
		}
		
		if (character === MUSTARD) {
			// Set the next player label
			$("#mustard_pname").css('background-color', 'yellow');
		} else {
			// Clear out the old label
			$("#mustard_pname").css('background-color', 'white');
		}
		
		if (character === WHITE) {
			// Set the next player label
			$("#white_pname").css('background-color', 'yellow');
		} else {
			// Clear out the old label
			$("#white_pname").css('background-color', 'white');
		}
		
		if (character === GREEN) {
			// Set the next player label
			$("#green_pname").css('background-color', 'yellow');
		} else {
			// Clear out the old label
			$("#green_pname").css('background-color', 'white');
		}
		
		if (character === PEACOCK) {
			// Set the next player label
			$("#peacock_pname").css('background-color', 'yellow');
		} else {
			// Clear out the old label
			$("#peacock_pname").css('background-color', 'white');
		}
		
		if (character === PLUM) {
			// Set the next player label
			$("#plum_pname").css('background-color', 'yellow');
		} else {
			// Clear out the old label
			$("#plum_pname").css('background-color', 'white');
		}
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
		var msg = new Message.query(CHAT);
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
