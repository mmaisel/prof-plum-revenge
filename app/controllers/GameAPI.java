package controllers;

import java.lang.Math.*;
import play.*;
import play.mvc.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;

public class GameAPI extends Controller {

    public static Result index(Long uuid) {
        // lookup game state for a particular game, put into gameboard json struct, send back
        ObjectNode gameboard = Json.newObject();
        gameboard.put("status", Math.random());
        return ok(gameboard);
    }

    public static Result playturn(Long uuid) {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return badRequest("No json data, bro.");
        }
        ObjectNode result = Json.newObject();
        // doAction() on message, get new gamestate, send via gameboard json struct
        result.put("message", "SUCCESS");
        result.put("gameboard", "SUCCESS");
        return ok(result);
    }

    private void doAction() {
    }

}