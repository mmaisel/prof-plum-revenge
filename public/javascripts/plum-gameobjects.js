/**
 * Game Objects
 * This file contains a list of enum values used to represent all items in the
 * game. These are used to construct messages to send to the game server and 
 * create objects like cards/players
 */

var MESSAGE_TYPE = {
	ACTION : {
		value: 0, 
		name: "ACTION",
	},

	PRIVATE_ANNOUNCEMENT : { 
		value: 1, 
		name: "PRIVATEANNOUNCEMENT", 
	},
	
	ANNOUNCEMENT : { 
		value: 2,
		name: "ANNOUNCEMENT",
	},
};

var QUERY = {
	SUGGEST     : { value: 0, name: "Suggest" },
	ACCUSE      : { value: 1, name: "Accuse"  },
	CARDS       : { value: 2, name: "Cards"   },
	ACTION      : { value: 3, name: "Action"  },
};


var ANNOUNCEMENT_TYPE = {
	NEWPLAYER : { value: 0, name: "New Player" },
	ACCUSE    : { value: 1, name: "Accuse"     },
	FALSE     : { value: 2, name: "False"      },
	LOSER     : { value: 3, name: "Loser"      },
	MOVE      : { value: 4, name: "Move"       },
	SKIP      : { value: 5, name: "Skip"       },
	SUGGEST   : { value: 6, name: "Suggest"    },
	WINNER    : { value: 7, name: "Winner"     },
	SHOWHAND  : { value: 8, name: "Show hand"  },
	YOURTURN  : { value: 9, name: "Your turn"  },
};

var ACTION = {
	SUGGEST : { 
		value: 0,
		name: "SUGGEST"  
	},

	ACCUSE : { 
		value: 1, 
		name: "ACCUSE"
	},

	MOVE : { 
		value: 2, 
		name: "MOVE"
	},

	CHAT : { 
		value: 3, 
		name: "CHAT"
	},

	END_TURN : {
		value: 4, 
		name: "ENDTURN" 
	},
};



var DIRECTION = {
	UP          : { value: 0, name: "Up"          },
	DOWN        : { value: 1, name: "Down"        },
	LEFT        : { value: 2, name: "Left"        },
	RIGHT       : { value: 3, name: "Right"       },
	SECRET_ROOM : { value: 4, name: "Secret Room" },
};

var WEAPON = {
	ROPE        : { value: 0, name: "Rope"        },
	LEADPIPE    : { value: 1, name: "Lead Pipe"   },
	KNIFE       : { value: 2, name: "Wrench"      },
	WRENCH      : { value: 3, name: "Wrench"      },
	CANDLESTICK : { value: 4, name: "Candlestick" },
	RELVOLVER   : { value: 5, name: "Relvolver"   },
};

var ROOM = {
	STUDY        : { value: 0, name: "Study"        },
	HALL         : { value: 1, name: "Hall"         },
	LOUNGE       : { value: 2, name: "Lounge"       },
	BILLIARD     : { value: 3, name: "Billiard"     },
	DINING       : { value: 4, name: "Dining"       },
	CONSERVATORY : { value: 5, name: "Conservatory" },
	BALLROOM     : { value: 6, name: "Ballroom"     },
	KITCHEN      : { value: 7, name: "Kitchen"      },
	LIBRARY      : { value: 8, name: "Library"      },
};

var SUSPECT = {
	SCARLET : { value: 0, name: "Scarlet" },
	MUSTARD : { value: 1, name: "Mustard" },
	WHITE   : { value: 2, name: "White"   },
	GREEN   : { value: 3, name: "Green"   },
	PEACOCK : { value: 4, name: "Peacock" },
	PLUM    : { value: 5, name: "Plum"    },
};
