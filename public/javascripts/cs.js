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
		var msg = Message.create(MESSAGE_TYPE.ACTION, ACTION.ACCUSE, 
			accusation);
		
		// Send the message to the server
		CMTS.sendMessage(msg);
	},

	suggest: function() {
		// First get the suggestion from the user
		var suggestion = ActionMenu.suggestDialogue();
		// TODO: What if the user cancels out instead?

		// Create a message based on user input
		var msg = Message.create(MESSAGE_TYPE.ACTION, ACTION.SUGGEST, 
			suggestion);

		// Send the message to the server
		CMTS.sendMessage(msg);
	},


	moveToken: function(direction) {
		// JQuery already determines what the direction that the user chose,
		// so we just create a message on that and send it off to the server.
		var msg = Message.create(MESSAGE_TYPE.ACTION, ACTION.MOVE, direction);

		// Send the message to the server
		CMTS.sendMessage(msg);
	},

	accuseDialogue: function() {
		// TODO: Provide the ability for the user to cancel out
		// TODO: Display a dialogue box to the user; Create Triglyphus 
		// containing the three items the user chose; Return Triglyphus
	},

	suggestDialogue: function() {
		// TODO: Provide the ability for the user to cancel out
		// TODO: Display a dialogue box to the user; Create Triglyphus 
		// containing the two items the user chose since the room is implied; 
		// Return Triglyphus		
	},

}; // ActionMenu 





// TODO: Implement this
var GameBoard = {
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
	movePlayer : function (player, space) {
		var token = document.getElementById(this.tokens[player.value]);
		var formerParent = token.parentNode;
		var room = document.getElementById(space.name);
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
GameBoard.movePlayer(SUSPECT.MUSTARD, ROOM.LIBRARY);

var ChatRoom = {

	// When a message is submitted it is displayed to all users.
	// TODO: Instead of updating the message output here we should construct the
	// JSON message first and the let the server tell us (our client) when to
	// display the message along with the other clients
	// TODO: Find a way to make the textarea autoscroll as messages come in
	// TODO: I still have the bug where the "Send" button isn't being disabled
	// after sending a message. It happened after I added the 
	// event.preventDefaults() function call in plum.scala.js.
	OnSubmit: function(text) {
		$("#chat_box").append("[Player1]: " + text + "\n");
		$("#message_input").val("");
	},

	// Make sure that the submit button isn't enabled until the user has typed
	// something into the input form.
	Validate: function() {
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

// Update gameboard every second
//var gameboardInterval = window.setInterval('updateGameBoard()', 1000);

var updateGameBoard = function() {
    $.getJSON("/api/game/" + club_uuid, function(gameboard) {
        //console.log(gameboard)
        //$('#gameboard').text(gameboard.status);
    });
};

function getGameTick() {

};

function displayCard() {

};

function makeSuggestion() {
	alert("Make a suggestion");
};

function sendCard() {

};

function playTurn(message_type, command) {

};