package edu.jhu.jwill215.cluelessserver;

import java.util.*;

/**
 * 
 */

/**
 * @author Jack Williard
 *
 */
public enum Room implements ICard, ISpace {
	STUDY("Study"),
	HALL("Hall"),
	LOUNGE("Lounge"),
	LIBRARY("Library"),
	BILLIARD("Billiard"),
	DINING("Dining"),
	CONSERVATORY("Conservatory"),
	BALLROOM("Ballroom"),
	KITCHEN("Kitchen");
	
	private final String prettyName;
	final ArrayList<ISpace> adjacentSpaces = new ArrayList<ISpace>();
	ArrayList<Suspect> suspects = new ArrayList<Suspect>();
	
	Room(String name) {
		this.prettyName = String.format("%s", name);
	}
	
	public String prettyName() {
		return this.prettyName;
	}

	@Override
	public void addConnection(ISpace connection) {
		adjacentSpaces.add(connection);
	}

	@Override
	public ArrayList<ISpace> getValidMoves() {
		ArrayList<ISpace> validMoves = new ArrayList<ISpace>();
		for(ISpace s : this.adjacentSpaces) {
			if (s.getClass().equals(Hall.BALLKITCHEN.getDeclaringClass()) && (s.getSuspects().size() > 0)) {
				continue;
			} 
			validMoves.add(s);
		}
		return validMoves;
	}

	@Override
	public void addSuspect(Suspect s) {
		this.suspects.add(s);	
	}

	@Override
	public ArrayList<Suspect> getSuspects() {
		return this.suspects;
	}

	@Override
	public void removeSuspect(Suspect s) {
		this.suspects.remove(s);		
	}
}
