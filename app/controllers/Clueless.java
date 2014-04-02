package controllers;

import play.*;
import play.mvc.*;

import views.html.*;

public class Clueless extends Controller {

    public static Result index() {
        return ok(index.render("Game Lobby"));
    }

    public static Result gameboard(Long uuid) {
        String player = "player name";
        session("connected", player);
        return ok(gameboard.render("Game" + uuid));
    }

}
