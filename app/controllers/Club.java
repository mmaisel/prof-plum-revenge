package controllers;

import play.*;
import play.data.*;
import play.mvc.*;
import java.util.UUID;

import views.html.*;

public class Club extends Controller {

    public static Result init() {
        return redirect(controllers.routes.Club.index());
    }

    public static Result index() {
        String[] openClubUUIDs = {"1", "2", "3"};
        return ok(index.render("Clueless", openClubUUIDs));
    }

    public static Result join() {
        DynamicForm clubForm = Form.form().bindFromRequest();
        String player_name = clubForm.get("player_name");
        int player_uuid = 1;
        int club_uuid = Integer.parseInt(clubForm.get("club_uuid"));

        return redirect(controllers.routes.Club.game(club_uuid, player_name, player_uuid));
    }

    public static Result plumJs(String player_name, String player_uuid, String club_uuid) {
        return ok(views.js.plum.render(club_uuid, player_name, player_uuid));
    }

    public static Result game(int game_uuid, String player_name, int player_uuid) {
        // session("connected", player_uuid);
        return ok(club.render("Club Room " + game_uuid, player_name, Integer.toString(player_uuid), Integer.toString(game_uuid)));
    }

}
