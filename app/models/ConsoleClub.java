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
public class ConsoleClub {


    public int uuid;
    ArrayList<Player> players = new ArrayList<Player>();
    Game myGame;

    public ConsoleClub(int uuid) {
        this.uuid = uuid;
    }

    public void run() {
        this.query(Query.WELCOME);
        while ((boolean) this.query(Query.MAINMENU)) {
        }
    }

    InputStreamReader mySR = new InputStreamReader(System.in);
    private enum Query

    {
        WELCOME, MAINMENU, NAMEPLAYER, LISTSTATS, SELECTPLAYER
    }

    private Object query(Query query, Object... objects) {
        switch (query) {
            case WELCOME: {
                System.out.format("Welcome to the ClueLess Game. \n");
                return null;
            }
            case MAINMENU: {
                System.out.format("Select an action: [0]Start Game, [1]Add a player, [2]Delete a player, [3]List stats [4]Quit: ");
                return mainMenu(getNumber(4));
            }
            case NAMEPLAYER: {
                try {
                    while (this.mySR.ready()) {
                        this.mySR.read();
                    }
                } catch (IOException e1) {
                }
                System.out.format("Enter your name: ");
                String name = "";
                CharBuffer buffer = CharBuffer.allocate(20);
                try {
                    this.mySR.read(buffer);
                    buffer.flip();
                    name = buffer.toString();
                    name = name.substring(0, name.length() - 2);
                } catch (IOException e) {
                }
                return name;
            }
            case SELECTPLAYER: {
                String options = "Select a player: ";
                int objectLocation = 0;
                @SuppressWarnings("unchecked")
                ArrayList<Player> tempPlayers = (ArrayList<Player>) objects[0];
                for (Player p : tempPlayers) {
                    options = options + "[" + objectLocation++ + "] " + p.name + ", ";
                }
                System.out.format("%s :", options);
                int answer = this.getNumber(tempPlayers.size());
                return tempPlayers.get(answer);
            }
            case LISTSTATS: {
                String options = "Player wins: ";
                @SuppressWarnings("unchecked")
                ArrayList<Player> tempPlayers = (ArrayList<Player>) objects[0];
                for (Player p : tempPlayers) {
                    options = options + p.name + ": " + p.wins + ", ";
                }
                System.out.format("%s \n", options);
            }
            default:
                return null;
        }
    }

    private boolean mainMenu(int action) {
        switch (action) {
            case 0:  //play game
                if ((players.size() > 0) && (players.size() <= 6)) {
                    this.myGame = new Game(players);
                    Player winner = this.myGame.play();
                    winner.wins++;
                }
                break;
            case 1:  //add player
                ConsoleMessenger newMessenger = new ConsoleMessenger();
                Player newPlayer = new Player(newMessenger);
                //Player newPlayer = new Player();
                newPlayer.name = (String) this.query(Query.NAMEPLAYER);
                players.add(newPlayer);
                break;
            case 2:  //delete player

                break;
            case 3:  //List stats for all players
                if (players.size() > 0) {
                    this.query(Query.LISTSTATS, players);
                }
                break;
            case 4:
                return false;
            default:
                break;
        }
        return true;
    }

    int getNumber(int max) {
        int answer = '_';
        try {
            while ((answer < 0) || (answer > max)) {
                answer = Character.getNumericValue((char) this.mySR.read());
            }
        } catch (IOException e) {
        }
        return answer;
    }
}