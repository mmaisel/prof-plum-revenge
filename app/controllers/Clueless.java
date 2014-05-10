package controllers;

import java.io.IOException;
import java.util.*;
import java.lang.Math.*;
import play.*;
import play.mvc.*;
import models.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.*;
import play.libs.Json;
import org.json.simple.*;

import com.typesafe.plugin.RedisPlugin;
import redis.clients.jedis.*;


public class Clueless extends Controller {



    public static Result getMessage(String club_uuid, String player_uuid) {

        Jedis j = play.Play.application().plugin(RedisPlugin.class).jedisPool().getResource();
        ObjectNode reply = Json.newObject();
        JsonNode jsonReply = Json.parse("{\"type\" : {\"name\": \"NOP\"}}");
        String message;

        try {
            // get message from player's out queue
            message = j.lpop("club:" + club_uuid + ":player:" + player_uuid + ":out");
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
        Logger.info(stringMessage);
        List<String> result;
        ObjectNode reply = Json.newObject();
        JsonNode jsonReply = Json.parse("{\"type\" : {\"name\": \"NOP\"}}");

        Jedis j = play.Play.application().plugin(RedisPlugin.class).jedisPool().getResource();
        try {
            JSONObject message = (JSONObject)JSONValue.parse(stringMessage);
            String type = message.get("type").toString();
            Logger.info(type);
            if (type.equals("CHAT")) {
                Logger.info("CHAT MESSAGE");
                for(int i=0; i<6; i++){
                    j.rpush("club:" + club_uuid + ":player:" + i + ":out", stringMessage);
                }
            } else {
                Logger.info("NOT A CHAT MESSAGE");
                // put message on the player's in queue
                j.rpush("club:" + club_uuid + ":player:" + player_uuid + ":in", stringMessage);
            }
        } finally {
            play.Play.application().plugin(RedisPlugin.class).jedisPool().returnResource(j);
        }

		return ok();
    }

    private void doAction() {
    }

}