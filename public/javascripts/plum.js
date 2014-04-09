/*!
* PlumJS
*
* This contains the JS components of the Client Subsystem (CS) and Client Message and Transport Subsystem (CMTS).
*/

// temp delcarations,
var gameboard, current_player, game_uuid, player;


// Client Subsystem
// This set of fncs are specific to gameboard and user interaction and UI

function updateGameBoard() {}

function getGameTick() {}

function displayCard() {}

function makeSuggestion() {}

function sendCard() {}

function playTurn() {}


//  Client Message and Transport Subsystem (CMTS)
// This set of fncs are specific to GameAPI communication

// Message JSON data structure (in YAML)
// message:
//  player_uuid: ""
//  message_type:
//      - "ACTION"
//      - "PRIVATE_ANNOUNCMENT"
//      - "ANNOUNCMENT"
//  command:
//      - "SUGGEST"
//      - "ACCUSE"
//      - "MOVE"
//      - "CHAT"
//  payload:
//      ...


function sendMessage(message) {}

function recieveMessage(message) {}
