const Post = require('./post');

class UserTimeline {

	constructor() {
		this.posts = [];
	}

	get Posts() {
		return this.sortPostsByMostRecent(this.posts);
	}

	addNewPost(messageText) {
		const userPost = new Post(messageText);
		this.posts.push(userPost);
	}

	sortPostsByMostRecent(posts) {
		return posts.sort(this.mostRecent);
	}

	mostRecent(postA, postB) {
		let dateA = new Date(postA.timePosted);
		let dateB = new Date(postB.timePosted);

		return dateA - dateB;
	}
}

module.exports = UserTimeline;