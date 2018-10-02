const expect = require('chai').expect;
const sinon = require('sinon');
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
		expect(user.Timeline.Posts.length).to.be.equal(1);
		expect(user.Timeline.Posts[0]).to.be.instanceof(Post);
		expect(user.Timeline.Posts[0].message).to.be.equal(message);
	});

	it('CommandProcessor class should have a function to readTimeline().', function() {
		expect(typeof(commandProcessor.readTimeline)).to.equal('function');
	});

	it('readTimeline(user) should return the timeline of the user.', function() {
		const user = new User('Alice');
		const message = 'A message from Alice';
		user.Timeline.addNewPost(message);

		expect(commandProcessor.readTimeline(user)).to.be.instanceOf(Array);
	});

	it('readTimeline(user) should return the timeline of a user in chronological order.', function() {
		const user = new User('Alice');
		const date1 = new Date();
		const date2 = new Date();
		const date3 = new Date();

		date2.setSeconds(date1.getSeconds() + 1);
		date3.setSeconds(date1.getSeconds() + 2);

		const message1 = new Post('A message from Alice1');
		const message2 = new Post('A message from Alice2');
		const message3 = new Post('A message from Alice1');

		message1.timePosted = date1;
		message2.timePosted = date2;
		message3.timePosted = date3;

		user.Timeline.addNewPost(message3);
		user.Timeline.addNewPost(message1);
		user.Timeline.addNewPost(message2);
		expect(commandProcessor.readTimeline(user)).to.eql([message1, message2, message3]);
	});

	it('CommandProcessor class should have a function to viewWall().', function() {
		expect(typeof(commandProcessor.viewWall)).to.equal('function');
	});

	it('CommandProcessor class should have a function to followUser().', function() {
		expect(typeof(commandProcessor.followUser)).to.equal('function');
	});
});