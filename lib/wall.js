class Wall {
	constructor(owner, follows) {
		this.owner = owner;
		this.usersFollowed = follows;
	}

	view() {
		let mergedTimelines = this.getMergedTimelines();
		return mergedTimelines;
	}

	getMergedTimelines() {
		const mergedTimeline = this.mergeFollowedPosts();
		return new Map([...mergedTimeline.entries()].sort());
	}

	mergeFollowedPosts() {
		const postsToMerge = this.extractPostsFromTimelines();
		return new Map(postsToMerge);
	}

	extractPostsFromTimelines() {
		let postsToMerge = this.usersFollowed.map(user => user.Timeline.posts);
		postsToMerge.push(this.owner.timeline.posts);
		return postsToMerge;
	}
}

module.exports = Wall;