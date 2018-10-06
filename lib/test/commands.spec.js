const expect = require('chai').expect;
const CommandProcessor = require('../commandProessor');
const User = require('../user');
const Post = require('../post');

describe('CommandProcessor', function () {
	let commandProcessor = undefined;

	this.beforeAll(function() {
		commandProcessor = new CommandProcessor();
	});

	it('CommandProcessor() should return a new instance of a CommandProcessor.', function() {
		expect(commandProcessor).to.be.instanceOf(CommandProcessor);
	});

	it('CommandProcessor class should have a function to writePost().', function() {
		expect(typeof(commandProcessor.writePost)).to.equal('function');
	});

	it('writePost(user, message) should publish a message to the given user\'s timeline.', function() {
		const user = new User('Alice');
		const message = 'A message from Alice';

		commandProcessor.writePost(user, message);
		expect(user.timeline.posts.length).to.be.equal(1);
		expect(user.timeline.posts[0]).to.be.instanceof(Post);
		expect(user.timeline.posts[0].message).to.be.equal(message);
	});

	it('CommandProcessor class should have a function to readTimeline().', function() {
		expect(typeof(commandProcessor.readTimeline)).to.equal('function');
	});

	it('readTimeline(user) should return the timeline of the user.', function() {
		const user = new User('Alice');
		const message = 'A message from Alice';
		user.timeline.addNewPost(message);

		expect(commandProcessor.readTimeline(user)).to.be.instanceOf(Array);
	});

	it('CommandProcessor class should have a function to followUser().', function() {
		expect(typeof(commandProcessor.followUser)).to.equal('function');
	});

	it('followUser(userA, username) should add a User with username to userA\'s list of subscribesTo users.', function() {
		const userA = new User('Alice');
		const username = 'Bob';

		commandProcessor.followUser(userA, username);
		
		expect(userA.getListOfFollwedUserNames()).to.contain(username);
	});

	it('CommandProcessor class should have a function to viewWall().', function() {
		expect(typeof(commandProcessor.viewWall)).to.equal('function');
	});

	it('viewWall(user) should show all the posts of the user and anyone they follow.', function() {
		const userA = new User('Alice');
		const userB = new User('Bob');

		userA.subscribeToUser(userB);

		userA.timeline.addNewPost('Hello from Alice!');
		userB.timeline.addNewPost('Hello from Bob!');

		const aliceWall = commandProcessor.viewWall(userA);
		expect(aliceWall.length).to.be.equal(2);

		const bobWall = commandProcessor.viewWall(userB);
		expect(bobWall.length).to.be.equal(1);
	});

	it('CommandProcessor should initialise a CommandProcessor with an empty array of users.', function() {
		const commandProcessor = new CommandProcessor();

		expect(commandProcessor.users.length).to.equal(0);
	});

	it('findUser(username) should return a user found in the list of users or create and return a new one.', function() {
		const commandProcessor = new CommandProcessor();

		commandProcessor.users.push(new User('Alice'));
		const existingUser = commandProcessor.findUser('Alice');
		expect(existingUser).to.be.instanceOf(User);
		expect(existingUser.name).to.equal('Alice');
		
		const createdUser = commandProcessor.findUser('Jim');
		expect(createdUser).to.be.instanceOf(User);
		expect(createdUser.name).to.equal('Jim');
	});

	it('createUser(username) creates a new user with the given username stores it in the list of users and returns it.', function() {
		const commandProcessor = new CommandProcessor();

		const newUser = commandProcessor.createNewUser('Jim');

		expect(newUser).to.be;
		expect(newUser).to.be.instanceOf(User);
		expect(newUser.name).to.equal('Jim');

		expect(commandProcessor.users).to.contain(newUser);
	});
});