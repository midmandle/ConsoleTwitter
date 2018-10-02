const Post = require('./post');

class UserTimeline {

	constructor(username) {
		this.username = username;
		this.posts = new Map();
	}

	get Username() {
		return this.username;
	}

	get Posts() {
		return this.posts;
	}

	addNewPost(messageText) {
		const userPost = new Post(messageText);
		this.posts.set(userPost.TimePosted, userPost);
	}
}

module.exports = UserTimeline;