package models;

import java.util.*;

/**
 * 
 */

/**
 * @author Jack Williard
 *
 */
interface ISpace {
	void addConnection(ISpace connection);
	ArrayList<ISpace> getValidMoves();
	void addSuspect(Suspect s);
	ArrayList<Suspect> getSuspects();
	void removeSuspect(Suspect s);
	String prettyName();
}