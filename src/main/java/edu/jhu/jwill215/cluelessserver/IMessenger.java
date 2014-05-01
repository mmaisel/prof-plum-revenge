package edu.jhu.jwill215.cluelessserver;

import edu.jhu.jwill215.cluelessserver.Player.Query;
import edu.jhu.jwill215.cluelessserver.Game.Announcement;

public interface IMessenger {
	public Object query(Query type, Object...objects);
	public void info(Announcement type, Object...objects);
}
