
function weapon(name) {
	this.name = name; 
};
weapon.prototype.toString = function() {
	return this.name;
};
var ROPE 		= new weapon("rope");
var LEAD_PIPE 	= new weapon("lead pipe");
var KNIFE 		= new weapon("knife");
var WRENCH 		= new weapon("wrench");
var CANDLESTICK = new weapon("candlestick");
var REVOLVER 	= new weapon("revolver");

function room(name) {
	this.name = name;
};
room.prototype.toString = function() {
	return this.name;
};
var STUDY 			= new room("Study");
var HALL 			= new room("Hall");
var LOUNGE 			= new room("Lounge");
var BILLIARD 		= new room("Billiard Room");
var DINING 			= new room("Dining Room");
var CONSERVATORY 	= new room("Conservatory");
var BALLROOM 		= new room("Ballroom");
var KITCHEN 		= new room("Kitchen");

function hall(name) {
	this.name = name;
};
hall.prototype.toString = function() {
	return this.name;
};
var STUDYHALL 		= new hall("Study-Hall");
var HALLLOUNGE 		= new hall("Hall-Lounge");
var LIBRARYBILLIARD = new hall("Library-Billiard Room");
var BILLIARDDINING 	= new hall("Billiard-Dining Room");
var CONSERVEBALL 	= new hall("Conservatory-Ballroom");
var BALLKITCHEN 	= new hall("Ballroom-Kitchen");
var STUDYLIBRARY 	= new hall("Study-Library");
var LIBRARYCONSERVE = new hall("Library-Conservatory");
var HALLBILLIARD 	= new hall("Hall-Billiard Room");
var BILLIARDBALL 	= new hall("Billiard Room-Ballroom");
var LOUNGEDINING 	= new hall("Lounge-Dining Room");
var DININGKITCHEN 	= new hall("Dining Room-Kitchen");
	
function suspect(name) {
	this.name = name;
};
suspect.prototype.toString = function() {
	return this.name;
};
var SCARLET = new suspect("Ms. Scarlet");
var MUSTARD = new suspect("Col. Mustard");
var WHITE	= new suspect("Mr. White");
var GREEN	= new suspect("Mr. Green");
var PEACOCK = new suspect("Ms. Peacock");
var PLUM	= new suspect("Prof. Plum");

function triglyph(room, suspect, weapon) {
	this.room = room;
	this.suspect = suspect;
	this.weapon = weapon;
};

function announcement() {
	type;
	playerName;
	playerCharacter;
	triglyph;
	card;
	room;
	cards;
}
function announcementType() {};
var SKIP = new announcementType();
var MOVE = new announcementType();
var SUGGEST = new announcementType();
var FALSE = new announcementType();
var ACCUSE = new announcementType();
var WINNER = new announcementType();
var LOSER = new announcementType();
var NEWPLAYER = new announcementType();

function query() {
	type;
	playerName;
	spaces;
	cards;
	actions;
}
function queryType () {};
var SUGGEST = new queryType();
var ACCUSE = new queryType();
var CARDS = new queryType();
var ACTION = new queryType();

function actionType () {};
var MOVE = new actionType();
var SUGGEST = new actionType();
var ACCUSE = new actionType();
var ENDTURN = new actionType();