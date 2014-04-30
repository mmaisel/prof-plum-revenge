package controllers;

import play.*;
import play.data.*;
import play.mvc.*;
import play.cache.*;

import views.html.*;
import models.*;

import java.util.Calendar;

public class Club extends Controller {

    public static Result index() {
        // placeholder for initial club rooms
        String[] openClubUUIDs = {"1"};

        flash("danger", "Club Room is full, and can not join!");
        // get player info from session if it exists
        String player_name = session("player.name");
        String player_uuid = session("player.uuid");
        String club_uuid = session("club.uuid");

        // already in a club room! redirect
        if (player_name != null && player_uuid != null && club_uuid != null) {
            return redirect(controllers.routes.Club.clubroom(club_uuid, player_name, String.valueOf(player_uuid)));
        } else {
            return ok(index.render("Clueless", openClubUUIDs));
        }
    }

    public static Result join() {
        // get player name and club room choice from form
        DynamicForm clubForm = Form.form().bindFromRequest();
        String player_name = clubForm.get("player_name");
        String club_uuid = clubForm.get("club_uuid");
        // placeholder, get array index of player list to use when joining a club

        // see if club is already on the cache
        models.WebClub club = (models.WebClub)Cache.get(club_uuid);
        if(club==null) {
            club = new models.WebClub(Integer.parseInt(club_uuid));
        }

        // return the player id, just the array index of club.players
        int player_uuid = club.joinClub(player_name);

        Cache.set(club_uuid, club);

        if (player_uuid == -1 ) {
            flash("danger", String.format("Club Room %s is full, and can not join!", club_uuid));
            return redirect(controllers.routes.Club.index());
        }

        String club_debug_log = "Current Players in Club Room - " + club.uuid + "\n";
        for (Player player : club.players) {
            club_debug_log += "\t" + club.players.indexOf(player) + "  " + player.name + "\n";
        }
        Logger.debug(club_debug_log);


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
