package controllers;

import play.*;
import play.data.*;
import play.mvc.*;
import play.cache.*;



import views.html.*;
import models.*;

import java.util.Calendar;

import com.typesafe.plugin.RedisPlugin;
import redis.clients.jedis.*;

public class Club extends Controller {

	public static Result startGame(String club_uuid) {
	
        Jedis j = play.Play.application().plugin(RedisPlugin.class).jedisPool().getResource();
		String success = "Game failed to start.";
        try {
            // set game start to true
            //j.set("club:" + club_uuid + ":start", "true");
			models.WebClub.play(Integer.parseInt(club_uuid));
			success = "Game Starting...";
        } finally {
            play.Play.application().plugin(RedisPlugin.class).jedisPool().returnResource(j);
        }
		return ok(success);
	}


    public static Result index() {
        // placeholder for initial club rooms
        String[] openClubUUIDs = {"1"};

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

        long player_uuid = models.WebClub.joinClub(player_name, club_uuid);

        if (player_uuid == -1 ) {
            flash("danger", String.format("Club Room %s is full, and can not join!", club_uuid));
            return redirect(controllers.routes.Club.index());
        }

        return redirect(controllers.routes.Club.clubroom(club_uuid, player_name, String.valueOf(player_uuid)));
    }

    public static Result plumJs(String club_uuid, String player_name, String player_uuid) {
        return ok(views.js.plum.render(club_uuid, player_name, player_uuid));
    }

    public static Result clubroom(String club_uuid, String player_name, String player_uuid) {
        // session("connected", player_uuid);
        return ok(club.render("Club Room " + club_uuid, club_uuid, player_name, player_uuid));
    }

}
