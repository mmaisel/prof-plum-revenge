var Gameobjects = {
	weapon: function(name) {
		this.name = name; 
	},


	room: function(name, value) {
		this.name = name;
		this.value = value;
	},
	

	hall: function(name, value) {
		this.name = name;
		this.value = value;
	},


	suspect: function(name, value, color) {
		this.name = name;
		this.value = value;
		this.color = color;
	},


	triglyph: function(room, suspect, weapon) {
		this.room = room;
		this.suspect = suspect;
		this.weapon = weapon;
	},


	announcement: function() {
		type = null; // Type of message
		playerName = null; // Player's name
		playerCharacter = null; // Character
		triglyph = null; // triglyph
		card = null;
		space = null;
		cards = null; // Array of Cards
		text = null;  // Chat room text
	},


	announcementType: function(name, value) {
		this.name = name;
		this.value = value;
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


	actionType: function(name, value) {
		this.name = name;
		this.value = value;
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


	// Culmination of all message things recieved from the server
	message: function() {
		type = null; // Type of message
		playerName = null; // Player's name
		playerCharacter = null; // Character
		triglyph = null; // triglyph
		card = null;
		space = null;
		cards = null; // Array of Cards
		text = null;  // Chat room text
		spaces = null;
		actions = null;
	}
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
Gameobjects.triglyph.prototype.toString = function() {
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
var SCARLET = new Gameobjects.suspect("Ms. Scarlet", 0, "scarlet");
var MUSTARD = new Gameobjects.suspect("Col. Mustard", 1, "mustard");
var WHITE	= new Gameobjects.suspect("Mrs. White", 2, "white");
var GREEN	= new Gameobjects.suspect("Mr. Green", 3, "green");
var PEACOCK = new Gameobjects.suspect("Mrs. Peacock", 4, "peacock");
var PLUM	= new Gameobjects.suspect("Prof. Plum", 5, "plum");

var CHAT = new Gameobjects.announcementType("CHAT", 0);
var SKIP = new Gameobjects.announcementType("SKIP", 1);
var MOVE = new Gameobjects.announcementType("MOVE", 2);
var SUGGEST = new Gameobjects.announcementType("SUGGEST", 3);
var FALSE = new Gameobjects.announcementType("FALSE", 4);
var ACCUSE = new Gameobjects.announcementType("ACCUSE", 5);
var WINNER = new Gameobjects.announcementType("WINNER", 6);
var LOSER = new Gameobjects.announcementType("LOSER", 7);
var NEWPLAYER = new Gameobjects.announcementType("NEWPLAYER", 8);
var SHOWHAND = new Gameobjects.announcementType("SHOWHAND", 9);
var NOP = new Gameobjects.announcementType("NOP", 10);

var Q_SUGGEST = new Gameobjects.queryType("Q_SUGGEST");
var Q_ACCUSE = new Gameobjects.queryType("Q_ACCUSE");
var Q_CARDS  = new Gameobjects.queryType("Q_CARDS");
var Q_ACTION = new Gameobjects.queryType("Q_ACTION");

// STARTTURN = 0 (not used)
var A_MOVE = new Gameobjects.actionType("A_MOVE", 1);
var A_SUGGEST = new Gameobjects.actionType("A_SUGGEST", 2);
var A_ACCUSE = new Gameobjects.actionType("A_ACCUSE", 3);
var A_ENDTURN = new Gameobjects.actionType("A_ENDTURN", 4);

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
var STUDY 		 = new Gameobjects.room("Study", 0);
var HALL 		 = new Gameobjects.room("Hall", 1);
var LOUNGE 		 = new Gameobjects.room("Lounge", 2);
var LIBRARY		 = new Gameobjects.room("Library", 3);
var BILLIARD 	 = new Gameobjects.room("Billiard", 4);
var DINING 		 = new Gameobjects.room("Dining", 5);
var CONSERVATORY = new Gameobjects.room("Conservatory", 6);
var BALLROOM 	 = new Gameobjects.room("Ballroom", 7);
var KITCHEN 	 = new Gameobjects.room("Kitchen", 8);

/**
 * Keep the '-' character in these names. The YOURTURN logic relies on it to 
 * determine if the location is a room or a location.
 */

var STUDYHALL 		= new Gameobjects.hall("Study-Hall", 0);
var HALLLOUNGE 		= new Gameobjects.hall("Hall-Lounge", 1);
var LIBRARYBILLIARD = new Gameobjects.hall("Library-Billiard", 2);
var BILLIARDDINING 	= new Gameobjects.hall("Billiard-Dining", 3);
var CONSERVEBALL 	= new Gameobjects.hall("Conservatory-Ballroom", 4);
var BALLKITCHEN 	= new Gameobjects.hall("Ballroom-Kitchen", 5);
var STUDYLIBRARY 	= new Gameobjects.hall("Study-Library", 6);
var LIBRARYCONSERVE = new Gameobjects.hall("Library-Conservatory", 7);
var HALLBILLIARD 	= new Gameobjects.hall("Hall-Billiard", 8);
var BILLIARDBALL 	= new Gameobjects.hall("Billiard-Ballroom", 9);
var LOUNGEDINING 	= new Gameobjects.hall("Lounge-Dining", 10);
var DININGKITCHEN 	= new Gameobjects.hall("Dining-Kitchen", 11);


var MESSAGE_TYPES = new Array();
MESSAGE_TYPES[SKIP.name] = SKIP;
MESSAGE_TYPES[MOVE.name] = MOVE;
MESSAGE_TYPES[SUGGEST.name] = SUGGEST;
MESSAGE_TYPES[FALSE.name] = FALSE;
MESSAGE_TYPES[ACCUSE.name] = ACCUSE;
MESSAGE_TYPES[WINNER.name] = WINNER;
MESSAGE_TYPES[LOSER.name] = LOSER;
MESSAGE_TYPES[NEWPLAYER.name] = NEWPLAYER;
MESSAGE_TYPES[SHOWHAND.name] = SHOWHAND;
MESSAGE_TYPES[CHAT.name] = CHAT;
MESSAGE_TYPES[NOP.name] = NOP;
MESSAGE_TYPES[Q_SUGGEST.name] = Q_SUGGEST;
MESSAGE_TYPES[Q_ACCUSE.name] = Q_ACCUSE;
MESSAGE_TYPES[Q_CARDS.name] = Q_CARDS;
MESSAGE_TYPES[Q_ACTION.name] = Q_ACTION;


var CARD_TYPES = new Array();
CARD_TYPES[SCARLET.name] = SCARLET;
CARD_TYPES[MUSTARD.name] = MUSTARD;
CARD_TYPES[WHITE.name] = WHITE;
CARD_TYPES[GREEN.name] = GREEN;
CARD_TYPES[PEACOCK.name] = PEACOCK;
CARD_TYPES[PLUM.name] = PLUM;
CARD_TYPES[ROPE.name] = ROPE;
CARD_TYPES[LEADPIPE.name] = LEADPIPE;
CARD_TYPES[KNIFE.name] = KNIFE;
CARD_TYPES[WRENCH.name] = WRENCH;
CARD_TYPES[CANDLESTICK.name] = CANDLESTICK;
CARD_TYPES[REVOLVER.name] = REVOLVER;
CARD_TYPES[NOCARD.name] = NOCARD;
CARD_TYPES[STUDY.name] = STUDY;
CARD_TYPES[HALL.name] = HALL;
CARD_TYPES[LOUNGE.name] = LOUNGE;
CARD_TYPES[LIBRARY.name] = LIBRARY;
CARD_TYPES[BILLIARD.name] = BILLIARD;
CARD_TYPES[DINING.name] = DINING;
CARD_TYPES[CONSERVATORY.name] = CONSERVATORY;
CARD_TYPES[BALLROOM.name] = BALLROOM;
CARD_TYPES[KITCHEN.name] = KITCHEN;


var SPACE_TYPES = new Array();
SPACE_TYPES[STUDY.name] = STUDY;
SPACE_TYPES[HALL.name] = HALL;
SPACE_TYPES[LOUNGE.name] = LOUNGE;
SPACE_TYPES[LIBRARY.name] = LIBRARY;
SPACE_TYPES[BILLIARD.name] = BILLIARD;
SPACE_TYPES[DINING.name] = DINING;
SPACE_TYPES[CONSERVATORY.name] = CONSERVATORY;
SPACE_TYPES[BALLROOM.name] = BALLROOM;
SPACE_TYPES[KITCHEN.name] = KITCHEN;
SPACE_TYPES[STUDYHALL.name] = STUDYHALL;
SPACE_TYPES[HALLLOUNGE.name] = HALLLOUNGE;
SPACE_TYPES[STUDYLIBRARY.name] = STUDYLIBRARY;
SPACE_TYPES[HALLBILLIARD.name] = HALLBILLIARD;
SPACE_TYPES[LOUNGEDINING.name] = LOUNGEDINING;
SPACE_TYPES[LIBRARYBILLIARD.name] = LIBRARYBILLIARD;
SPACE_TYPES[BILLIARDDINING.name] = BILLIARDDINING;
SPACE_TYPES[LIBRARYCONSERVE.name] = LIBRARYCONSERVE;
SPACE_TYPES[BILLIARDBALL.name] = BILLIARDBALL;
SPACE_TYPES[DININGKITCHEN.name] = DININGKITCHEN;
SPACE_TYPES[CONSERVEBALL.name] = CONSERVEBALL;
SPACE_TYPES[BALLKITCHEN.name] = BALLKITCHEN;

var ACTION_TYPES = new Array();
ACTION_TYPES[A_MOVE.name] = A_MOVE;
ACTION_TYPES[A_SUGGEST.name] = A_SUGGEST;
ACTION_TYPES[A_ACCUSE.name] = A_ACCUSE;
ACTION_TYPES[A_ENDTURN.name] = A_ENDTURN;

var CHARACTER_TYPES = new Array();
CHARACTER_TYPES[SCARLET.name] = SCARLET;
CHARACTER_TYPES[MUSTARD.name] = MUSTARD;
CHARACTER_TYPES[WHITE.name] = WHITE;
CHARACTER_TYPES[GREEN.name] = GREEN;
CHARACTER_TYPES[PEACOCK.name] = PEACOCK;
CHARACTER_TYPES[PLUM.name] = PLUM;

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

