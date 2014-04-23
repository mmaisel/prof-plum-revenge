/**
 * PlumJS
 * This contains the JS components of the Client Subsystem (CS) and Client 
 * Message and Transport Subsystem (CMTS).
 */


/**
 * Enum values that are used to construct messages to send to the game server.
 * There should only be one of each (MESSAGE_TYPE and COMMAND) used in each 
 * message to the server.
 */
var MESSAGE_TYPE = {
	Action              : { value: 0, name: "Action"              },
	PrivateAnnouncement : { value: 1, name: "Private Announcement" },
	Announcement        : { value: 2, name: "Announcement"         }
};

var COMMAND = {
	Suggest     : { value: 0, name: "Suggest"     },
	Accuse      : { value: 1, name: "Accuse"      },
	Move        : { value: 2, name: "Move"        },
	Chat        : { value: 3, name: "Chat"        },
	SecretRoom : { value: 4, name: "Secret Room" },
};

var DIRECTION = {
	Up    : {value: 0, name: "Up",    code: "U"},
	Down  : {value: 1, name: "Down",  code: "D"},
	Left  : {value: 2, name: "Left",  code: "L"},
	Right : {value: 3, name: "Right", code: "R"}
};


// TODO: Need to generate these values somewhere
var current_player, game_uuid, player;

game_uuid = 1;


// Update gameboard every second
var gameboardInterval = window.setInterval('updateGameBoard()', 1000);


/**
 * JQuery handlers for everything in the game
 */
$(document).ready(function() {

	/**
	 * Action Menu
	 */

	// Accuse
	$("#accuse_button").click(function() {
		ActionMenu.Accuse();
	});

	// Suggestion
	$("#suggestion_button").click(function() {
		ActionMenu.Suggest();
	});

	// Secret Room
	// TODO: We need logic to determine when this option is available and 
	// not to the player. I'm not sure where this is going to happen 
	// right now.
	$("#secret_room_button").click(function() {
		ActionMenu.SecretRoom();
	})

	// Directions
	// TODO: We need logic to ensure that the player can actually move into a 
	// certain direction. When the player can't move a certain way then the
	// buttons need to be disabled.
	$("#up_button").click(function() {
		ActionMenu.MoveToken(DIRECTION.Up);
	});
	$("#left_button").click(function() {
		ActionMenu.MoveToken(DIRECTION.Left);
	});
	$("#down_button").click(function() {
		ActionMenu.MoveToken(DIRECTION.Down);
	});
	$("#right_button").click(function() {
		ActionMenu.MoveToken(DIRECTION.Right);
	});



	/**
	 * Chat Room
	 */

	// Ensure that the send button is disabled until the user inputs text
	ChatRoom.Validate();
	$("#message_input").change(ChatRoom.Validate);

	// Send Message
	$("#message_form").submit(function() {
		ChatRoom.OnSubmit($("#message_input").val());
	});


	/**
	 * Game Info
	 */


	/** 
	 * Card Hand
	 */

});

// TODO: Implement this
var GameInfo = {

};


var ChatRoom = {

	// When a message is submitted it is displayed to all users.
	// TODO: Instead of updating the message output here we should construct the
	// JSON message first and the let the server tell us (our client) when to
	// display the message.
	// TODO: Find a way to make the textarea autoscroll as messages come in
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


// TODO: Disable the Secret Room buttons when the player is not in a compatible 
// location.
var ActionMenu = {

	Accuse: function() {
		var msg = Message.Create(MESSAGE_TYPE.Action, COMMAND.Accuse, null);
		sendMessage(msg);
	},

	Suggest: function() {
		var msg = Message.Create(MESSAGE_TYPE.Action, COMMAND.Suggest, null);
		sendMessage(msg);
	},

	SecretRoom: function() {
		var msg = Message.Create(MESSAGE_TYPE.Action, COMMAND.SecretRoom, null);
		sendMessage(msg);
	},

	MoveToken: function(direction) {
		var msg = Message.Create(MESSAGE_TYPE.Action, COMMAND.Move, direction);
		sendMessage(msg);
	},

}; // ActionMenu 


var Message = {

	Create: function(message_type, command, payload) {
		var msg = new Object();
		msg.message_type = message_type;
		msg.command = command;
		// TODO: Figure out how to do the payload stuff
		//msg.payload = payload;
		return msg;
	},

}; // Message


/**
 * Client Subsystem
 * This set of fncs are specific to gameboard and user interaction and UI
 */

var updateGameBoard = function() {
    $.getJSON("/api/game/" + game_uuid, function(gameboard) {
        console.log(gameboard)
        $('#gameboard').text(gameboard.status);
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


/**
 * Client Message and Transport Subsystem (CMTS)
 * This set of fncs are specific to GameAPI communication
 *
 * Message JSON data structure (in YAML)
 * message:
 *   player_uuid: ""
 *   message_type:
 *      - "Action"
 *      - "PrivateAnnouncement"
 *      - "Announcement"
 *   command:
 *      - "Suggest"
 *		- "Accuse"
 *      - "Move"
 *      - "Chat"
 *  payload:
 *      ...
 */

function sendMessage(message) {
	alert("[SEND] Message:" + "\n" +
		"type: " + message.message_type.name + "\n" +
		"command: " + message.command.name + "\n" +
		//"\tpayload: " + message.payload.name + "\n" +
		"\n");
};


function recieveMessage(message) {

};
