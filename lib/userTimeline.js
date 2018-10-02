const Post = require('./post');

class UserTimeline {

	constructor() {
		this.posts = new Map();
	}

	get Posts() {
		return Array.from(this.posts.values());
	}

	addNewPost(messageText) {
		const userPost = new Post(messageText);
		this.posts.set(userPost.TimePosted, userPost);
	}
}

module.exports = UserTimeline;