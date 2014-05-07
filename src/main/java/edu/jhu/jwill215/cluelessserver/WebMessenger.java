package edu.jhu.jwill215.cluelessserver;

import edu.jhu.jwill215.cluelessserver.Game.Announcement;
import edu.jhu.jwill215.cluelessserver.Game.Action;
import edu.jhu.jwill215.cluelessserver.Player.Query;
import redis.clients.jedis.*;
import org.json.simple.JSONObject;
import java.util.*;

public class WebMessenger implements IMessenger {

	InfiniteMessenger tempMsgr = new InfiniteMessenger();
    JedisPool pool;
    String in;
    String out;

    WebMessenger(String player_id, String club_id, JedisPool pool) {
        this.pool = pool;
        this.in = "club:" + club_id + ":player:" + player_id + ":in";
        this.out = "club:" + club_id + ":player:" + player_id + ":out";
        this.info(Announcement.CHAT, "{\"type\": \"CHAT\", \"playerName\": \"GameMaster\", \"message\": \"Welcome to Clueless!\"");
    }

	@Override
	public Object query(Query type, Object...objects) {
        Jedis j = this.pool.getResource();
		String query = "";
		switch(type) {
            case ACTION: {
				boolean canMove = false;
				query = "{\"type\":\"Q_ACTION\", \"actions\": [" ;
	
				@SuppressWarnings("unchecked")
				ArrayList<Action> actions = (ArrayList<Action>)objects[1];
				for (Action a : actions) {
					if (a==Action.MOVE) canMove = true;
					query = query + "\"A_" + a.toString() + "\" , ";
				}
				if (actions.size() > 0) query=query.substring(0,query.length()-2);
				query = query + "] ,";
				if (canMove) {
					query = query + "\"spaces\": [" ;
					@SuppressWarnings("unchecked")
					ArrayList<ISpace> moves = (ArrayList<ISpace>)objects[2];
					for (ISpace s : moves) {
						query = query + "\"" + s.prettyName() + "\" , ";
					}
					if (moves.size() > 0) query=query.substring(0,query.length()-2);
					query = query +  "]";
				} else {
					query=query.substring(0,query.length()-2);
				}
				query = query + "}";
                break;
            }
			//deprecated
            //case MOVE: {
            //    break;
            //}
            case SUGGEST: {
				query = "{\"type\": \"Q_SUGGEST\"}"; 
                break;
            }
            case ACCUSE: {
				query = "{\"type\": \"Q_ACCUSE\"}"; 
                break;
            }
            case CARDS: {
				query = "{\"type\": \"Q_CARDS\", \"cards\": [ " ;
				
				@SuppressWarnings("unchecked")
				ArrayList<ICard> cards = (ArrayList<ICard>)objects[1];
				for (ICard c : cards) {
					query = query + "\"" + c.prettyName() + "\" , ";
				}
				if (cards.size() > 0) query=query.substring(0,query.length()-2);
				query = query + "]}";
                break;
            }
            default: {
                break;
            }
		}
		j.rpush(this.out, query);
        this.pool.returnResource(j);
		
		//TODO: replace this with board query response
		return tempMsgr.query(type, objects);
	}

	@Override
	public void info(Announcement type, Object... objects) {
        Jedis j = this.pool.getResource();
		String announcement = "";
		switch(type) {
            case CHAT: {
                announcement = "{\"type\": \"CHAT\", \"playerName\": \"Game Master\", \"message\": \"Hello World!\"}";
                //j.rpush(this.out, announcement);
                break;
            }
            case NEWPLAYER: {
				announcement = "{\"type\": \"NEWPLAYER\", " 
					+ "\"playerName\": \"" + ((Player)objects[0]).name 
					+ "\", \"playerCharacter\": \"" + ((Player)objects[0]).character.prettyName() 
					+ "\"}";
                break;
            }
            case ACCUSE: {	
				announcement = "{\"type\": \"ACCUSE\", "
					+ "\"playerName\": \"" + ((Suspect)objects[0]).prettyName()
					+ "\", \"triglyph.room\": \""    + ((Triglyph)objects[1]).room.prettyName() 
					+ "\", \"triglyph.suspect\": \"" + ((Triglyph)objects[1]).suspect.prettyName() 
					+ "\", \"triglyph.weapon\": \""  + ((Triglyph)objects[1]).weapon.prettyName() 
					+ "\"}";
                break;
            }
            case FALSE: {
				String cardString = "no card";
				if (objects[0] != null) cardString = ((ICard)objects[0]).prettyName();
				announcement = "{\"type\": \"FALSE\", "
				+ "\"card\": \"" + cardString
				+ "\"}";
                break;
            }
            case LOSER: {
				announcement = "{\"type\": \"LOSER\", "
					+ "\"playerName\": \"" + ((Player)objects[0]).name 
					+ "\"}";
                break;
            }
            case MOVE:{
				announcement = "{\"type\": \"MOVE\", "
					+ " \"playerName\":\"" + ((Suspect)objects[0]).prettyName() 
					+ "\", \"space\":\"" + ((ISpace)objects[1]).prettyName()
					+ "\"}";
                break;
            }
            case SKIP: {
				announcement = "{\"type\": \"SKIP\", "
					+ "\"playerName\": \"" + ((Player)objects[0]).name 
					+ "\"}";
                break;
            }
            case SUGGEST: {
				announcement = "{\"type\": \"SUGGEST\", "
					+ "\"playerName\": \"" + ((Player)objects[0]).name 
					+ "\", \"triglyph.room\": \""    + ((Triglyph)objects[1]).room.prettyName() 
					+ "\", \"triglyph.suspect\": \"" + ((Triglyph)objects[1]).suspect.prettyName() 
					+ "\", \"triglyph.weapon\": \""  + ((Triglyph)objects[1]).weapon.prettyName() 
					+ "\"}";
                break;
            }
            case WINNER: {
				announcement = "{\"type\": \"WINNER\", "
					+ "\"playerName\": \"" + ((Player)objects[0]).name 
					+ "\"}";
                break;
            }
            case SHOWHAND: {
				announcement = "{\"type\": \"SHOWHAND\", "
					+ "\"cards\":[";
				@SuppressWarnings("unchecked")
				ArrayList<ICard> cards = (ArrayList<ICard>)objects[1];
				for (ICard c : cards) {
					announcement = announcement + "\"" + c.prettyName() + "\" , ";
				}
				if (cards.size() > 0) announcement=announcement.substring(0,announcement.length()-2);
				announcement = announcement + "]}";
                break;
            }
            default: {
                break;
            }
		}
		j.rpush(this.out, announcement);
        this.pool.returnResource(j);
	}
	
}
