var Gameobjects = {
	weapon: function(name) {
		this.name = name; 
	},


	room: function(name) {
		this.name = name;
	},
	

	hall: function(name) {
		this.name = name;
	},


	suspect: function(name) {
		this.name = name;
	},


	triglyphus: function(room, suspect, weapon) {
		this.room = room;
		this.suspect = suspect;
		this.weapon = weapon;
	},


	announcement: function() {
		type = null;
		playerName = null;
		playerCharacter = null;
		trigylphx = null;
		card = null;
		room = null;
		cards = null;
	},


	announcementType: function(name) {
		this.name = name;
	},

	
	query: function() {
		type = null;
		playerName = null;
		spaces = null;
		cards = null;
		actions = null;
	},


	queryType: function(name) {
		this.name = name;
	},


	actionType: function(name) {
		this.name = name;
	},


	direction: function(name) {
		this.name = name;
	},
};


Gameobjects.weapon.prototype.toString = function() {
	return this.name;
};
Gameobjects.room.prototype.toString = function() {
	return this.name;
};
Gameobjects.hall.prototype.toString = function() {
	return this.name;
};
Gameobjects.suspect.prototype.toString = function() {
	return this.name;
};
Gameobjects.triglyphus.prototype.toString = function() {
	var myString = "";
	for (var i in this) {
		if (i=="toString") continue;
		if (this[i] != null) myString = myString + this[i].toString() + ", ";
	}
	return myString;
};
Gameobjects.announcement.prototype.toString = function() {
	var myString = "";
	for (var i in this) {
		if (i=="toString") continue;
		if (this[i] != null) myString = myString + this[i].toString() + ", ";
	}
	return myString;
};
Gameobjects.announcementType.prototype.toString = function() {
	return this.name;
};
Gameobjects.query.prototype.toString = function() {
	var myString = "";
	for (var i in this) {
		if (i=="toString") continue;
		if (this[i] != null) myString = myString + this[i].toString() + ", ";
	}
	return myString;
};
Gameobjects.queryType.prototype.toString = function() {
	return this.name;
};
Gameobjects.actionType.prototype.toString = function() {
	return this.name;
};
Gameobjects.direction.prototype.toString = function() {
	return this.name;
};


var ROPE 		= new Gameobjects.weapon("rope");
var LEADPIPE 	= new Gameobjects.weapon("lead pipe");
var KNIFE 		= new Gameobjects.weapon("knife");
var WRENCH 		= new Gameobjects.weapon("wrench");
var CANDLESTICK = new Gameobjects.weapon("candlestick");
var REVOLVER 	= new Gameobjects.weapon("revolver");
var NOCARD 		= new Gameobjects.weapon("no card");


var STUDY 			= new Gameobjects.room("Study");
var HALL 			= new Gameobjects.room("Hall");
var LOUNGE 			= new Gameobjects.room("Lounge");
var BILLIARD 		= new Gameobjects.room("Billiard Room");
var DINING 			= new Gameobjects.room("Dining Room");
var CONSERVATORY 	= new Gameobjects.room("Conservatory");
var BALLROOM 		= new Gameobjects.room("Ballroom");
var KITCHEN 		= new Gameobjects.room("Kitchen");
var LIBRARY			= new Gameobjects.room("Library");


var STUDYHALL 		= new Gameobjects.hall("Study-Hall");
var HALLLOUNGE 		= new Gameobjects.hall("Hall-Lounge");
var LIBRARYBILLIARD = new Gameobjects.hall("Library-Billiard Room");
var BILLIARDDINING 	= new Gameobjects.hall("Billiard-Dining Room");
var CONSERVEBALL 	= new Gameobjects.hall("Conservatory-Ballroom");
var BALLKITCHEN 	= new Gameobjects.hall("Ballroom-Kitchen");
var STUDYLIBRARY 	= new Gameobjects.hall("Study-Library");
var LIBRARYCONSERVE = new Gameobjects.hall("Library-Conservatory");
var HALLBILLIARD 	= new Gameobjects.hall("Hall-Billiard Room");
var BILLIARDBALL 	= new Gameobjects.hall("Billiard Room-Ballroom");
var LOUNGEDINING 	= new Gameobjects.hall("Lounge-Dining Room");
var DININGKITCHEN 	= new Gameobjects.hall("Dining Room-Kitchen");
	

var SCARLET = new Gameobjects.suspect("Ms. Scarlet");
var MUSTARD = new Gameobjects.suspect("Col. Mustard");
var WHITE	= new Gameobjects.suspect("Mr. White");
var GREEN	= new Gameobjects.suspect("Mr. Green");
var PEACOCK = new Gameobjects.suspect("Ms. Peacock");
var PLUM	= new Gameobjects.suspect("Prof. Plum");


var myTri = new Gameobjects.triglyphus(null, null, null);


var SKIP = new Gameobjects.announcementType("SKIP");
var MOVE = new Gameobjects.announcementType("MOVE");
var SUGGEST = new Gameobjects.announcementType("SUGGEST");
var FALSE = new Gameobjects.announcementType("FALSE");
var ACCUSE = new Gameobjects.announcementType("ACCUSE");
var WINNER = new Gameobjects.announcementType("WINNER");
var LOSER = new Gameobjects.announcementType("LOSER");
var NEWPLAYER = new Gameobjects.announcementType("NEWPLAYER");
var SHOWHAND = new Gameobjects.announcementType("SHOWHAND");
var YOURTURN = new Gameobjects.announcementType("YOURTURN");
var CHAT = new Gameobjects.announcementType("CHAT");


var Q_SUGGEST = new Gameobjects.queryType("SUGGEST");
var Q_ACCUSE = new Gameobjects.queryType("ACCUSE");
var Q_CARDS = new Gameobjects.queryType("CARDS");
var Q_ACTION = new Gameobjects.queryType("ACTION");


var A_MOVE = new Gameobjects.actionType("MOVE");
var A_SUGGEST = new Gameobjects.actionType("SUGGEST");
var A_ACCUSE = new Gameobjects.actionType("ACCUSE");
var A_ENDTURN = new Gameobjects.actionType("ENDTURN");


var UP = new Gameobjects.direction("UP");
var DOWN = new Gameobjects.direction("DOWN");
var LEFT = new Gameobjects.direction("LEFT");
var RIGHT = new Gameobjects.direction("RIGHT");
var SECRETROOM = new Gameobjects.direction("SECRETROOM");