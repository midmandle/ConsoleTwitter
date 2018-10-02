const expect = require('chai').expect;
const CommandProcessor = require('../commandProessor');
const UserTimeline = require('../userTimeline');
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

	it('writePost(userTimeline, message) should publish a message to the given timeline.', function() {
		const userTimeline = new UserTimeline('Alice');
		const message = 'A message from Alice';

		commandProcessor.writePost(userTimeline, message);
		expect(userTimeline.Posts.size).to.be.greaterThan(0);

		const posts = userTimeline.Posts.values();
		const post = posts.next().value;
		expect(posts.next().done).to.be.true;
		expect(post).to.be.instanceof(Post);
		expect(post.message).to.be.equal(message);
	});

	it('CommandProcessor class should have a function to readTimeline().', function() {
		expect(typeof(commandProcessor.readTimeline)).to.equal('function');
	});

	it('CommandProcessor class should have a function to viewWall().', function() {
		expect(typeof(commandProcessor.viewWall)).to.equal('function');
	});

	it('CommandProcessor class should have a function to followUser().', function() {
		expect(typeof(commandProcessor.followUser)).to.equal('function');
	});
});