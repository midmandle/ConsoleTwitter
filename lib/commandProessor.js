const User = require('./user');

let users = [];

class CommandProcessor {
	constructor() {
		users = [];
	}

	process(command) {
		let commandParts = command.trim().split(' ');
		let username = commandParts[0];

		findUserAndExecuteCommand(username, commandParts.slice(1));
	}
}

function findUserAndExecuteCommand(username, command) {
	const user = findUser(username);
	executeCommand(user, command);
}

function findUser(username) {
	const existingUser = users.find((currentUser) => username === currentUser.name);
	if (!existingUser) {
		return createNewUser(username);
	}
	return existingUser;
}

function createNewUser(username) {
	const newUser = new User(username);
	users.push(newUser);
	return newUser;
}

function executeCommand(user, command) {
	switch (command[0]){
	case '->':
		return writePost(user, command.splice(1).join(' '));
	case 'follows':
		return followUser(user, command[1]);
	case 'wall':
		return viewWall(user);
	default:
		return readTimeline(user);
	}
}

function writePost(user, message) {
	user.timeline.addNewPost(message);
}

function readTimeline(user) {
	const results = user.timeline.getFormattedPosts();
	printToConsole(results);
}

function viewWall(user) {
	const results = user.getWallPosts();
	printToConsole(results);
}

function followUser(userA, username) {
	let userB = findUser(username);
	userA.subscribeToUser(userB);
}

function printToConsole(results) {
	for (let line of results) {
		console.log(line);
	}
}

module.exports = CommandProcessor;