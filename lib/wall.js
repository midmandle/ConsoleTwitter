const moment = require('moment');
class Wall {
	constructor(owner) {
		this.owner = owner;
	}

	view() {
		let posts = this.getMergedTimelines();
		const orderedPosts = this.orderPostsByMostRecent(posts);

		return this.formatPosts(orderedPosts);
	}

	getMergedTimelines() {
		const listOfPosts = this.extractFollowedPosts(this.owner);
		return this.mergePosts(listOfPosts);
	}

	extractFollowedPosts(user) {
		let listOfFollowedPosts = user.follows.map((followedUser) => {
			return followedUser.timeline.posts;
		});

		listOfFollowedPosts.push(user.timeline.posts);
		return listOfFollowedPosts;
	}

	mergePosts(listOfPosts) {
		return listOfPosts.reduce((mergedPosts, unmergedPosts) => {
			return mergedPosts.concat(unmergedPosts);
		}, []);
	}

	orderPostsByMostRecent(posts) {
		return posts.sort(this.mostRecent);
	}

	mostRecent(postA, postB) {
		let dateA = moment(postA.timePosted);
		let dateB = moment(postB.timePosted);

		return dateB.diff(dateA);
	}

	formatPosts(posts) {
		return posts.map((post) => post.formatPost());
	}
}

module.exports = Wall;