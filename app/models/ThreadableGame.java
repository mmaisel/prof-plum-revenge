package models;

import java.util.*;
import edu.jhu.jwill215.cluelessserver.*;
import play.*;

public class ThreadableGame extends Game implements Runnable {

	ThreadableGame(ArrayList<Player> p) {
		super(p);
	}

	@Override
	public void run() {
		super.play();
	}
}
