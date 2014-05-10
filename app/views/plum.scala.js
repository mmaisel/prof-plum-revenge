@(club_uuid: String, player_name: String, player_uuid: String)
/**
 * PlumJS
 * This code is responsible for handling all JQuery requests and forwarding
 * on the necessary data to the subsystems responsible for handling that data.
 */

var club_uuid   = "@club_uuid";
var player_name = "@player_name";
var player_uuid = "@player_uuid";

// We need these for easy access for A_MOVE actions
var player_character = null;
var player_location = null;

// Array of player locations for everyone on the board.
var player_locations = new Array();

// Array of cards currently held by player
var player_hand = new Array();

// Switch to determine if player clicked accusation or suggestion
var accusation = false;


/**
 * JQuery handlers for everything in the game
 */
$(document).ready(function() {

	/**
	 * Action Menu
	 */

	// Accuse
	$("#accuse_button").click(function() {
		// First we send a message to the server and wait for a reply. After 
		// the reply then we can push out the modal
		var msg = Message.query(Q_ACCUSE);
		CMTS.sendMessage(msg);

		// We don't need them to send extra messages :)
		$("#accuse_button").attr("disabled", "disabled");
	});


	// Suggestion
	$("#suggest_button").click(function() {
		// First we send a message to the server and wait for a reply. After 
		// the reply then we can push out the modal
		var msg = Message.query(Q_SUGGEST);
		CMTS.sendMessage(msg);

		// We don't need them to send extra messages :)
		$("#suggest_button").attr("disabled", "disabled");
	});

	// Selection Suggest/Accuse Options
	$("#select_opts_button").click(function() {
		// Accusation
		if (accusation == true) {
			var room = $('input[name=optionsRoom]:checked', 
				'#room_form').val();
			var suspect = $('input[name=optionsSuspect]:checked', 
				'#suspect_form').val();
			var weapon = $('input[name=optionsWeapon]:checked', 
				'#weapon_form').val();
			
			if (room === undefined || 
				suspect === undefined || 
				weapon === undefined) {
				// We need to do something here or send the server a bunch of 
			 	// NULL arguments
			}
			

			ActionMenu.accuse(room, suspect, weapon);
		} 

		// Suggestion
		else {
			var suspect = $('input[name=optionsSuspect]:checked', 
				'#suspect_form').val();
			var weapon = $('input[name=optionsWeapon]:checked', 
				'#weapon_form').val();

			if (suspect === undefined || 
				weapon === undefined) {
				// We need to do something here or send the server a bunch of 
			 	// NULL arguments
			}

			ActionMenu.suggest(suspect, weapon);
		}
	
		// Clear out the options now that we are done with them.
		$('form[id="room_form"]').find("input:radio:checked").prop('checked',false);
		$('form[id="suspect_form"]').find("input:radio:checked").prop('checked',false);
		$('form[id="weapon_form"]').find("input:radio:checked").prop('checked',false);

	});


	$("#end_turn_button").click(function() {
		// Disable all action menu buttons
		$("#up_button").attr("disabled", "disabled");
		$("#left_button").attr("disabled", "disabled");
		$("#down_button").attr("disabled", "disabled");
		$("#right_button").attr("disabled", "disabled");
		$("#secret_room_button").attr("disabled", "disabled");
		$("#accuse_button").attr("disabled", "disabled");
		$("#suggest_button").attr("disabled", "disabled");
		$("#end_turn_button").attr("disabled", "disabled");
		ActionMenu.endTurn();
	});

	// Directions
	// TODO: When the button is clicked we need to disable it (YOURTURN 
	// announcement will re-enable the available moves)
	$("#up_button").click(function() {
		$("#up_button").attr("disabled", "disabled");
		ActionMenu.move(UP);
	});
	$("#left_button").click(function() {
		$("#left_button").attr("disabled", "disabled");
		ActionMenu.move(LEFT);
	});
	$("#down_button").click(function() {
		$("#down_button").attr("disabled", "disabled");
		ActionMenu.move(DOWN);
	});
	$("#right_button").click(function() {
		$("#right_button").attr("disabled", "disabled");
		ActionMenu.move(RIGHT);
	});

	// Secret Room
	$("#secret_room_button").click(function() {
		$("#secret_room_button").attr("disabled", "disabled");
		ActionMenu.move(SECRETROOM);
	})


	/**
	 * Chat Room
	 */

	// Ensure that the send button is disabled until the user inputs text
	MessageBox.validate();
	$("#message_input").change(MessageBox.validate);

	// Send Message
	$("#message_form").submit(function(event) {
		MessageBox.onSubmit($("#message_input").val());
		event.preventDefault(); // Needed to prevent random refreshes

	});


	/**
	 * Display Cards
	 */
	$('#choose_card_button').click(function() {
		var card_type = $('input[name=radioImages]:checked', 
				'#choose_card_form').val();

		// When the user clicks an image in the refute suggestion window, the
		GameBoard.refuteSuggestion(CARD_TYPES[card_type]);
	});

});

