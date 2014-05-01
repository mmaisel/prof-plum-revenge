/**
 *
 */
package models;

import play.*;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Array;
import java.nio.CharBuffer;
import java.util.ArrayList;

import com.typesafe.plugin.RedisPlugin;
import redis.clients.jedis.*;

/**
 * @author Jack Williard
 */
public class WebClub {


    public WebClub() {
    }

    /**
     * New player joins a club room, return -1 if club is full!
     *
     * @param player_name
     * @return player_id, player id used to identifer player in a club
     */
    @SuppressWarnings("unchecked")
    public static long joinClub(String player_name, String club_uuid) {

        long player_id;
        JedisPool p = Play.application().plugin(RedisPlugin.class).jedisPool();
        Jedis j = p.getResource();

        // see how many players are in slots currently
        long num_of_players = j.llen("club:" + club_uuid + ":players");
        // max number of players already in room
        if (num_of_players > 6) {
            player_id = -1;
        } else {
            player_id = num_of_players;
            // add player to slot in club
            j.rpush("club:" + club_uuid + ":players", player_name);
        }
        p.returnResource(j);
        // return player id to be used in CMTS
        return player_id;
    }

    /**
     * Player leaves a club room
     *
     * @param player_id
     */
    public void leaveClub(int player_id) {
        /*
        if (players.size() > 0) {
            Player oldPlayer = (Player) this.query(Query.SELECTPLAYER, players);
            players.remove(oldPlayer);
        }
        */
        return;
    }
}
