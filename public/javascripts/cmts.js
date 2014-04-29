/**
 * Client Message and Transport Subsystem (CMTS)
 * This subsystem is responsible for sending and receiving messages from the
 * game server. All messages follow formatted in a JSON structure described
 * below: 
 *
 * message:
 *   player_uuid: ""
 *   message_type:
 *      - "ACTION"
 *      - "PRIVATEANNOUNCEMENT"
 *      - "ANNOUNCEMENT"
 *      - ...
 *   command:
 *      - "SUGGEST"
 *		- "ACCUSE"
 *      - "MOVE"
 *      - "CHAT"
 *      - ...
 *  payload:
 *      { ... }
 */

var Message = {

	create: function(message_type, command, payload) {
		var msg = new Object();
		msg.message_type = message_type.name;
		msg.command      = command.name;

		// Payload needs to be a dictionary
		msg.payload      = payload;
	
		return msg;
	},

}; // Message

var CMTS = {
	
	sendMessage : function(message) {
		alert("[SEND] Message:" + "\n" +
			"type: " + message.message_type + "\n" +
			"command: " + message.command + "\n" +
			//"\tpayload: " + message.payload.name + "\n" +
			"\n");

		// TODO: Do your $postJSON() call here to post the message to server
	},

	getMessage : function() {

		// TODO: Do your $getJSON() call here to get latest message from server
	},
}
