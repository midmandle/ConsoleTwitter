class Post {
	constructor(messageText) {
		this.message = messageText;
		this.timePosted = new Date();
	}

	get Message() {
		return this.message;
	}

	get TimePosted() {
		return this.timePosted;
	}
}

module.exports = Post;