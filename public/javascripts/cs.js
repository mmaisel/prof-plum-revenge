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

	accuse: function() {
		// First display the accusation options to the player.
		var accusation = ActionMenu.accuseDialogue();
		// TODO: What if the user cancels out instead?

		// Create message based on user input
		var msg = Message.query(Q_ACCUSE);

		msg.trigylphx = accusation;
		
		// Send the message to the server
		CMTS.sendMessage(msg);
	},

	suggest: function() {
		// First get the suggestion from the user
		var suggestion = ActionMenu.suggestDialogue();
		// TODO: What if the user cancels out instead?

		// Create message based on user input
		var msg = Message.query(Q_SUGGEST);

		msg.trigylphx = suggestion;
		
		// Send the message to the server
		CMTS.sendMessage(msg);
	},


	move: function(direction) {
		// The server already prevents players from moving in certain directions
		// so we don't need to be concerned about that here. We also don't need 
		// to worry about the animation here since the server will give us the
		// update anyway
		var msg = Message.query(Q_ACTION);

		msg.spaces = ActionMenu.analyzeDirection(direction);

		// Send the message to the server
		CMTS.sendMessage(msg);
	},

	accuseDialogue: function() {
		// TODO: Provide the ability for the user to cancel out
		// TODO: Display a dialogue box to the user; Create Triglyphus 
		// containing the three items the user chose; Return Triglyphus
		var t = new Gameobjects.triglyphus(null, null, null);
		return t;
	},

	suggestDialogue: function() {
		// TODO: Provide the ability for the user to cancel out
		// TODO: Display a dialogue box to the user; Create Triglyphus 
		// containing the two items the user chose since the room is implied; 
		// Return Triglyphus
		var t = new Gameobjects.triglyphus(null, null, null);
		return t;
	},

	analyzeDirection: function(direction) {
		// TODO: We need to find out where the character is and where they will 
		// be going based on the direction. This function should return the room
		// gameobject
		return null;
	}

}; // ActionMenu 



var GameBoard = {
	
	playTurn: function(message) {
		console.log("playTurn: Got: " + message.type.toString());

		// NOP
		if (message.type === NOP) {
			return; // Nothing to do here
		} 

		// SKIP
		else if (message.type === SKIP) {
			// TODO: Provide some kind of visual feedback to tell the player
			// that they have been skipped.
		} 

		// MOVE
		else if (message.type === MOVE) {
			GameBoard.movePlayer(message.playerCharacter, message.room);
		} 

		// SUGGEST
		else if (message.type === SUGGEST) {

		}

		// FALSE
		else if (message.type === FALSE) {

		}

		// ACCUSE
		else if (message.type === ACCUSE) {

		}

		// WINNER
		else if (message.type === WINNER) {

		}

		// LOSER
		else if (message.type === LOSER) {

		}

		// NEWPLAYER
		else if (message.type === NEWPLAYER) {

		}

		// SHOWHAND
		else if (message.type === SHOWHAND) {

		}	

		// YOURTURN
		else if (message.type === YOURTURN) {

		}

		// CHAT
		else if (message.type === CHAT) {
			ChatRoom.addText(message.playerName, message.text);
		}

		// Unsupported message type
		else {
			console.log("ERROR: Bad message type received - " + msg.type.toString());
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
};
GameBoard.showCards( [1, 2, 3] );
GameBoard.movePlayer(MUSTARD, LIBRARY);

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
		/*a = new Gameobjects.announcement();
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





// TODO: Implement this
var GameInfo = {

};




/**
 * Once the page is completely loaded we can start communicating with the
 * game server every 1000ms to pull items from our announcement queue.
 * TODO: When the game ends we need to end this by calling 
 * 		clearInterval(gameInterval);
 */
var gameInterval = setInterval( function() { announcementCallback() }, 1000 );


/**
 * This callback is processed every 1000 milliseconds. This function 
 * obtians the next announcement item from the game server queue and processes
 * the message in order to forward onto playTurn(). If the message returned is
 * 
 */
function announcementCallback() {
	// Get the next announcement message from the server
	var msg = CMTS.getMessage();
	if (msg != null) {
		GameBoard.playTurn(msg);
	}
}; 
