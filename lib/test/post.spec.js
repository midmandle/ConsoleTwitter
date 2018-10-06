const expect = require('chai').expect;
const moment = require('moment');
const Post = require('../post');

describe('Post', function() {
	let post;

	this.beforeEach(() => {
		post = new Post('Test User', 'Test message');

	});

	it('Post(message) should return a new instance of Post class', function() {
		expect(post).to.be.instanceOf(Post);
	});

	it('Post(message) should create a post with the given message.', function() {
		expect(post.message).to.equal('Test message');
	});

	it('formatPost(username, currentTime post) and return {usename} - {message} ({timeDifference}).', function() {
	});

	it('getTimeDifference(currentTime, postTime) returns the time difference in seconds.', function() {

	});

	it('Post(message) should record the timePosted each time a new Post is crated', function() {
		expect(post.timePosted).to.be;
	});

	it('getHumanizedResult(difference) should return \'(1 second ago)\' if the difference is -1', function() {
		expect(post.getHumanizedResult(-1)).to.equal('1 second ago');
	});

	it('getHumanizedResult(difference) should return \'(2 seconds ago)\' if the difference is -2', function() {
		expect(post.getHumanizedResult(-2)).to.equal('2 seconds ago');
	});

	it('getHumanizedResult(difference) should return \'(1 minute ago)\' if the difference is -60', function() {
		expect(post.getHumanizedResult(-60)).to.equal('1 minute ago');
	});

	it('getHumanizedResult(difference) should return \'(2 minutes ago)\' if the difference is -120', function() {
		expect(post.getHumanizedResult(-120)).to.equal('2 minutes ago');
	});

	it('getHumanizedResult(difference) should return \'(1 hour ago)\' if the difference is -3600', function() {
		expect(post.getHumanizedResult(-3600)).to.equal('1 hour ago');
	});

	it('getHumanizedResult(difference) should return \'(2 hours ago)\' if the difference is -7200', function() {
		expect(post.getHumanizedResult(-7200)).to.equal('2 hours ago');
	});
});