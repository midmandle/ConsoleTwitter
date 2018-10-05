const moment = require('moment');
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

		listOfFollowedPosts.push(user.Timeline.Posts);
		return listOfFollowedPosts;
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

	formatPost(username, currentTime, post) {
		let timeDifference = this.getTimeDifference(currentTime, post.TimePosted);
		return `${username} - ${post.Message} ${timeDifference}`;
	}

	getTimeDifference(currentTime, postTime) {
		console.log(currentTime);
		console.log(postTime);
		let current = moment(currentTime);
		let posted = moment(postTime);

		return posted - current;
	}
}

module.exports = Wall;