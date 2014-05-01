import play.*;
import models.*;
import play.libs.*;

import java.util.*;
import redis.clients.jedis.*;
import com.typesafe.plugin.RedisPlugin;
import play.cache.Cache;

public class Global extends GlobalSettings {
    public void onStart(Application app) {
        // set up a club with players
        // JedisPool p = Play.application().plugin(RedisPlugin.class).jedisPool();
        // Jedis j = p.getResource();
        // j.rpush("club:" + 1 + ":players", "gamemaster");
    }
}