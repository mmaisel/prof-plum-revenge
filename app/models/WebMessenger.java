package models;

import java.io.*;
import java.util.*;

import models.Game.Announcement;
import models.Game.Action;
import models.Player.Query;

public class WebMessenger implements IMessenger {

	@Override
	public Object query(Query type, Object...objects) {
		switch(type) {
            case ACTION: {
                break;
            }
            case MOVE: {
                break;
            }
            case SUGGEST: {
                break;
            }
            case ACCUSE: {
                break;
            }
            case CARDS: {
                break;
            }
            default: {
                break;
            }
		}
        return null;
	}

	@Override
	public void info(Announcement type, Object... objects) {
		String announcement = "";
		switch(type) {
            case NEWPLAYER: {
                break;
            }
            case ACCUSE: {
                break;
            }
            case FALSE: {
                break;
            }
            case LOSER: {
                break;
            }
            case MOVE:{
                break;
            }
            case SKIP: {
                break;
            }
            case SUGGEST: {
                break;
            }
            case WINNER: {
                break;
            }
            case SHOWHAND: {
                break;
            }
            default: {
                break;
            }
		}
	}
	
}
