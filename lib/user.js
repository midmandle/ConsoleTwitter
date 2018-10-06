const UserTimeline = require('./userTimeline');
const Wall = require('./wall');

class User {
	constructor(username) {
		this.name = username;
		this.timeline = new UserTimeline(username);
		this.follows = [];
	}

	getWallPosts() {
		const generatedWall = new Wall(this);
		return generatedWall.view();
	}

	subscribeToUser(user) {
		this.follows.push(user);
	}

	getListOfFollwedUserNames() {
		return this.follows.map(user => user.name );
	}
}

module.exports = User;