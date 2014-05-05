package controllers;

import java.io.IOException;
import java.util.*;
import java.lang.Math.*;
import play.*;
import play.mvc.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.*;
import play.libs.Json;

import com.typesafe.plugin.RedisPlugin;
import redis.clients.jedis.*;


public class Clueless extends Controller {

	public static Result startGame(String club_uuid) {
	
        Jedis j = play.Play.application().plugin(RedisPlugin.class).jedisPool().getResource();
		String success = "Game failed to start.";
        try {
            // set game start to true
            j.set("club:" + club_uuid + ":start", "true");
			success = "Game Starting...";
        } finally {
            play.Play.application().plugin(RedisPlugin.class).jedisPool().returnResource(j);
        }
		return ok(success);
	}

    public static Result getMessage(String club_uuid, String player_uuid) {

        Jedis j = play.Play.application().plugin(RedisPlugin.class).jedisPool().getResource();
        ObjectNode reply = Json.newObject();
        JsonNode jsonReply = Json.parse("{\"name\": \"NOP\"}");
        String message;

        try {
            // get message from player's out queue
            message = j.rpop("club:" + club_uuid + ":player:" + player_uuid + ":out");
        } finally {
            play.Play.application().plugin(RedisPlugin.class).jedisPool().returnResource(j);
        }

        if (message != null) {
            jsonReply = Json.parse(message);
        }

        reply.put("message", jsonReply);

        return ok(reply);
    }

    public static Result sendMessage(String club_uuid, String player_uuid) {

        JsonNode jsonMessage = request().body().asJson();
        String stringMessage = Json.stringify(jsonMessage);
        List<String> result;
        ObjectNode reply = Json.newObject();
        JsonNode jsonReply = Json.parse("{\"name\": \"NOP\"}");

        Jedis j = play.Play.application().plugin(RedisPlugin.class).jedisPool().getResource();
        try {
            // put message on the player's in queue
            j.rpush("club:" + club_uuid + ":player:" + player_uuid + ":in", stringMessage);
            // wait for reply from game server, this is a blocking call
            result = j.brpop(0, "club:" + club_uuid + ":player:" + player_uuid + ":out");
        } finally {
            play.Play.application().plugin(RedisPlugin.class).jedisPool().returnResource(j);
        }

        // 0 index of result list determines if there is a popped result within timeout, since we block forever, it shouldn't happen
        if (result.get(0) != null) {
            // get message from
            String stringReply = result.get(1);
            jsonReply = Json.parse(stringReply);
        }

        reply.put("message", jsonReply);

        return ok(reply);
    }

    private void doAction() {
    }

}