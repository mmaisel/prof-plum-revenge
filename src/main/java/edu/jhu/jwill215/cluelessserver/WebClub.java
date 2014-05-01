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
	ArrayList<Player> players = new ArrayList<Player>();
	Game myGame;

    @SuppressWarnings("unchecked")
    WebClub(int id) {

        this.id = id;
        Jedis j = new Jedis("localhost", 6380);

        int i = 0;
        for (; ; ) {
            String player_name = (String) j.lpop("club:" + this.id + ":players");
            if (player_name == null) {
                break;
            }
            WebMessenger msgr = new WebMessenger(String.valueOf(i));
            Player player = new Player(player_name, msgr);
            players.add(player);
            System.out.println(player_name);
            i++;
        }
    }

	public void play(){
        this.myGame = new Game(players);
        this.myGame.play();
    }
	}
	

	

