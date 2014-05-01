import play.*;
import models.*;
import play.libs.*;

import java.util.*;
import redis.clients.jedis.*;
import com.typesafe.plugin.RedisPlugin;
import play.cache.Cache;

public class Global extends GlobalSettings {
    public void onStart(Application app) {
        JedisPool p = app.plugin(RedisPlugin.class).jedisPool();
        Jedis j = p.getResource();
        // set up a club with players
        ArrayList<String> players = new ArrayList<String>();
        Cache.set("club:1:players", players);
        p.returnResource(j);

        WebClub club = new WebClub();

    }
}