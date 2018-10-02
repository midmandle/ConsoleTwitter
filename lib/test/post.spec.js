const expect = require('chai').expect;
const Post = require('../post');

describe('Post', function() {

	it('Post(message) should return a new instance of Post class', function() {
		const post = new Post('Test message');
		expect(post).to.be.instanceOf(Post);
	});

	it('Post(message) should create a post with the given message.', function() {
		const post = new Post('Test message');
		expect(post.Message).to.equal('Test message');
	});

	it('Post(message) should record the timePosted each time a new Post is instanciated', function() {
		const post = new Post('Test message');
		expect(post.TimePosted).to.be.instanceOf(Date);
	})
});