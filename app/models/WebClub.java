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
import play.cache.Cache;

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
    public static int joinClub(String player_name, String club_uuid) {

        int player_id;

        ArrayList<String> clubSlots= (ArrayList<String>) Cache.get("club:" + club_uuid + ":players");

        if (clubSlots == null) {
            return -1;
        } else {

            String club_debug_log = "Current Players in Club Room - " + club_uuid + "\n";
            for (String slot: clubSlots) {
                club_debug_log += "\t" + clubSlots.indexOf(slot) + "  " + slot + "\n";
            }
            Logger.debug(club_debug_log);

            if (!isClubFull(clubSlots)) {
                clubSlots.add(player_name);
                Cache.set("club:" + club_uuid + ":players", clubSlots);
                return clubSlots.indexOf(player_name);
            } else {
                return -1;
            }


        }
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

    /**
     *  More than max players in a club?
     * @return
     */
    private static boolean isClubFull(ArrayList<String> clubSlots) {
        if (clubSlots.size() > 5) {
            return true;
        } else {
            return false;
        }
    }
}
