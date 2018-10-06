const Post = require('./post');

class UserTimeline {

	constructor(username) {
		this.username = username;
		this.posts = [];
	}

	getFormattedPosts() {
		return this.posts.map((post) => post.formatPost());
	}

	addNewPost(messageText) {
		const userPost = new Post(this.username, messageText);
		this.posts.push(userPost);
	}
}

module.exports = UserTimeline;