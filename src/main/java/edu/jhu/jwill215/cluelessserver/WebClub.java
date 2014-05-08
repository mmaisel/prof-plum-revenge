/**
 * 
 */
package edu.jhu.jwill215.cluelessserver;

import edu.jhu.jwill215.cluelessserver.WebMessenger;
import java.util.*;
import redis.clients.jedis.*;


/**
 * @author Jack Williard
 *
 */
public class WebClub {

    int id;
	Game myGame;
    JedisPool pool = new JedisPool(new JedisPoolConfig(), "localhost");

    @SuppressWarnings("unchecked")
    WebClub(int id) {
        this.id = id;
    }

	public void waitGameStart() {
		Jedis j = this.pool.getResource();
		
		while (true) {
		
			String result = (String) j.get("club:" + this.id + ":start");
			if (result != null) break;
			
			try {
				Thread.sleep(1000);
			} catch(InterruptedException ex) {
				Thread.currentThread().interrupt();
			}
		}
		
		this.pool.returnResource(j);
	}
	
	public void play(){
		ArrayList<Player> players = new ArrayList<Player>();
	    Jedis j = this.pool.getResource();

        int i = 0;
        for (; ; ) {
            String player_name = (String) j.lpop("club:" + this.id + ":players");
            if (player_name == null) {
                break;
            }
            WebMessenger msgr = new WebMessenger(String.valueOf(i), String.valueOf(this.id), this.pool);
            Player player = new Player(player_name, msgr);
            players.add(player);
            System.out.println(player_name);
            i++;
        }

        this.pool.returnResource(j);
        this.myGame = new Game(players);
        this.myGame.play();
    }

	public static void main(String[] args) {
		
		//TODO: get club id from args
		int i = 1;
		WebClub myClub = new WebClub(i);
		
		myClub.waitGameStart();
		
		myClub.play();
		
	}
}
	

	

