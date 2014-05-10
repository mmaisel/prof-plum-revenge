package models;

import edu.jhu.jwill215.cluelessserver.*;
import edu.jhu.jwill215.cluelessserver.Game.Announcement;
import edu.jhu.jwill215.cluelessserver.Game.Action;
import edu.jhu.jwill215.cluelessserver.Player.Query;
import org.omg.CORBA.ACTIVITY_COMPLETED;
import redis.clients.jedis.*;
import org.json.simple.*;
import java.util.*;

class WebMessenger implements IMessenger {

	InfiniteMessenger tempMsgr = new InfiniteMessenger();
    JedisPool pool;
    String in;
    String out;

    public WebMessenger(String player_id, String club_id, JedisPool pool) {
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

    /**
     *  RPUSH to player's out queue
     * @param q
     */
    private void rpush(JSONObject q) {
        Jedis j = this.pool.getResource();
        j.rpush(this.out, q.toJSONString());
        this.pool.returnResource(j);
    }

    /**
     *  RPUSH to player's out queue
     * @param q
     */
    private void rpush(String q) {
        Jedis j = this.pool.getResource();
        j.rpush(this.out, q);
        this.pool.returnResource(j);
    }

    /**
     *  BLPOP on player's in queue
     * @param
     */
    private JSONObject blpop() {
        Jedis j = this.pool.getResource();
        List<String> result = j.blpop(0, this.in);
        // 0 index of result list determines if there is a popped result within timeout, since we block forever, it shouldn't happen

        JSONObject reply = new JSONObject();

        if (result.get(0) != null) {
            // get message, since reply is not null
            String stringReply = result.get(1);
            reply = (JSONObject)JSONValue.parse(stringReply);
        }
        this.pool.returnResource(j);
        return reply;
    }

	@Override
	public Object query(Query type, Object...objects) {
        JSONObject query = new JSONObject();
        LinkedHashMap message_type = new LinkedHashMap();
		switch(type) {
            case ACTION: {
                // action query type
                message_type.put("name", "Q_ACTION");
                query.put("type", message_type);

                // available actions
                @SuppressWarnings("unchecked")
                ArrayList<Action> actions = (ArrayList<Action>) objects[1];
                // convert to JSON array
                JSONArray actionsJSON = new JSONArray();
                for (Action action : actions) {
                    actionsJSON.add("A_" + action.toString());
                }
                query.put("actions", actionsJSON);

                // available spaces
                @SuppressWarnings("unchecked")
                ArrayList<ISpace> spaces = new ArrayList();
                if (objects.length > 2) {
                    spaces = (ArrayList<ISpace>) objects[2];
                }
                // convert to JSON array
                JSONArray spacesJSON = new JSONArray();
                for (ISpace space : spaces) {
                    spacesJSON.add(space.prettyName());
                }
                query.put("spaces", spacesJSON);

                this.rpush(query);
                // wait for query reply from player
                JSONObject query_reply = this.blpop();
				
				String query_action = query_reply.get("action").toString();
				JSONObject query_action_name = (JSONObject)JSONValue.parse(query_action);
				String qan = query_action_name.get("name").toString();
				Action action = Action.ENDTURN;
				action = Action.valueOf(qan.substring(2,qan.length()));
				
                ArrayList<Object> complexReturn = new ArrayList<Object>();
                complexReturn.add(action);

                if (action == Action.MOVE) {
                    //complexReturn.add(this.query(Query.MOVE, objects[0], objects[2]));
					String query_space = query_reply.get("space").toString();
					JSONObject query_space_name = (JSONObject)JSONValue.parse(query_space);
					String qsn = query_space_name.get("name").toString();
					ISpace space = Hall.fromString( qsn ); 
					if (space == null) space = Room.fromString( qsn ); 
					complexReturn.add(space);
                }

                return complexReturn;

            }
            case ACCUSE: {
				// action query type
                message_type.put("name", "Q_ACCUSE");
                query.put("type", message_type);
				this.rpush(query);
			
                // wait for query reply from player
                JSONObject query_reply = this.blpop();
                System.out.println(query_reply);

                JSONObject triglyph = (JSONObject) query_reply.get("triglyph");
                Triglyph t = new Triglyph();
				t.suspect = Suspect.PLUM;
				t.weapon = Weapon.KNIFE;
				t.room = Room.LIBRARY;

                t.suspect = Suspect.fromString((String) triglyph.get("suspect"));
                t.weapon = Weapon.fromString((String) triglyph.get("weapon"));
                t.room = Room.fromString((String) triglyph.get("room"));

                return t;

            }

            case SUGGEST: {
				// action query type
                message_type.put("name", "Q_SUGGEST");
                query.put("type", message_type);
				this.rpush(query);

                // wait for query reply from player
                JSONObject query_reply = this.blpop();
                System.out.println(query_reply);

                JSONObject triglyph = (JSONObject) query_reply.get("triglyph");
                Triglyph t = new Triglyph();
				t.suspect = Suspect.PLUM;
				t.weapon = Weapon.KNIFE;
				t.room = Room.LIBRARY;

                t.suspect = Suspect.fromString((String) triglyph.get("suspect"));
                t.weapon = Weapon.fromString((String) triglyph.get("weapon"));
                t.room = Room.fromString((String) triglyph.get("room"));

                System.out.println(t);

                return t;

            }
			default: {
				return null;
			}
        }

		//TODO: replace this with board query response
		//return tempMsgr.query(type, objects);
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
            case NEXTPLAYER: {
                @SuppressWarnings("unchecked")
                String nextplayer_name = (String)objects[1];

                announcement = "{\"type\": \"NEXTPLAYER\","
                        + "\"playerCharacter\":" + nextplayer_name
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