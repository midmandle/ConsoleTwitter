const UserTimeline = require('./userTimeline');
const Wall = require('./wall');

class User {
	constructor(username) {
		this.name = username;
		this.timeline = new UserTimeline();
		this.follows = [];
		this.wall = new Wall(this, this.follows);
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
		return this.wall.view();
	}

	subscribeToUser(user) {
		this.follows.push(user);

	}

	getListOfFollwedUserNames() {
		return this.follows.map(user => user.Name);
	}
}

module.exports = User;