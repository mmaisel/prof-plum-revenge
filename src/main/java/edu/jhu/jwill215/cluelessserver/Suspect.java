package edu.jhu.jwill215.cluelessserver;
/**
 * 
 */

/**
 * @author Jack Williard
 *
 */
public enum Suspect implements ICard {
	SCARLET("Ms. Scarlet"),
	MUSTARD("Col. Mustard"),
	WHITE("Mrs. White"),
	GREEN("Mr. Green"),
	PEACOCK("Mrs. Peacock"),
	PLUM("Prof. Plum");	
	
	private final String prettyName;
	ISpace location;
	
	Suspect(String name) {
		this.prettyName = String.format("%s", name);
	}
	
	public String prettyName() {
		return this.prettyName;
	}
	
}
