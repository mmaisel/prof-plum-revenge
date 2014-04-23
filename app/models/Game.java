package edu.jhu.jwill215.cluelessserver;
import java.util.*;

import edu.jhu.jwill215.cluelessserver.Player.Query;

/**
 * 
 */

/**
 * @author Jack Williard
 *
 */
public class Game {
	
	private ArrayList<Player> players;
	private Triglyph secret = new Triglyph();
	Random randomGenerator = new Random();
	
    Game(ArrayList<Player> initialPlayers) {
    	this.players = initialPlayers;
		
    	Connection.applyConnections();
    	
		Suspect.PLUM.location = Room.STUDY;
		Suspect.PEACOCK.location = Room.LIBRARY;
		Suspect.GREEN.location = Room.CONSERVATORY;
		Suspect.WHITE.location = Room.BALLROOM;
		Suspect.MUSTARD.location = Room.DINING;
		Suspect.SCARLET.location = Room.HALL;		
		
		switch (this.players.size()) {
		case 6:			
			this.players.get(5).character = Suspect.PLUM;
			this.announce(Announcement.NEWPLAYER, this.players.get(5));
			this.moveSuspect(Suspect.PLUM, Hall.STUDYLIBRARY);
		case 5:
			this.players.get(4).character = Suspect.PEACOCK;
			this.announce(Announcement.NEWPLAYER, this.players.get(4));
			this.moveSuspect(Suspect.PEACOCK, Hall.LIBRARYCONSERVE);			
		case 4:
			this.players.get(3).character = Suspect.GREEN;
			this.announce(Announcement.NEWPLAYER, this.players.get(3));
			this.moveSuspect(Suspect.GREEN, Hall.CONSERVEBALL);			
		case 3:
			this.players.get(2).character = Suspect.WHITE;
			this.announce(Announcement.NEWPLAYER, this.players.get(2));
			this.moveSuspect(Suspect.WHITE, Hall.BALLKITCHEN);
		case 2:
			this.players.get(1).character = Suspect.MUSTARD;
			this.announce(Announcement.NEWPLAYER, this.players.get(1));
			this.moveSuspect(Suspect.MUSTARD, Hall.LOUNGEDINING);			
		case 1:
			this.players.get(0).character = Suspect.SCARLET;
			this.announce(Announcement.NEWPLAYER, this.players.get(0));
			this.moveSuspect(Suspect.SCARLET, Hall.HALLLOUNGE);
			break;
		default:
			return;
		}
	
		//shuffle and distribute cards, create secret case file
		ArrayList<ICard> cardDeck = new ArrayList<ICard>();
		for (Room r : Room.values()) {
			cardDeck.add(r);
		}
		this.secret.room = (Room) cardDeck.remove(this.randomGenerator.nextInt(cardDeck.size()));

		ArrayList<ICard> tempDeck = new ArrayList<ICard>();
		for (Suspect s : Suspect.values()) {
			tempDeck.add(s);
		}
		this.secret.suspect = (Suspect) tempDeck.remove(this.randomGenerator.nextInt(tempDeck.size()));
		cardDeck.addAll(tempDeck);
		
		tempDeck.clear();
		for (Weapon w : Weapon.values()) {
			if (w != secret.weapon) tempDeck.add(w);
		}
		this.secret.weapon = (Weapon)tempDeck.remove(this.randomGenerator.nextInt(tempDeck.size()));
		cardDeck.addAll(tempDeck);
		
		int iPlayer = 0;
		while (!cardDeck.isEmpty()) {
			this.players.get(iPlayer++).cards.add(cardDeck.remove(this.randomGenerator.nextInt(cardDeck.size())));
			iPlayer %= this.players.size();
		}
		
		for(Player p : this.players) {
			p.query(Query.SHOWHAND);
		}
		
		//setup comms
		return;
	}
	
	public Player play() {
		int currentPlayer = 0;
		while(playTurn(players.get(currentPlayer))) {currentPlayer = (currentPlayer+1)%players.size();}
		this.announce(Announcement.WINNER, players.get(currentPlayer));
		
		return players.get(currentPlayer);
	}
	
