const expect = require('chai').expect;
const UserTimeline = require('../userTimeline');

describe('UserTimeline', function() {
	let userTimeline;

	this.beforeEach(() => {
		userTimeline = new UserTimeline('Alice');
	});

	it('UserTimeline(username) should return a new instance of UserTimeline.', function() {
		expect(userTimeline).to.be.instanceOf(UserTimeline);
	});

	it('UserTimeline(username) should instantiate the posts as an empty array.', function() {
		expect(userTimeline.posts).to.be.instanceOf(Array);
		expect(userTimeline.posts).to.be.empty;
	});

	it('addNewPost(messageText) should take a message and store it as a new Post in the Posts.', function() {
		userTimeline.addNewPost('A new post.');

		expect(userTimeline.posts.length).to.be.greaterThan(0);
	});

	it('getFormattedPosts() should return an array of posts formatted as readable strings', function() {
		userTimeline.addNewPost('Post 1');
		userTimeline.addNewPost('Post 2');

		const formattedPost1 = 'Alice - Post 1';
		const formattedPost2 = 'Alice - Post 2';

		expect(userTimeline.getFormattedPosts()).to.eql([formattedPost2, formattedPost1]);
	});
});