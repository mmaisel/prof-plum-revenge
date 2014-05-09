package edu.jhu.jwill215.cluelessserver;

import java.util.*;

/**
 * 
 */

/**
 * @author Jack Williard
 *
 */
public interface ISpace {
	void addConnection(ISpace connection);
	ArrayList<ISpace> getValidMoves();
	void addSuspect(Suspect s);
	ArrayList<Suspect> getSuspects();
	void removeSuspect(Suspect s);
	public String prettyName();
}
