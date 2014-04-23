package edu.jhu.jwill215.cluelessserver;
/**
 * 
 */

/**
 * @author Jack Williard
 *
 */
public enum Suspect implements ICard {
	SCARLET("Miss Scarlet"),
	MUSTARD("Colonel Mustard"),
	WHITE("Mrs. White"),
	GREEN("Mr. Green"),
	PEACOCK("Mrs. Peacock"),
	PLUM("Professor Plum");	
	
	private final String prettyName;
	ISpace location;
	
	Suspect(String name) {
		this.prettyName = String.format("%s", name);
	}
	
	public String prettyName() {
		return this.prettyName;
	}
	
}
