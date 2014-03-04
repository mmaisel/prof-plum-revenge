package edu.jhu.jwill215.cluelessserver;
import java.io.IOException;
import java.io.*;
import java.util.*;

/**
 * 
 */

/**
 * @author Jack Williard
 *
 */
public class Player {
	String name = "Jack Smith";
	Suspect character;
	ArrayList<ICard> cards = new ArrayList<ICard>();
	boolean frozen = false;
	boolean canSuggest = false;
	int wins = 0;

	enum Query { INFO, WANTMOVE, MOVE, WANTSUGGEST, SUGGEST, WANTACCUSE, ACCUSE, CARDS, SHOWHAND};
	InputStreamReader mySR = new InputStreamReader(System.in);
	Object query(Query type, Object...objects) {
		switch(type) {
			case INFO:
				System.out.format("%s: %s \n", this.name, (String)objects[0]);
				break;
			case WANTMOVE: {
				System.out.format("%s: Would you like to attempt to move? [y/n]", this.name);
				return this.getYesNo();
			}
			case MOVE: {
				String options = "Select a move: ";
				int objectLocation = 0;
				@SuppressWarnings("unchecked")
				ArrayList<ISpace> moves = (ArrayList<ISpace>)objects[0];
				for (ISpace s : moves) {
					options = options + "[" + objectLocation++ + "] " + s.prettyName() + ", ";
				}
				System.out.format("%s: %s :", this.name, options);
				int answer = this.getNumber(moves.size());
				return moves.get(answer);
			}
			case WANTSUGGEST: {
				System.out.format("%s: Would you like to make a suggestion? [y/n]", this.name);
				return this.getYesNo();
			}
			case SUGGEST: {
				Triglyph suggestion = new Triglyph();
				String options = "Select a weapon: ";
				int objectLocation = 0;
				for (Weapon w : Weapon.values()) {
					options = options + "[" + objectLocation++ + "] " + w.prettyName() + ", ";
				}
				System.out.format("%s: %s :", this.name, options);
				suggestion.weapon  = Weapon.values()[this.getNumber(Weapon.values().length-1)];
				
				options = "Select a suspect: ";
				objectLocation = 0;
				for (Suspect s : Suspect.values()) {
					options = options + "[" + objectLocation++ + "] " + s.prettyName() + ", ";
				}
				System.out.format("%s: %s :", this.name, options);
				suggestion.suspect  = Suspect.values()[this.getNumber(Suspect.values().length-1)];
				
				return suggestion;
			}
			case WANTACCUSE: {
				System.out.format("%s: Would you like to make an accusation? [y/n]", this.name);
				return this.getYesNo();
			}
			case ACCUSE: {
				Triglyph suggestion = new Triglyph();
				String options = "Select a weapon: ";
				int objectLocation = 0;
				for (Weapon s : Weapon.values()) {
					options = options + "[" + objectLocation++ + "] " + s.prettyName() + ", ";
				}
				System.out.format("%s: %s :", this.name, options);
				suggestion.weapon  = Weapon.values()[this.getNumber(Weapon.values().length-1)];
				
				options = "Select a suspect: ";
				objectLocation = 0;
				for (Suspect s : Suspect.values()) {
					options = options + "[" + objectLocation++ + "] " + s.prettyName() + ", ";
				}
				System.out.format("%s: %s :", this.name, options);
				suggestion.suspect  = Suspect.values()[this.getNumber(Suspect.values().length-1)];
				
				options = "Select a room: ";
				objectLocation = 0;
				for (Room s : Room.values()) {
					options = options + "[" + objectLocation++ + "] " + s.prettyName() + ", ";
				}
				System.out.format("%s: %s :", this.name, options);
				suggestion.room  = Room.values()[this.getNumber(Room.values().length-1)];
				return suggestion;
			}
			case CARDS: {
				String options = "Select a card: ";
				int objectLocation = 0;
				@SuppressWarnings("unchecked")
				ArrayList<ICard> cards = (ArrayList<ICard>)objects[0];
				for (ICard c : cards) {
					options = options + "[" + objectLocation++ + "] " + c.prettyName() + ", ";
				}
				System.out.format("%s: %s :", this.name, options);
				int answer = this.getNumber(cards.size()-1);
				return cards.get(answer);
			}
			case SHOWHAND: {
				String output = "Cards: ";
				for (ICard c : cards) {
					output = output + c.prettyName() + ", ";
				}
				System.out.format("%s: %s \n", this.name, output);
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
		int answer = '_';
		try {
			while ((answer < 0) || (answer > max)) {
				answer = Character.getNumericValue((char) this.mySR.read()); //(char)System.in.read();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
		}
		return answer;
	}

	ICard getCard(Triglyph suggestion) {
		ArrayList<ICard> matchingCards = new ArrayList<ICard>();
		for(ICard c : this.cards) {
			if ((c.equals(suggestion.room)) || (c.equals(suggestion.suspect)) || (c.equals(suggestion.weapon))) {
				matchingCards.add(c);
			}
		}
		switch (matchingCards.size()) {
			case 0:	
				return null;
			case 1:
				return matchingCards.get(0);
			default:
				return (ICard) this.query(Query.CARDS, matchingCards);
		}
	}
}
