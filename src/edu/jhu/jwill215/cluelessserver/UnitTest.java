package edu.jhu.jwill215.cluelessserver;
import java.util.ArrayList;

/**
 * 
 */

/**
 * @author Jack Williard
 *
 */
public class UnitTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Club myClub = new Club();
		myClub.run();
	}
	
	void testGame() {
		Player p1 = new Player();
		p1.name = "Jack Williard";
		Player p2 = new Player();
		p2.name = "Jim Henson";
		ArrayList<Player> players = new ArrayList<Player>();
		players.add(p1);
		players.add(p2);
		Game myGame = new Game(players);
		myGame.play();
	}

}
