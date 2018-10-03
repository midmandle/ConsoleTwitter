class Wall {
	constructor(owner) {
		this.owner = owner;
	}

	view() {
		let posts = this.getMergedTimelines();
		return this.sortPostsByMostRecent(posts);
	}

	getMergedTimelines() {
		const listOfPosts = this.extractFollowedPosts(this.owner);
		return this.mergePosts(listOfPosts);
	}

	extractFollowedPosts(user) {
		let listOfFollowedPosts = user.follows.map((followedUser) => {
			return followedUser.Timeline.Posts;
		});

		return listOfFollowedPosts.concat(user.Timeline.Posts);
	}

	mergePosts(listOfPosts) {
		return listOfPosts.reduce((mergedPosts, unmergedPosts) => {
			return mergedPosts.concat(unmergedPosts);
		}, []);
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

module.exports = Wall;