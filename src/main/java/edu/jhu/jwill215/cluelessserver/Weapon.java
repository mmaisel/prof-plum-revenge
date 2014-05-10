package edu.jhu.jwill215.cluelessserver;
/**
 * 
 */

/**
 * @author Jack Williard
 *
 */

public enum Weapon implements ICard {
	ROPE("rope"), 
	LEAD_PIPE("lead pipe"),
	KNIFE("knife"),
	WRENCH("wrench"),
	CANDLESTICK("candlestick"),
	REVOLVER("revolver");
		
	private final String prettyName;
	
	Weapon(String name) {
		this.prettyName = String.format("%s", name);
	}
	
	public String prettyName() {
		return this.prettyName;
	}

    public static Weapon fromString(String name) {
        if (name != null) {
            for (Weapon w : Weapon.values()) {
                if (name.equalsIgnoreCase(w.prettyName)) {
                    return w;
                }
            }
        }
        return null;
    }
	

}
