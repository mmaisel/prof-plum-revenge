
function weapon(name) {
	this.name = name; 
};
weapon.prototype.toString = function() {
	return this.name;
};
var ROPE 		= new weapon("rope");
var LEADPIPE 	= new weapon("lead pipe");
var KNIFE 		= new weapon("knife");
var WRENCH 		= new weapon("wrench");
var CANDLESTICK = new weapon("candlestick");
var REVOLVER 	= new weapon("revolver");
var NOCARD 		= new weapon("no card");

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
var LIBRARY			= new room("Library");

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

function trigylphus(room, suspect, weapon) {
	this.room = room;
	this.suspect = suspect;
	this.weapon = weapon;
};
trigylphus.prototype.toString = function() {
	var myString = "";
	for (var i in this) {
		if (i=="toString") continue;
		if (this[i] != null) myString = myString + this[i].toString() + ", ";
	}
	return myString;
};
var myTri = new trigylphus(null, null, null);

function announcement() {
	type = null;
	playerName = null;
	playerCharacter = null;
	trigylphx = null;
	card = null;
	room = null;
	cards = null;
}
announcement.prototype.toString = function() {
	var myString = "";
	for (var i in this) {
		if (i=="toString") continue;
		if (this[i] != null) myString = myString + this[i].toString() + ", ";
	}
	return myString;
};

function announcementType(name) {
	this.name = name;
};
announcementType.prototype.toString = function() {
	return this.name;
};
var SKIP = new announcementType("SKIP");
var MOVE = new announcementType("MOVE");
var SUGGEST = new announcementType("SUGGEST");
var FALSE = new announcementType("FALSE");
var ACCUSE = new announcementType("ACCUSE");
var WINNER = new announcementType("WINNER");
var LOSER = new announcementType("LOSER");
var NEWPLAYER = new announcementType("NEWPLAYER");
var SHOWHAND = new announcementType("SHOWHAND");

function query() {
	type = null;
	playerName = null;
	spaces = null;
	cards = null;
	actions = null;
}
query.prototype.toString = function() {
	var myString = "";
	for (var i in this) {
		if (i=="toString") continue;
		if (this[i] != null) myString = myString + this[i].toString() + ", ";
	}
	return myString;
};

function queryType (name) {
	this.name = name;
};
queryType.prototype.toString = function() {
	return this.name;
}
var Q_SUGGEST = new queryType("SUGGEST");
var Q_ACCUSE = new queryType("ACCUSE");
var Q_CARDS = new queryType("CARDS");
var Q_ACTION = new queryType("ACTION");

function actionType (name) {
	this.name = name;
};
actionType.prototype.toString = function() {
	return this.name;
}
var A_MOVE = new actionType("MOVE");
var A_SUGGEST = new actionType("SUGGEST");
var A_ACCUSE = new actionType("ACCUSE");
var A_ENDTURN = new actionType("ENDTURN");
