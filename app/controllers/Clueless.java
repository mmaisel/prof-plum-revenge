package controllers;

import java.lang.Math.*;
import play.*;
import play.mvc.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;


public class Clueless extends Controller {

    public static Result getMessage(String club_uuid) {
        // lookup game state for a particular game, put into gameboard json struct, send back
        ObjectNode gameboard = Json.newObject();
        gameboard.put("status", Math.random());
        return ok(gameboard);
    }

    public static Result sendMessage(String club_uuid) {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return badRequest("No json data, bro.");
        }
        ObjectNode reply = Json.newObject();
        return ok(reply);
    }

    private void doAction() {
    }

}