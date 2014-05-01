package edu.jhu.jwill215.cluelessserver;

import edu.jhu.jwill215.cluelessserver.Game.Announcement;
import edu.jhu.jwill215.cluelessserver.Game.Action;
import edu.jhu.jwill215.cluelessserver.Player.Query;

public class WebMessenger implements IMessenger {

	InfiniteMessenger tempMsgr = new InfiniteMessenger();
    String id;

    WebMessenger(String id) {
        this.id = id;
    }

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
		
		//There must be a better way to do this...
		//One day I will learn java, one day.
        switch(objects.length) {
		case 2:		
			return tempMsgr.query(type, objects[0], objects[1]);
		case 1:		
			return tempMsgr.query(type, objects[0]);
		default:		
			return tempMsgr.query(type);
		}
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
