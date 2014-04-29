@(game_uuid: String, player_name: String, player_uuid: String)
/**
 * PlumJS
 * This code is responsible for handling all JQuery requests and forwarding
 * on the necessary data to the subsystems responsible for handling that data.
 */


var game_uuid = "@game_uuid";
var player_name = "@player_name";
var player_uuid = "@player_uuid"


/**
 * JQuery handlers for everything in the game
 */
$(document).ready(function() {

	/**
	 * Action Menu
	 */

	// Accuse
	$("#accuse_button").click(function() {
		ActionMenu.accuse();
	});

	// Suggestion
	$("#suggestion_button").click(function() {
		ActionMenu.suggest();
	});


	// Directions
	$("#up_button").click(function() {
		ActionMenu.moveToken(DIRECTION.UP);
	});
	$("#left_button").click(function() {
		ActionMenu.moveToken(DIRECTION.LEFT);
	});
	$("#down_button").click(function() {
		ActionMenu.moveToken(DIRECTION.DOWN);
	});
	$("#right_button").click(function() {
		ActionMenu.moveToken(DIRECTION.RIGHT);
	});

	// Secret Room
	$("#secret_room_button").click(function() {
		ActionMenu.moveToken(DIRECTION.SECRET_ROOM);
	})


	/**
	 * Chat Room
	 */

	// Ensure that the send button is disabled until the user inputs text
	ChatRoom.Validate();
	$("#message_input").change(ChatRoom.Validate);

	// Send Message
	$("#message_form").submit(function(event) {
		ChatRoom.OnSubmit($("#message_input").val());
		event.preventDefault(); // Needed to prevent random refreshes

	});

});








