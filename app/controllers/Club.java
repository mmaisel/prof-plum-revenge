package controllers;

import play.*;
import play.data.*;
import play.mvc.*;
import play.cache.*;

import views.html.*;
import models.*;

public class Club extends Controller {

    public static Result index() {
        // placeholder for initial club rooms
        String[] openClubUUIDs = {"1", "2", "3"};

        // get player info from session if it exists
        String player_name = session("player.name");
        String player_uuid = session("player.uuid");
        String club_uuid = session("club.uuid");

        // already in a club room! redirect
        if (player_name != null && player_uuid != null && club_uuid != null) {
            return redirect(controllers.routes.Club.clubroom(club_uuid, player_name, String.valueOf(player_uuid)));
        } else {
            if (player_name == null) {
                player_name = "New Player";
            }
            if (player_uuid == null) {
                player_uuid = String.valueOf(Math.random());
            }

            return ok(index.render("Clueless", openClubUUIDs));
        }
    }

    public static Result join() {
        // get player name and club room choice from form
        DynamicForm clubForm = Form.form().bindFromRequest();
        String player_name = clubForm.get("player_name");
        String club_uuid = clubForm.get("club_uuid");
        // placeholder
        int player_uuid = 1;

        // see if club is already on the cache
        models.Club club = (models.Club)Cache.get(club_uuid);
        if(club==null) {
            club = new models.Club(Integer.parseInt(club_uuid));
            Cache.set(club_uuid, club);
        }

        return redirect(controllers.routes.Club.clubroom(club_uuid, player_name, String.valueOf(player_uuid)));
    }

    public static Result plumJs(String player_name, String player_uuid, String club_uuid) {
        return ok(views.js.plum.render(club_uuid, player_name, player_uuid));
    }

    public static Result clubroom(String club_uuid, String player_name, String player_uuid) {
        // session("connected", player_uuid);
        return ok(club.render("Club Room " + club_uuid, player_name, player_uuid, club_uuid));
    }

}
