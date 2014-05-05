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
				query = "{\"type\": \"ACTION\", " ;
	
				@SuppressWarnings("unchecked")
				ArrayList<Action> actions = (ArrayList<Action>)objects[1];
				for (Action a : actions) {
					if (a==Action.MOVE) canMove = true;
					query = query + "\"" + a.toString() + "\" , ";
				}
				query = query + "} ,";
				if (canMove) {
					query = query + "\"spaces\": {" ;
					@SuppressWarnings("unchecked")
					ArrayList<ISpace> moves = (ArrayList<ISpace>)objects[1];
					for (ISpace s : moves) {
						query = query + "\"" + s.prettyName() + "\" , ";
					}
					query = query +  "} ,";
				}
				query = query + "\"}";
                break;
            }
			//deprecated
            //case MOVE: {
            //    break;
            //}
            case SUGGEST: {
				query = "{\"type\": \"SUGGEST\"}"; 
                break;
            }
            case ACCUSE: {
				query = "{\"type\": \"ACCUSE\"}"; 
                break;
            }
            case CARDS: {
				query = "{\"type\": \"CARDS\", \"cards\": { " ;
				
				@SuppressWarnings("unchecked")
				ArrayList<ICard> cards = (ArrayList<ICard>)objects[1];
				for (ICard c : cards) {
					query = query + "\"" + c.prettyName() + "\" , ";
				}
				
				query = query + "}}";
                break;
            }
            default: {
                break;
            }
		}
        this.pool.returnResource(j);
		//There must be a better way to do this...
		//One day I will learn java, one day.
        switch(objects.length) {
		case 2:		
			return tempMsgr.query(type, objects[0], objects[1]);
		case 1:		
			return tempMsgr.query(type, objects[0]);
		default:		
			return tempMsgr.query(type);
		}
        //return null;
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
					+ "\"playerName\": \"" + ((Player)objects[0]).name 
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
					+ "\"playerName\": \"" + ((Player)objects[0]).name 
					+ "\"space\": \"" + ((ISpace)objects[1]).prettyName()
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
					+ "\"cards\": {";
				@SuppressWarnings("unchecked")
				ArrayList<ICard> cards = (ArrayList<ICard>)objects[1];
				for (ICard c : cards) {
					announcement = announcement + "\"" + c.prettyName() + "\" , ";
				}
				announcement = announcement + "}}";
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
