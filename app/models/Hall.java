package models;

import java.util.*;
/**
 * 
 */

/**
 * @author Jack Williard
 *
 */
enum Hall implements ISpace {
	STUDYHALL, HALLLOUNGE, LIBRARYBILLIARD, BILLIARDDINING,	CONSERVEBALL, BALLKITCHEN,
	STUDYLIBRARY, LIBRARYCONSERVE, HALLBILLIARD, BILLIARDBALL, LOUNGEDINING, DININGKITCHEN;
	
	//private String prettyName;
	final ArrayList<ISpace> adjacentSpaces = new ArrayList<ISpace>();
	ArrayList<Suspect> suspects = new ArrayList<Suspect>();
	
	@Override
	public void addConnection(ISpace connection) {
		adjacentSpaces.add(connection);
	}

	@Override
	public ArrayList<ISpace> getValidMoves() {
		return adjacentSpaces;
	}

	@Override
	public ArrayList<Suspect> getSuspects() {
		return this.suspects;
	}

	@Override
	public void addSuspect(Suspect s) {
		this.suspects.add(s);		
	}

	@Override
	public void removeSuspect(Suspect s) {
		this.suspects.remove(s);
		
	}

	@Override
	public String prettyName() {
		return String.format("%s-%s Hallway", this.adjacentSpaces.get(0).prettyName(), this.adjacentSpaces.get(1).prettyName());
	}

	
}
