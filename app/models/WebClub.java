/**
 *
 */
package models;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.CharBuffer;
import java.util.ArrayList;

/**
 * @author Jack Williard
 */
public class WebClub {


    public int uuid;
    public ArrayList<Player> players = new ArrayList<Player>();
    Game myGame;

    public WebClub(int uuid) {
        this.uuid = uuid;
    }

    /**
     * New player joins a club room, return -1 if club is full!
     *
     * @param player_name
     * @return player_id, player id used to identifer player in a club
     */
    public int joinClub(String player_name) {
        if (this.isClubFull()) {
            return -1;
        } else {
            Player newPlayer = new Player(player_name);
            players.add(newPlayer);
            int player_id = players.indexOf(newPlayer);
            if (this.isClubFull()) {
                this.startGame();
            }
            return player_id;
        }

    }

    /**
     * Player leaves a club room
     *
     * @param player_id
     */
    public void leaveClub(int player_id) {
        /*
        if (players.size() > 0) {
            Player oldPlayer = (Player) this.query(Query.SELECTPLAYER, players);
            players.remove(oldPlayer);
        }
        */
        return;
    }

    /**
     * Start a game with the players currently in the Club
     */
    public void startGame() {
        this.myGame = new Game(this.players);
        Player winner = this.myGame.play();
        winner.wins++;
    }

    /**
     *  List the stats after a game is over.
     * @return
     */
    public String listStats() {
        String stats = "Player wins: ";
        /*
        @SuppressWarnings("unchecked")
        ArrayList<Player> tempPlayers = (ArrayList<Player>) objects[0];
        for (Player p : tempPlayers) {
            options = options + p.name + ": " + p.wins + ", ";
        }
        System.out.format("%s \n", options);
        */
        return stats;

    }

    /**
     *  More than max players in a club?
     * @return
     */
    private boolean isClubFull() {
        return (this.players.size() > 5);
    }
}
