package models;
/**
 * 
 */

/**
 * @author Jack Williard
 *
 */

public enum Weapon implements ICard {
	ROPE("Rope"), 
	LEAD_PIPE("Lead Pipe"),
	KNIFE("Knife"),
	WRENCH("Wrench"),
	CANDLESTICK("Candlestick"),
	REVOLVER("Revolver");
		
	private final String prettyName;
	
	Weapon(String name) {
		this.prettyName = String.format("%s", name);
	}
	
	public String prettyName() {
		return this.prettyName;
	}
	

}
