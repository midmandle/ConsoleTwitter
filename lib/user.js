const UserTimeline = require('./userTimeline');

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
		return this.follows;
	}

	subscribeToUser(user) {
		this.follows.push(user.name);
	}
}

module.exports = User;