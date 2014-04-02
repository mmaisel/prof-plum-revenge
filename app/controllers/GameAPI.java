package controllers;

import play.*;
import play.mvc.*;

public class GameAPI extends Controller {

    public static Result index() {
        return ok("Game API");
    }

}