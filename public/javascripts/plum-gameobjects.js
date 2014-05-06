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


	suspect: function(name, value) {
		this.name = name;
		this.value = value;
	},


	triglyphus: function(room, suspect, weapon) {
		this.room = room;
		this.suspect = suspect;
		this.weapon = weapon;
	},


	announcement: function() {
		type = null; // Type of message
		playerName = null; // Player's name
		playerCharacter = null; // Character
		trigylphx = null; // triglyphus
		card = null;
		space = null;
		cards = null; // Array of Cards
		text = null;  // Chat room text
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
		text = null; // Chat room text
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

	path: function(name) {
		this.name   = name; // Current location name
		this.up     = null; // UP from current location
		this.down   = null; // DOWN from current location
		this.left   = null; // LEFT from current location
		this.right  = null; // RIGHT from current location
		this.secret = null; // SECRETROOM from current location
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

Gameobjects.path.prototype.toString = function() {
	var myString = "";
	for (var i in this) {
		if (i=="toString") continue;
		if (this[i] != null) {
			myString = myString + i + ": " + this[i].toString() + ", ";
		}
	}
	return myString;
};

/**
 * These should match tokens ordering from cs.js
 * 	tokens : { 
		0: "scarlet_token",
		1: "mustard_token",
		2: "white_token",
		3: "green_token",
		4: "peacock_token",
		5: "plum_token",
	},
 */
var SCARLET = new Gameobjects.suspect("Ms. Scarlet", 0);
var MUSTARD = new Gameobjects.suspect("Col. Mustard", 1);
var WHITE	= new Gameobjects.suspect("Mr. White", 2);
var GREEN	= new Gameobjects.suspect("Mr. Green", 3);
var PEACOCK = new Gameobjects.suspect("Ms. Peacock", 4);
var PLUM	= new Gameobjects.suspect("Prof. Plum", 5);

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
var NOP = new Gameobjects.announcementType("NOP");


var Q_SUGGEST = new Gameobjects.queryType("SUGGEST");
var Q_ACCUSE = new Gameobjects.queryType("ACCUSE");
var Q_CARDS = new Gameobjects.queryType("CARDS");
var Q_ACTION = new Gameobjects.queryType("ACTION");


var A_MOVE = new Gameobjects.actionType("MOVE");
var A_SUGGEST = new Gameobjects.actionType("SUGGEST");
var A_ACCUSE = new Gameobjects.actionType("ACCUSE");
var A_ENDTURN = new Gameobjects.actionType("ENDTURN");
var A_CHAT = new Gameobjects.actionType("CHAT");


var UP = new Gameobjects.direction("UP");
var DOWN = new Gameobjects.direction("DOWN");
var LEFT = new Gameobjects.direction("LEFT");
var RIGHT = new Gameobjects.direction("RIGHT");
var SECRETROOM = new Gameobjects.direction("SECRETROOM");


var ROPE 		= new Gameobjects.weapon("rope");
var LEADPIPE 	= new Gameobjects.weapon("lead pipe");
var KNIFE 		= new Gameobjects.weapon("knife");
var WRENCH 		= new Gameobjects.weapon("wrench");
var CANDLESTICK = new Gameobjects.weapon("candlestick");
var REVOLVER 	= new Gameobjects.weapon("revolver");
var NOCARD 		= new Gameobjects.weapon("no card");


/**
 * The rooms and halls are used as IDs in the HTML gameboard, so if you change
 * something here, you should update it there as well.
 */
var STUDY 		 = new Gameobjects.room("Study");
var HALL 		 = new Gameobjects.room("Hall");
var LOUNGE 		 = new Gameobjects.room("Lounge");
var LIBRARY		 = new Gameobjects.room("Library");
var BILLIARD 	 = new Gameobjects.room("Billiard");
var DINING 		 = new Gameobjects.room("Dining");
var CONSERVATORY = new Gameobjects.room("Conservatory");
var BALLROOM 	 = new Gameobjects.room("Ballroom");
var KITCHEN 	 = new Gameobjects.room("Kitchen");

/**
 * Keep the '-' character in these names. The YOURTURN logic relies on it to 
 * determine if the location is a room or a location.
 */

var STUDYHALL 		= new Gameobjects.hall("Study-Hall");
var HALLLOUNGE 		= new Gameobjects.hall("Hall-Lounge");
var STUDYLIBRARY 	= new Gameobjects.hall("Study-Library");
var HALLBILLIARD 	= new Gameobjects.hall("Hall-Billiard");
var LOUNGEDINING 	= new Gameobjects.hall("Lounge-Dining");
var LIBRARYBILLIARD = new Gameobjects.hall("Library-Billiard");
var BILLIARDDINING 	= new Gameobjects.hall("Billiard-Dining");
var LIBRARYCONSERVE = new Gameobjects.hall("Library-Conservatory");
var BILLIARDBALL 	= new Gameobjects.hall("Billiard-Ballroom");
var DININGKITCHEN 	= new Gameobjects.hall("Dining-Kitchen");
var CONSERVEBALL 	= new Gameobjects.hall("Conservatory-Ballroom");
var BALLKITCHEN 	= new Gameobjects.hall("Ballroom-Kitchen");


/**
 * Directional Information for Gameboard - make fun all you want, but at least
 * with a hardcoded table you can't mess it up with hard logic...
 */

// Row 1
var P_STUDY = new Gameobjects.path(STUDY.name);
	P_STUDY.right  = STUDYHALL;
	P_STUDY.down   = STUDYLIBRARY;
	P_STUDY.secret = KITCHEN;

var P_STUDYHALL = new Gameobjects.path(STUDYHALL.name);
	P_STUDYHALL.left  = STUDY;
	P_STUDYHALL.right = HALL;

var P_HALL = new Gameobjects.path(HALL.name);
	P_HALL.left  = STUDYHALL;
	P_HALL.right = HALLLOUNGE;
	P_HALL.down  = HALLBILLIARD;

var P_HALLLOUNGE = new Gameobjects.path(HALLLOUNGE.name);
	P_HALLLOUNGE.left  = HALL;
	P_HALLLOUNGE.right = LOUNGE;

var P_LOUNGE = new Gameobjects.path(LOUNGE.name);
	P_LOUNGE.left   = HALLLOUNGE;
	P_LOUNGE.down   = LOUNGEDINING;
	P_LOUNGE.secret = CONSERVATORY;

// Row 2
var P_STUDYLIBRARY = new Gameobjects.path(STUDYLIBRARY.name);
	P_STUDYLIBRARY.up   = STUDY;
	P_STUDYLIBRARY.down = LIBRARY;

var P_HALLBILLIARD = new Gameobjects.path(HALLBILLIARD.name);
	P_HALLBILLIARD.up   = HALL;
	P_HALLBILLIARD.down = BILLIARD;

var P_LOUNGEDINING = new Gameobjects.path(LOUNGEDINING.name);
	P_LOUNGEDINING.up   = LOUNGE;
	P_LOUNGEDINING.down = DINING;

// Row 3
var P_LIBRARY = new Gameobjects.path(LIBRARY.name);
	P_LIBRARY.up    = STUDYLIBRARY;
	P_LIBRARY.down  = LIBRARYCONSERVE;
	P_LIBRARY.right = LIBRARYBILLIARD;

var P_LIBRARYBILLIARD = new Gameobjects.path(LIBRARYBILLIARD.name);
	P_LIBRARYBILLIARD.left = LIBRARY;
	P_LIBRARYBILLIARD.right = BILLIARD;

var P_BILLIARD = new Gameobjects.path(BILLIARD.name);
	P_BILLIARD.up    = HALLBILLIARD;
	P_BILLIARD.left  = LIBRARYBILLIARD;
	P_BILLIARD.right = BILLIARDDINING;
	P_BILLIARD.down  = BILLIARDBALL;

var P_BILLIARDDINING = new Gameobjects.path(BILLIARDDINING.name);
	P_BILLIARDDINING.left  = BILLIARD;
	P_BILLIARDDINING.right = DINING;

var P_DINING = new Gameobjects.path(DINING.name);
	P_DINING.up   = LOUNGEDINING;
	P_DINING.left = BILLIARDDINING;
	P_DINING.down = DININGKITCHEN;

// Row 4
var P_LIBRARYCONSERVE = new Gameobjects.path(LIBRARYCONSERVE.name);
	P_LIBRARYCONSERVE.up   = LIBRARY;
	P_LIBRARYCONSERVE.down = CONSERVATORY;

var P_BILLIARDBALL = new Gameobjects.path(BILLIARDBALL.name);
	P_BILLIARDBALL.up   = BILLIARD;
	P_BILLIARDBALL.down = BALLROOM;

var P_DININGKITCHEN = new Gameobjects.path(DININGKITCHEN.name);
	P_DININGKITCHEN.up   = DINING;
	P_DININGKITCHEN.down = KITCHEN;

// Row 5
var P_CONSERVATORY = new Gameobjects.path(CONSERVATORY.name);
	P_CONSERVATORY.up     = LIBRARYCONSERVE;
	P_CONSERVATORY.right  = CONSERVEBALL;
	P_CONSERVATORY.secret = LOUNGE;

var P_CONSERVEBALL = new Gameobjects.path(CONSERVEBALL.name);
	P_CONSERVEBALL.left  = CONSERVATORY;
	P_CONSERVEBALL.right = BALLROOM;

var P_BALLROOM = new Gameobjects.path(BALLROOM.name);
	P_BALLROOM.left  = CONSERVEBALL;
	P_BALLROOM.up    = BILLIARDBALL;
	P_BALLROOM.right = BALLKITCHEN;

var P_BALLKITCHEN = new Gameobjects.path(BALLKITCHEN.name);
	P_BALLKITCHEN.left = BALLROOM;
	P_BALLKITCHEN.right = KITCHEN;

var P_KITCHEN = new Gameobjects.path(KITCHEN.name);
	P_KITCHEN.up = DININGKITCHEN;
	P_KITCHEN.left = BALLKITCHEN;
	P_KITCHEN.secret = STUDY;


var GAMEBOARDMOVES = new Array();

// Row 1
GAMEBOARDMOVES[P_STUDY.name]      = P_STUDY;
GAMEBOARDMOVES[P_STUDYHALL.name]  = P_STUDYHALL;
GAMEBOARDMOVES[P_HALL.name]       = P_HALL;
GAMEBOARDMOVES[P_HALLLOUNGE.name] = P_HALLLOUNGE;
GAMEBOARDMOVES[P_LOUNGE.name]     = P_LOUNGE;

// Row 2
GAMEBOARDMOVES[P_STUDYLIBRARY.name] = P_STUDYLIBRARY;
GAMEBOARDMOVES[P_HALLBILLIARD.name] = P_HALLBILLIARD;
GAMEBOARDMOVES[P_LOUNGEDINING.name] = P_LOUNGEDINING;

// Row 3
GAMEBOARDMOVES[P_LIBRARY.name]         = P_LIBRARY;
GAMEBOARDMOVES[P_LIBRARYBILLIARD.name] = P_LIBRARYBILLIARD;
GAMEBOARDMOVES[P_BILLIARD.name]        = P_BILLIARD;
GAMEBOARDMOVES[P_BILLIARDDINING.name]  = P_BILLIARDDINING;
GAMEBOARDMOVES[P_DINING.name]          = P_DINING;

// Row 4
GAMEBOARDMOVES[P_LIBRARYCONSERVE.name] = P_LIBRARYCONSERVE;
GAMEBOARDMOVES[P_BILLIARDBALL.name]    = P_BILLIARDBALL;
GAMEBOARDMOVES[P_DININGKITCHEN.name]   = P_DININGKITCHEN;

// Row 5
GAMEBOARDMOVES[P_CONSERVATORY.name] = P_CONSERVATORY;
GAMEBOARDMOVES[P_CONSERVEBALL.name] = P_CONSERVEBALL;
GAMEBOARDMOVES[P_BALLROOM.name]     = P_BALLROOM;
GAMEBOARDMOVES[P_BALLKITCHEN.name]  = P_BALLKITCHEN;
GAMEBOARDMOVES[P_KITCHEN.name]      = P_KITCHEN;