	private boolean playTurn(Player currentPlayer) {
		
		//skip player who previously accused incorrectly
		if (currentPlayer.frozen) {
			this.announce(Announcement.SKIP, currentPlayer);
			return true;
		}
		
		//check if you are last player remaining
		int remainingPlayers = this.players.size();
		for (Player p : this.players){
			if (p.frozen) remainingPlayers--;
		}
		if (remainingPlayers <= 1) {
			return false;  //last player standing wins
		}
		
		// attempt a move, if valid play, make a suggestion
		//determine if player will make a move this turn
		List<ISpace> validMoves = currentPlayer.character.location.getValidMoves();
		if (currentPlayer.character.location.getClass().equals(Hall.BALLKITCHEN.getDeclaringClass()) ||
				(currentPlayer.character.location.getClass().equals(Room.BALLROOM.getDeclaringClass()) &&
						(validMoves.size() > 0) &&
						((boolean)currentPlayer.query(Query.WANTMOVE)))) {
			this.moveSuspect(currentPlayer.character, (ISpace)currentPlayer.query(Query.MOVE, validMoves));
			currentPlayer.canSuggest = true;
		}
		
		//if valid play, make a suggestion
		if (currentPlayer.character.location.getClass().equals(Room.BALLROOM.getDeclaringClass()) &&
				currentPlayer.canSuggest) {
			currentPlayer.canSuggest = false;
			if ((boolean)currentPlayer.query(Query.WANTSUGGEST)) {
				Triglyph suggestion = (Triglyph)currentPlayer.query(Query.SUGGEST);
				suggestion.room = (Room)currentPlayer.character.location;
				this.makeSuggestion(currentPlayer, suggestion);
			}
		}
		
		//if wanted, make an accusation
		if ((boolean)currentPlayer.query(Query.WANTACCUSE)) {
			Triglyph accusation = (Triglyph)currentPlayer.query(Query.ACCUSE);
			if(this.makeAccusation(currentPlayer, accusation)) {return false;}
		}
		
		return true;
	}

	private boolean makeAccusation(Player player, Triglyph accusation) {
		this.announce(Announcement.ACCUSE, player, accusation);
		if ((accusation.room == this.secret.room) && 
				(accusation.suspect == this.secret.suspect) && 
				(accusation.weapon == this.secret.weapon)) {
			this.announce(Announcement.WINNER, player);
			return true;
		}
		player.frozen = true;
		if (player.character.location.getClass().equals(Hall.BALLKITCHEN.getDeclaringClass())) {
			this.moveSuspect(player.character, player.character.location.getValidMoves().get(0));
			this.announce(Announcement.LOSER, player);
		}
		return false;
	}

	private void makeSuggestion(Player player, Triglyph suggestion) {
		this.announce(Announcement.SUGGEST, player, suggestion);
		if (suggestion.suspect.location != suggestion.room) 
			this.moveSuspect(suggestion.suspect, suggestion.room);
		
		//examine opponents cards
		int iPlayer = players.indexOf(player);
		ICard matchingCard = null;
		int opponent = (iPlayer+1)%players.size();
		while ((opponent != iPlayer) && (matchingCard == null)) {
			matchingCard = this.players.get(opponent).getCard(suggestion);
			opponent = (opponent+1)%players.size();
		}
		this.announce(Announcement.FALSE, matchingCard);
		
		return;
	}
	
	
	private void moveSuspect(Suspect suspect, ISpace space) {
		if (suspect.location != null) 
			suspect.location.removeSuspect(suspect);
		suspect.location = space;
		space.addSuspect(suspect);
		this.announce(Announcement.MOVE, suspect, space);
	}
	
	private enum Announcement {SKIP, MOVE, SUGGEST, FALSE, ACCUSE, WINNER, LOSER, NEWPLAYER}
	
	private void announce(Announcement type, Object...objects) {
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
		default:
			break;
		
		}
		//System.out.format("%s \n", announcement);
		for (Player p : this.players) {
			p.query(Query.INFO, announcement);
		}
	}
	
}
