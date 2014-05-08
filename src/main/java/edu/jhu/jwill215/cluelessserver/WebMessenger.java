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
        //this.info(Announcement.CHAT, "{\"type\": \"CHAT\", \"playerName\": \"GameMaster\", \"message\": \"Welcome to Clueless!\"");
    }

	static class JsonBuilder {
		static String printA(ArrayList<Action> al) {
			if (al.size() <= 0) {return "\"no action\"";}
			String ret = "[";
			for (Action a : al) {
				ret = ret + JsonBuilder.print(a) + ",";
			}
			return ret.substring(0,ret.length()-1) + "]";
		}
		static String printS(ArrayList<ISpace> al) {
			if (al.size() <= 0) {return "\"no space\"";}
			String ret = "[";
			for (ISpace a : al) {
				ret = ret + JsonBuilder.print(a) + ",";
			}
			return ret.substring(0,ret.length()-1) + "]";
		}
		static String printC(ArrayList<ICard> al) {
			if (al.size() <= 0) {return "\"no card\"";}
			String ret = "[";
			for (ICard a : al) {
				ret = ret + JsonBuilder.print(a) + ",";
			}
			return ret.substring(0,ret.length()-1) + "]";
		}
		static String print(ICard  c) { return "\"" + c.prettyName() + "\""; }
		static String print(Action a) { return "\"A_" + a.toString() + "\""; }
		static String print(ISpace s) { return "\"" + s.prettyName() + "\""; }
		static String print(Triglyph t) {
			return "{" 
				+  "\"room\":\""   + t.room.prettyName()    + "\","
				+ "\"suspect\":\"" + t.suspect.prettyName() + "\","
				+ "\"weapon\":\""  + t.weapon.prettyName()  + "\""
				+ "}";
		}
		
	}
	
	//class myDB {
		private void rpush(String q) {
			Jedis j = this.pool.getResource();
			j.rpush(this.out, q);
			this.pool.returnResource(j);
		}
	//}
	
	@Override
	public Object query(Query type, Object...objects) {
		String query = "";
		switch(type) {
            case ACTION: {				
				@SuppressWarnings("unchecked")
				ArrayList<Action> actions = (ArrayList<Action>)objects[1];
				@SuppressWarnings("unchecked")
				ArrayList<ISpace> moves = new ArrayList();
				if (objects.length>2) { moves = (ArrayList<ISpace>)objects[2]; }
				
				query = "{\"type\":{\"name\":\"Q_ACTION\"}," +
					"\"actions\":" + JsonBuilder.printA(actions) + "," +
					"\"spaces\":" + JsonBuilder.printS(moves) + "}";
                break;
            }
            case SUGGEST: {
				query = "{\"type\":{\"name\":\"Q_SUGGEST\"}}"; 
                break;
            }
            case ACCUSE: {
				query = "{\"type\":{\"name\":\"Q_ACCUSE\"}}"; 
                break;
            }
            case CARDS: {
				@SuppressWarnings("unchecked")
				ArrayList<ICard> cards = (ArrayList<ICard>)objects[1];
				
				query = "{\"type\":{\"name\":\"Q_CARDS\"}," +
				"\"cards\":" + JsonBuilder.printC(cards) + "}";
                break;
            }
            default: {
                break;
            }
		}
		this.rpush(query);
	
		//TODO: replace this with board query response
		return tempMsgr.query(type, objects);
	}

	@Override
	public void info(Announcement type, Object... objects) {
		String announcement = "";
		switch(type) {
            case CHAT: {
                announcement = "{\"type\": \"CHAT\", \"playerName\": \"Game Master\", \"message\": \"Hello World!\"}";
                break;
            }
            case NEWPLAYER: {
				announcement = "{\"type\":{\"name\":\"NEWPLAYER\"}," 
					+ "\"playerName\":\"" + ((Player)objects[0]).name + "\","
					+ "\"playerCharacter\":\"" + ((Player)objects[0]).character.prettyName() + "\"" 
					+ "}";
                break;
            }
            case ACCUSE: {	
				@SuppressWarnings("unchecked")
				Triglyph t = (Triglyph)objects[1];
			
				announcement = "{\"type\":{\"name\":\"ACCUSE\"}, "
					+ "\"playerName\": \"" + ((Player)objects[0]).name + "\","
					+ "\"triglyph\":" + JsonBuilder.print(t) + "}";
                break;
            }
            case FALSE: {
				String cardString = "no card";
				if (objects[0] != null) cardString = ((ICard)objects[0]).prettyName();
				announcement = "{\"type\":{\"name\":\"FALSE\"}, "
				+ "\"card\":\"" + cardString + "\"" 
				+ "}";
                break;
            }
            case LOSER: {
				announcement = "{\"type\":{\"name\":\"LOSER\"},"
					+ "\"playerName\": \"" + ((Player)objects[0]).name + "\""
					+ "}";
                break;
            }
            case MOVE:{
				announcement = "{\"type\":{\"name\":\"MOVE\"},"
					+ "\"playerCharacter\":\"" + ((Suspect)objects[0]).prettyName() + "\","
					+ "\"space\":\"" + ((ISpace)objects[1]).prettyName() + "\""
					+ "}";
                break;
            }
            case SKIP: {
				announcement = "{\"type\":{\"name\":\"SKIP\"},"
					+ "\"playerName\":\"" + ((Player)objects[0]).name  + "\""
					+ "}";
                break;
            }
            case SUGGEST: {
				@SuppressWarnings("unchecked")
				Triglyph t = (Triglyph)objects[1];
			
				announcement = "{\"type\":{\"name\":\"SUGGEST\"},"
					+ "\"playerName\":\"" + ((Player)objects[0]).name + "\","
					+ "\"triglyph\":" + JsonBuilder.print(t) + "}";
                break;
            }
            case WINNER: {
				announcement = "{\"type\":{\"name\":\"WINNER\"},"
					+ "\"playerName\": \"" + ((Player)objects[0]).name + "\""
					+ "}";
                break;
            }
            case SHOWHAND: {
				@SuppressWarnings("unchecked")
				ArrayList<ICard> cards = (ArrayList<ICard>)objects[1];
				
				announcement = "{\"type\":{\"name\":\"SHOWHAND\"},"
					+ "\"cards\":" + JsonBuilder.printC(cards)
					+ "}";
                break;
            }
            default: {
                break;
            }
		}
		this.rpush(announcement);
	}
	
}
