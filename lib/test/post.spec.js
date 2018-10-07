const expect = require('chai').expect;
const moment = require('moment');
const Post = require('../post');

describe('Post', function() {
	let post;
	let timeCreated;

	this.beforeEach(() => {
		timeCreated = moment();
		post = new Post('Test User', 'Test message');
	});

	it('Post(message) should return a new instance of Post class', function() {
		expect(post).to.be.instanceOf(Post);
	});

	it('Post(message) should create a post with the given message.', function() {
		expect(post.message).to.equal('Test message');
	});

	it('Post(message) should record the timePosted each time a new Post is crated', function() {
		console.log(timeCreated);
		console.log(post.timePosted);
		expect(post.timePosted).to.eql(timeCreated);
	});

	it('post.formatPost() should return the post information formatted as: {usename} - {message} ({timeDifference}).', function(done) {
		const testPost = new Post('Test User', 'Test message');

		setTimeout(() => {
			expect(testPost.formatPost()).to.equal('Test User - Test message (1 second ago)');
			done();
		}, 1000);
		
	});

	it('post.formatPost() should return the post information without a time difference if the interval is less that 1 second.', function(done) {
		const testPost = new Post('Test User', 'Test message');

		setTimeout(() => {
			expect(testPost.formatPost()).to.equal('Test User - Test message');
			done();
		}, 250);
		
	});

	it('post.formatPost() should show the time since posting as plural (second/s) depending on how long it has been.', function(done) {
		this.timeout(3000);
		const testPost = new Post('Test User', 'Test message');

		setTimeout(() => {
			expect(testPost.formatPost()).to.equal('Test User - Test message (2 seconds ago)');
			done();
		}, 2000);
	});
});