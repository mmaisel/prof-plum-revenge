package edu.jhu.jwill215.cluelessserver;
import java.util.*;

/**
 * 
 */

/**
 * @author Jack Williard
 *
 */
public enum Connection {
	Y(Room.STUDY, Room.KITCHEN),
	Z(Room.CONSERVATORY, Room.LOUNGE),
	A(Room.STUDY, Hall.STUDYHALL),
	B(Hall.STUDYHALL,Room.HALL),
	C(Room.HALL, Hall.HALLLOUNGE),
	D(Hall.HALLLOUNGE, Room.LOUNGE),
	E(Room.LIBRARY, Hall.LIBRARYBILLIARD),
	F(Hall.LIBRARYBILLIARD, Room.BILLIARD),
	G(Room.BILLIARD, Hall.BILLIARDDINING),
	H(Hall.BILLIARDDINING, Room.DINING),
	I(Room.CONSERVATORY, Hall.CONSERVEBALL),
	J(Hall.CONSERVEBALL, Room.BALLROOM),
	K(Room.BALLROOM, Hall.BALLKITCHEN),
	L(Hall.BALLKITCHEN,Room.KITCHEN),
	M(Room.STUDY, Hall.STUDYLIBRARY),
	N(Hall.STUDYLIBRARY, Room.LIBRARY),
	O(Room.LIBRARY, Hall.LIBRARYCONSERVE),
	P(Hall.LIBRARYCONSERVE, Room.CONSERVATORY),
	Q(Room.HALL, Hall.HALLBILLIARD),
	R(Hall.HALLBILLIARD, Room.BILLIARD),
	S(Room.BILLIARD, Hall.BILLIARDBALL),
	T(Hall.BILLIARDBALL, Room.BALLROOM),
	U(Room.LOUNGE, Hall.LOUNGEDINING),
	V(Hall.LOUNGEDINING, Room.DINING),
	W(Room.DINING, Hall.DININGKITCHEN),
	X(Hall.DININGKITCHEN, Room.KITCHEN);
	
	final ArrayList<ISpace> spaces = new ArrayList<ISpace>();
	
	Connection(ISpace space1, ISpace space2) {
		this.spaces.add(space1);
		this.spaces.add(space2);
	}
	
	static void applyConnections() {
		for(Connection c : Connection.values()) {
			c.spaces.get(0).addConnection(c.spaces.get(1));
			c.spaces.get(1).addConnection(c.spaces.get(0));
		}
		
	}

}
