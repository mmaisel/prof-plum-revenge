package controllers;

import play.*;
import play.mvc.*;
import com.fasterxml.jackson.databind.JsonNode;

public class GameAPI extends Controller {

    public static Result index(Long uuid) {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return badReques("No json data, bro.");
        }
        ObjectNode gameboard = Json.newObject();
        // lookup game state for a particular game, put into gameboard json struct, send back
        gameboard.put("status", "SUCCESS");
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