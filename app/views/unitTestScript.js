//C:\github\prof-plum-revenge\bin>java -jar clueless.jar
//Welcome to the ClueLess Game.
//Select an action: [0]Start Game, [1]Add a player, [2]Delete a player, [3]List stats [4]Quit: 1
//Enter your name: Jim
//Select an action: [0]Start Game, [1]Add a player, [2]Delete a player, [3]List stats [4]Quit: 1
//Enter your name: Sam
//Select an action: [0]Start Game, [1]Add a player, [2]Delete a player, [3]List stats [4]Quit: 0

var aIndex = 0;
var a = new Array();
var qIndex = 0;
var q = new Array();
var rIndex = 0;
var r = new Array();
//Sam has joined the game as Colonel Mustard.
a[aIndex] = new announcement();
a[aIndex].type = NEWPLAYER;
a[aIndex].playerName = "Sam";
a[aIndex].playerCharacter = MUSTARD;
aIndex = aIndex+1;
//Colonel Mustard has moved to the Lounge-Dining Room Hallway.
a[aIndex] = new announcement();
a[aIndex].type = MOVE;
a[aIndex].playerCharacter = MUSTARD;
a[aIndex].room = LOUNGEDINING;
aIndex = aIndex+1;
//Jim has joined the game as Miss Scarlet.
a[aIndex] = new announcement();
a[aIndex].type = NEWPLAYER;
a[aIndex].playerName = "Jim";
a[aIndex].playerCharacter = SCARLET;
aIndex = aIndex+1;
//Miss Scarlet has moved to the Hall-Lounge Hallway.
a[aIndex] = new announcement();
a[aIndex].type = MOVE;
a[aIndex].playerCharacter = SCARLET;
a[aIndex].room = HALLLOUNGE;
aIndex = aIndex+1;
//Jim: Cards: Dining Room, Study, Miss Scarlet, Candlestick, Lounge, Professor Plum, Library, Hall, Colonel Mustard,
a[aIndex] = new announcement();
a[aIndex].type = SHOWHAND;
a[aIndex].playerName = "Jim";
a[aIndex].cards = [DINING, STUDY, SCARLET, CANDLESTICK, LOUNGE, PLUM, LIBRARY, HALL, MUSTARD ];
aIndex = aIndex+1;
//Sam: Cards: Mr. Green, Mrs. White, Revolver, Knife, Lead Pipe, Billiard Room, Conservatory, Wrench, Kitchen,

