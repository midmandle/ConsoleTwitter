const User = require('./user');
class CommandProcessor {
	constructor() {
		this.users = [];	
	}
	
	writePost(user, message) {
		user.timeline.addNewPost(message);
	}

	readTimeline(user) {
		const results = user.timeline.getFormattedPosts();
		this.printToConsole(results);
	}

	viewWall(user) {
		const results = user.getWallPosts();
		this.printToConsole(results);
	}

	followUser(userA, username) {
		let userB = this.findUser(username);
		userA.subscribeToUser(userB);
	}

	process(command) {
		let commandParts = command.trim().split(' ');
		let username = commandParts[0];

		this.findUserAndExecuteCommand(username, commandParts.slice(1));
	}

	findUserAndExecuteCommand(username, command) {
		const user = this.findUser(username);
		this.executeCommand(user, command);
	}
	
	findUser(username) {
		const existingUser = this.users.find((currentUser) => username === currentUser.name);
		if (!existingUser) {
			return this.createNewUser(username);
		}
		return existingUser;
	}

	createNewUser(username) {
		const newUser = new User(username);
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

	printToConsole(results) {
		for(let line of results) {
			console.log(line);
		}
	}
}

module.exports = CommandProcessor;