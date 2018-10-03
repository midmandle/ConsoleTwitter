const UserTimeline = require('./userTimeline');
const Wall = require('./wall');

class User {
	constructor(username) {
		this.name = username;
		this.timeline = new UserTimeline();
		this.follows = [];
	}

	get Name() {
		return this.name;
	}

	get Timeline() {
		return this.timeline;
	}

	get Follows() {
		return this.getListOfFollwedUserNames();
	}

	get Wall() {
		const generatedWall = new Wall(this);
		return generatedWall.view();
	}

	subscribeToUser(user) {
		this.follows.push(user);

	}

	getListOfFollwedUserNames() {
		return this.follows.map(user => user.Name);
	}
}

module.exports = User;