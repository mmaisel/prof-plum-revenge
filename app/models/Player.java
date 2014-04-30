package models;

import java.util.*;

/**
 * 
 */

/**
 * @author Jack Williard
 *
 */
public class Player {
	public String name;
	Suspect character;
	ArrayList<ICard> cards = new ArrayList<ICard>();
	boolean frozen = false;
	boolean canSuggest = false;
	int wins = 0;
	IMessenger msgr;

    Player (String name) {
        this.name = name;
        this.msgr = new WebMessenger();
    }

	Player() {
		this.msgr = new ConsoleMessenger();
	}

    Player (IMessenger myMsgr) {
        this.msgr = myMsgr;
    }

	public void reset() {
		cards.clear();
		frozen = false;
		canSuggest = false;
		character = null;
	}
	
	public enum Query {MOVE, SUGGEST, ACCUSE, CARDS, ACTION};

	Object query(Query type, Object...objects) {
		switch (objects.length) {
		case 2:
			return this.msgr.query(type, this.name, objects [0], objects[1]);
		case 1:
			return this.msgr.query(type, this.name, objects[0]);
		default:
			return this.msgr.query(type, this.name);	
		}
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
