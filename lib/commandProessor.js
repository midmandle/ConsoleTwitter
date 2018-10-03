class CommandProcessor {
	constructor() {
		
	}
	
	writePost(user, message) {
		user.Timeline.addNewPost(message);
	}

	readTimeline(user) {
		return user.Timeline.Posts;
	}

	viewWall(user) {
		return user.Wall;
	}

	followUser(userA, userB) {
		userA.subscribeToUser(userB);
	}
}

module.exports = CommandProcessor;