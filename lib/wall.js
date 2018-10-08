const moment = require('moment');
class Wall {
	constructor(owner) {
		this.owner = owner;
	}

	view() {
		const posts = getMergedTimelines(this.owner);
		const orderedPosts = orderPostsByMostRecent(posts);

		return formatPosts(orderedPosts);
	}
}

function getMergedTimelines(owner) {
	const listOfPosts = extractFollowedPosts(owner);
	return mergePosts(listOfPosts);
}

function extractFollowedPosts(user) {
	let listOfFollowedPosts = user.follows.map((followedUser) => {
		return followedUser.timeline.posts;
	});

	listOfFollowedPosts.push(user.timeline.posts);
	return listOfFollowedPosts;
}

function mergePosts(listOfPosts) {
	return listOfPosts.reduce((mergedPosts, unmergedPosts) => {
		return mergedPosts.concat(unmergedPosts);
	}, []);
}

function orderPostsByMostRecent(posts) {
	return posts.sort(mostRecent);
}

function mostRecent(postA, postB) {
	const dateA = moment(postA.timePosted);
	const dateB = moment(postB.timePosted);

	return dateB.diff(dateA);
}

function formatPosts(posts) {
	return posts.map((post) => post.formatPost());
}

module.exports = Wall;