//Jim: Select an action: [0] MOVE,  :0
//Jim: Select a move: [0] Hall, [1] Lounge,  :0
q[qIndex] = new query();
q[qIndex].type = Q_ACTION;
q[qIndex].playerName = "Jim";
q[qIndex].spaces = [ HALL, LOUNGE ];
q[qIndex].actions = [ A_MOVE ];
qIndex = qIndex+1;
r[rIndex] = [ A_MOVE, HALL ];
rIndex = rIndex+1;
//Miss Scarlet has moved to the Hall.
a[aIndex] = new announcement();
a[aIndex].type = MOVE;
a[aIndex].playerCharacter = SCARLET;
a[aIndex].room = HALL;
aIndex = aIndex+1;
//Jim: Select an action: [0] SUGGEST, [1] ACCUSE, [2] ENDTURN,  :0
q[qIndex] = new query();
q[qIndex].type = Q_ACTION;
q[qIndex].playerName = "Jim";
q[qIndex].actions = [ A_SUGGEST, A_ACCUSE, A_ENDTURN ];
qIndex = qIndex+1;
r[rIndex] = A_SUGGEST;
rIndex = rIndex+1;
//Jim: Select a weapon: [0] Rope, [1] Lead Pipe, [2] Knife, [3] Wrench, [4] Candlestick, [5] Revolver,  :1
//Jim: Select a suspect: [0] Miss Scarlet, [1] Colonel Mustard, [2] Mrs. White, [3] Mr. Green, [4] Mrs. Peacock, [5] Professor Plum,  :2
q[qIndex] = new query();
q[qIndex].type = Q_SUGGEST;
q[qIndex].playerName = "Jim";
qIndex = qIndex+1;
r[rIndex] = new trigylphus( null, LEADPIPE, WHITE );
rIndex = rIndex+1;
//Jim suggests the crime was committed in the Hall by Mrs. White with the Lead Pipe.
a[aIndex] = new announcement();
a[aIndex].type = SUGGEST;
a[aIndex].playerName = "Jim";
a[aIndex].trigylphx = new trigylphus( null, LEADPIPE, WHITE );
aIndex = aIndex+1;
//Mrs. White has moved to the Hall.
a[aIndex] = new announcement();
a[aIndex].type = MOVE;
a[aIndex].playerCharacter = WHITE;
a[aIndex].room = HALL;
aIndex = aIndex+1;
//Sam: Select a card: [0] Mrs. White, [1] Lead Pipe,  :0
//The Mrs. White card is shown.
a[aIndex] = new announcement();
a[aIndex].type = FALSE;
a[aIndex].card = WHITE;
aIndex = aIndex+1;
//Jim: Select an action: [0] ACCUSE, [1] ENDTURN,  :1
q[qIndex] = new query();
q[qIndex].type = Q_ACTION;
q[qIndex].playerName = "Jim";
q[qIndex].actions = [ A_ACCUSE, A_ENDTURN ];
qIndex = qIndex+1;
r[rIndex] = A_ENDTURN;
rIndex = rIndex+1;
//Sam: Select an action: [0] MOVE,  :0
//Sam: Select a move: [0] Lounge, [1] Dining Room,  :0
//Colonel Mustard has moved to the Lounge.
a[aIndex] = new announcement();
a[aIndex].type = MOVE;
a[aIndex].playerCharacter = MUSTARD;
a[aIndex].room = LOUNGE;
aIndex = aIndex+1;
//Sam: Select an action: [0] SUGGEST, [1] ACCUSE, [2] ENDTURN,  :0
//Sam: Select a weapon: [0] Rope, [1] Lead Pipe, [2] Knife, [3] Wrench, [4] Candlestick, [5] Revolver,  :0
//Sam: Select a suspect: [0] Miss Scarlet, [1] Colonel Mustard, [2] Mrs. White, [3] Mr. Green, [4] Mrs. Peacock, [5] Professor Plum,  :0
//Sam suggests the crime was committed in the Lounge by Miss Scarlet with the Rope.
a[aIndex] = new announcement();
a[aIndex].type = SUGGEST;
a[aIndex].playerName = "Sam";
a[aIndex].trigylphx = new trigylphus( null, ROPE, SCARLET );
aIndex = aIndex+1;
//Miss Scarlet has moved to the Lounge.
a[aIndex] = new announcement();
a[aIndex].type = MOVE;
a[aIndex].playerCharacter = SCARLET;
a[aIndex].room = LOUNGE;
aIndex = aIndex+1;
//Jim: Select a card: [0] Miss Scarlet, [1] Lounge,  :1
q[qIndex] = new query();
q[qIndex].type = Q_CARDS;
q[qIndex].playerName = "Jim";
q[qIndex].cards = [ WHITE, LEADPIPE ];
qIndex = qIndex+1;
r[rIndex] = WHITE;
rIndex = rIndex+1;
//The Lounge card is shown.
a[aIndex] = new announcement();
a[aIndex].type = FALSE;
a[aIndex].card = LOUNGE;
aIndex = aIndex+1;
//Sam: Select an action: [0] ACCUSE, [1] ENDTURN,  :1
//Jim: Select an action: [0] MOVE, [1] ACCUSE, [2] ENDTURN,  :0
//Jim: Select a move: [0] Conservatory, [1] Hall-Lounge Hallway, [2] Lounge-Dining Room Hallway,  :1
q[qIndex] = new query();
q[qIndex].type = Q_ACTION;
q[qIndex].playerName = "Jim";
q[qIndex].spaces = [ CONSERVATORY, HALLLOUNGE, LOUNGEDINING ];
q[qIndex].actions = [ A_MOVE, A_ACCUSE, A_ENDTURN ];
qIndex = qIndex+1;
r[rIndex] = [A_MOVE, HALLLOUNGE ];
rIndex = rIndex+1;
//Miss Scarlet has moved to the Hall-Lounge Hallway.
a[aIndex] = new announcement();
a[aIndex].type = MOVE;
a[aIndex].playerCharacter = SCARLET;
a[aIndex].room = HALLLOUNGE;
aIndex = aIndex+1;
//Jim: Select an action: [0] ACCUSE, [1] ENDTURN,  :1
q[qIndex] = new query();
q[qIndex].type = Q_ACTION;
q[qIndex].playerName = "Jim";
q[qIndex].actions = [ A_ACCUSE, A_ENDTURN ];
qIndex = qIndex+1;
r[rIndex] = [A_ENDTURN ];
rIndex = rIndex+1;
//Sam: Select an action: [0] MOVE, [1] ACCUSE, [2] ENDTURN,  :0
//Sam: Select a move: [0] Conservatory, [1] Lounge-Dining Room Hallway,  :0
//Colonel Mustard has moved to the Conservatory.
a[aIndex] = new announcement();
a[aIndex].type = MOVE;
a[aIndex].playerCharacter = MUSTARD;
a[aIndex].room = CONSERVATORY;
aIndex = aIndex+1;
//Sam: Select an action: [0] SUGGEST, [1] ACCUSE, [2] ENDTURN,  :0
//Sam: Select a weapon: [0] Rope, [1] Lead Pipe, [2] Knife, [3] Wrench, [4] Candlestick, [5] Revolver,  :2
//Sam: Select a suspect: [0] Miss Scarlet, [1] Colonel Mustard, [2] Mrs. White, [3] Mr. Green, [4] Mrs. Peacock, [5] Professor Plum,  :3
//Sam suggests the crime was committed in the Conservatory by Mr. Green with the Knife.
a[aIndex] = new announcement();
a[aIndex].type = SUGGEST;
a[aIndex].playerName = "Sam";
a[aIndex].trigylphx = new trigylphus( CONSERVATORY, KNIFE, GREEN );
aIndex = aIndex+1;
//No card is shown.
a[aIndex] = new announcement();
a[aIndex].type = FALSE;
a[aIndex].card = NOCARD;
aIndex = aIndex+1;
//Sam: Select an action: [0] ACCUSE, [1] ENDTURN,  :0
//Sam: Select a weapon: [0] Rope, [1] Lead Pipe, [2] Knife, [3] Wrench, [4] Candlestick, [5] Revolver,  :2
//Sam: Select a suspect: [0] Miss Scarlet, [1] Colonel Mustard, [2] Mrs. White, [3] Mr. Green, [4] Mrs. Peacock, [5] Professor Plum,  :3
//Sam: Select a room: [0] Study, [1] Hall, [2] Lounge, [3] Library, [4] Billiard Room, [5] Dining Room, [6] Conservatory, [7] Ballroom, [8] Kitchen,  :6
//Sam accuses Mr. Green of committing the crime in the Conservatory with the Knife.
a[aIndex] = new announcement();
a[aIndex].type = ACCUSE;
a[aIndex].playerName = "Sam";
a[aIndex].trigylphx = new trigylphus( CONSERVATORY, KNIFE, GREEN );
aIndex = aIndex+1;
//Jim wins!
a[aIndex] = new announcement();
a[aIndex].type = WINNER;
a[aIndex].playerName = "Jim";
//Select an action: [0]Start Game, [1]Add a player, [2]Delete a player, [3]List stats [4]Quit: 4