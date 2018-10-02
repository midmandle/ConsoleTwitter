class CommandProcessor {
	constructor() {
		
	}
	
	writePost(user, message) {
		user.Timeline.addNewPost(message);
	}

	readTimeline(user) {
		return user.Timeline.Posts;
	}

	viewWall() {

	}

	followUser() {

	}
}

module.exports = CommandProcessor;