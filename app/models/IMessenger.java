package models;

import models.Player.Query;
import models.Game.Announcement;

public interface IMessenger {
	public Object query(Query type, Object...objects);
	public void info(Announcement type, Object...objects);
}
