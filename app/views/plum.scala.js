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
player_locations[player_character.name] = player_location;

// Array of cards currently held by player
var player_hand = new Array();

// Switch to determine if player clicked accusation or suggestion
var accusation = false;

// Temporary debug switch for END TURN
var debug_switch = false;

/**
 * JQuery handlers for everything in the game
 */
$(document).ready(function() {


	/**
	 * Action Menu
	 */

	// Accuse
	$("#accuse_button").click(function() {
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
	});


	// Suggestion
	$("#suggest_button").click(function() {
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
		//if (debug_switch == false) {
		//debug_switch = true;
		// Disable all action menu buttons
		$("#up_button").attr("disabled", "disabled");
		$("#left_button").attr("disabled", "disabled");
		$("#down_button").attr("disabled", "disabled");
		$("#right_button").attr("disabled", "disabled");
		$("#secret_room_button").attr("disabled", "disabled");
		$("#accuse_button").attr("disabled", "disabled");
		$("#suggest_button").attr("disabled", "disabled");
		//$("#end_turn_button").attr("disabled", "disabled");
		ActionMenu.endTurn();
		/*} else {
			// Do things here to trigger stuff (at least until server works)
			debug_switch = false;
			$("#" + DININGKITCHEN).data("occupied", true);
			var a = new Gameobjects.announcement();
			a.type = YOURTURN;
			GameBoard.playTurn(a);
		}*/
	});

	// Directions
	// TODO: When the button is clicked we need to disable it (YOURTURN 
	// announcement will re-enable the available moves)
	$("#up_button").click(function() {
		ActionMenu.move(UP);
	});
	$("#left_button").click(function() {
		ActionMenu.move(LEFT);
	});
	$("#down_button").click(function() {
		ActionMenu.move(DOWN);
	});
	$("#right_button").click(function() {
		ActionMenu.move(RIGHT);
	});

	// Secret Room
	$("#secret_room_button").click(function() {
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

});

