const User = require('./user');
class CommandProcessor {
	constructor() {
		this.users = [];	
	}
	
	writePost(user, message) {
		user.Timeline.addNewPost(message);
		return message;
	}

	readTimeline(user) {
		return user.Timeline.Posts;
	}

	viewWall(user) {
		return user.Wall;
	}

	followUser(userA, username) {
		let userB = this.findUser(username);
		userA.subscribeToUser(userB);
	}

	process(command) {
		let commandParts = command.trim().split(' ');
		let username = commandParts[0];

		return this.findUserAndExecuteCommand(username, commandParts.slice(1));
	}

	findUserAndExecuteCommand(username, command) {
		let user = this.findUser(username);
		return this.executeCommand(user, command);
	}
	
	findUser(username) {
		let existingUser = this.users.find((currentUser) => username === currentUser.Name);
		if (!existingUser) {
			return this.createNewUser(username);
		}
		return existingUser;
	}

	createNewUser(username) {
		let newUser = new User(username);
		this.users.push(newUser);
		return newUser;
	}

	executeCommand(user, command) {
		switch (command[0]) {
		case '->':
			return this.writePost(user, command.splice(1).join(' '));
		case 'follows':
			return this.followUser(user, command[1]);
		case 'wall':
			return this.viewWall(user);
		default:
			return this.readTimeline(user);
		}
	}
}

module.exports = CommandProcessor;