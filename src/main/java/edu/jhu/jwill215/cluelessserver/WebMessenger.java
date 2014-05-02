package edu.jhu.jwill215.cluelessserver;

import edu.jhu.jwill215.cluelessserver.Game.Announcement;
import edu.jhu.jwill215.cluelessserver.Game.Action;
import edu.jhu.jwill215.cluelessserver.Player.Query;
import redis.clients.jedis.*;

public class WebMessenger implements IMessenger {

    JedisPool pool;
    String in;
    String out;

    WebMessenger(String player_id, String club_id, JedisPool pool) {
        this.pool = pool;
        this.in = "club:" + club_id + ":player" + player_id + ":in";
        this.out = "club:" + club_id + ":player" + player_id + ":out";
    }

	@Override
	public Object query(Query type, Object...objects) {
        Jedis j = this.pool.getResource();
		switch(type) {
            case ACTION: {
                break;
            }
            case MOVE: {
                break;
            }
            case SUGGEST: {
                break;
            }
            case ACCUSE: {
                break;
            }
            case CARDS: {
                break;
            }
            default: {
                break;
            }
		}
        this.pool.returnResource(j);
        return null;
	}

	@Override
	public void info(Announcement type, Object... objects) {
        Jedis j = this.pool.getResource();
		String announcement = "";
		switch(type) {
            case NEWPLAYER: {
                break;
            }
            case ACCUSE: {
                break;
            }
            case FALSE: {
                break;
            }
            case LOSER: {
                break;
            }
            case MOVE:{
                break;
            }
            case SKIP: {
                break;
            }
            case SUGGEST: {
                break;
            }
            case WINNER: {
                break;
            }
            case SHOWHAND: {
                break;
            }
            default: {
                break;
            }
		}
        j.rpush(this.out, "DERP");
        this.pool.returnResource(j);
	}
	
}
