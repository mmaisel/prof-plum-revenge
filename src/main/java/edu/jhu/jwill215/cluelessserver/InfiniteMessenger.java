package edu.jhu.jwill215.cluelessserver;

import java.io.*;
import java.util.*;

import edu.jhu.jwill215.cluelessserver.Game.Announcement;
import edu.jhu.jwill215.cluelessserver.Game.Action;
import edu.jhu.jwill215.cluelessserver.Player.Query;

public class InfiniteMessenger implements IMessenger {

	private PrintStream out = System.out;
	private InputStream in = System.in;
	
	private InputStreamReader mySR = new InputStreamReader(this.in);
	
	@Override
	public Object query(Query type, Object...objects) {
		switch(type) {
		case ACTION: {
			String options = "Select an action: ";
			int objectLocation = 0;
			@SuppressWarnings("unchecked")
			ArrayList<Action> actions = (ArrayList<Action>)objects[1];
			for (Action a : actions) {
				options = options + "[" + objectLocation++ + "] " + a.toString() + ", ";
			}
			out.format("%s: %s :", (String)objects[0], options);
			int answer = 0; //this.getNumber(actions.size());
			if (actions.get(0) == Action.ACCUSE) answer=1;
			Action action = actions.get(answer);
			ArrayList<Object> complexReturn = new ArrayList<Object>();
			complexReturn.add(action);
			if (action == Action.MOVE) {
				complexReturn.add(this.query(Query.MOVE, objects[0], objects[2]));
			}
			return complexReturn;
		}
		case MOVE: {
			String options = "Select a move: ";
			int objectLocation = 0;
			@SuppressWarnings("unchecked")
			ArrayList<ISpace> moves = (ArrayList<ISpace>)objects[1];
			for (ISpace s : moves) {
				options = options + "[" + objectLocation++ + "] " + s.prettyName() + ", ";
			}
			out.format("%s: %s :", (String)objects[0], options);
			int answer = this.getNumber(moves.size());
			return moves.get(answer);
		}
		case SUGGEST: {
			Triglyph suggestion = new Triglyph();
			
			String options = "Select a weapon: ";
			int objectLocation = 0;
			for (Weapon w : Weapon.values()) {
				options = options + "[" + objectLocation++ + "] " + w.prettyName() + ", ";
			}
			out.format("%s: %s :", (String)objects[0], options);
			suggestion.weapon  = Weapon.values()[this.getNumber(Weapon.values().length-1)];
			
			options = "Select a suspect: ";
			objectLocation = 0;
			for (Suspect s : Suspect.values()) {
				options = options + "[" + objectLocation++ + "] " + s.prettyName() + ", ";
			}
			out.format("%s: %s :", (String)objects[0], options);
			suggestion.suspect  = Suspect.values()[this.getNumber(Suspect.values().length-1)];

			return suggestion;
		}
		case ACCUSE: {
			Triglyph suggestion = new Triglyph();
			String options = "Select a weapon: ";
			int objectLocation = 0;
			for (Weapon s : Weapon.values()) {
				options = options + "[" + objectLocation++ + "] " + s.prettyName() + ", ";
			}
			out.format("%s: %s :", (String)objects[0], options);
			suggestion.weapon  = Weapon.values()[this.getNumber(Weapon.values().length-1)];
			
			options = "Select a suspect: ";
			objectLocation = 0;
			for (Suspect s : Suspect.values()) {
				options = options + "[" + objectLocation++ + "] " + s.prettyName() + ", ";
			}
			out.format("%s: %s :", (String)objects[0], options);
			suggestion.suspect  = Suspect.values()[this.getNumber(Suspect.values().length-1)];
			
			options = "Select a room: ";
			objectLocation = 0;
			for (Room s : Room.values()) {
				options = options + "[" + objectLocation++ + "] " + s.prettyName() + ", ";
			}
			out.format("%s: %s :", (String)objects[0], options);
			suggestion.room  = Room.values()[this.getNumber(Room.values().length-1)];
			return suggestion;
		}
		case CARDS: {
			String options = "Select a card: ";
			int objectLocation = 0;
			@SuppressWarnings("unchecked")
			ArrayList<ICard> cards = (ArrayList<ICard>)objects[1];
			for (ICard c : cards) {
				options = options + "[" + objectLocation++ + "] " + c.prettyName() + ", ";
			}
			out.format("%s: %s :", (String)objects[0], options);
			int answer = this.getNumber(cards.size()-1);
			return cards.get(answer);
		}
		default:
			break;
			
		}
		return null;
	}

	boolean getYesNo() {
		char answer = '_';
		try {
			while ((answer != 'y') && (answer != 'n')) {
				answer = (char) this.mySR.read(); //(char)System.in.read();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
		}
		if (answer=='y') {
			return true; 
		} else {
			return false;
		}
	}
	
	int getNumber(int max){
		//int answer = '_';
		//try {
			//while ((answer < 0) || (answer >= max)) {
			//	answer = Character.getNumericValue((char) this.mySR.read()); //(char)System.in.read();
		out.println();
			//}
		//} catch (IOException e) {
			// TODO Auto-generated catch block
		//}
		//return answer;
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//return 0;
		return (new Random()).nextInt(max);
	}

	@Override
	public void info(Announcement type, Object... objects) {
		String announcement = "";
		switch(type) {
		case NEWPLAYER: {
			announcement = String.format("%s has joined the game as %s.", ((Player)objects[0]).name, ((Player)objects[0]).character.prettyName());
			break;
		}
		case ACCUSE:
			announcement = String.format("%s accuses %s of committing the crime in the %s with the %s.", 
					((Player)objects[0]).name, 
					((Triglyph)objects[1]).suspect.prettyName(), 
					((Triglyph)objects[1]).room.prettyName(), 
					((Triglyph)objects[1]).weapon.prettyName());
			break;
		case FALSE: {
			String cardString = "No";
			if (objects[0] != null) cardString = "The " + ((ICard)objects[0]).prettyName();
			announcement = String.format("%s card is shown.", cardString);
			break;
		}
		case LOSER:
			announcement = String.format("%s accuses falsely!", ((Player)objects[0]).name);
			break;
		case MOVE:{
			announcement = String.format("%s has moved to the %s.", ((Suspect)objects[0]).prettyName(), ((ISpace)objects[1]).prettyName());
			break;
		}
		case SKIP:
			announcement = String.format("Skipping %s.", ((Player)objects[0]).name);
			break;
		case SUGGEST:
			announcement = String.format("%s suggests the crime was committed in the %s by %s with the %s.", 
					((Player)objects[0]).name, 
					((Triglyph)objects[1]).room.prettyName(), 
					((Triglyph)objects[1]).suspect.prettyName(), 
					((Triglyph)objects[1]).weapon.prettyName());
			break;
		case WINNER:
			announcement = String.format("%s wins!", ((Player)objects[0]).name);
			break;
		case SHOWHAND: 
			announcement = (String)objects[0] + ": Cards: ";
			@SuppressWarnings("unchecked")
			ArrayList<ICard> cards = (ArrayList<ICard>)objects[1];
			for (ICard c : cards) {
				announcement = announcement + c.prettyName() + ", ";
			}
			break;
		default:
			break;
		
		}
		out.format("%s \n", announcement);
		
	}
	
}
