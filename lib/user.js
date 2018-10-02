const UserTimeline = require('./userTimeline');

class User {
	constructor(username) {
		this.name = username;
		this.timeline = new UserTimeline();
	}

	get Name() {
		return this.name;
	}

	get Timeline() {
		return this.timeline;
	}
}

module.exports = User;