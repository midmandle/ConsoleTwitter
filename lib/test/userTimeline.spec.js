const expect = require('chai').expect;
const UserTimeline = require('../userTimeline');

describe('UserTimeline', function() {
	it('UserTimeline(username) should return a new instance of UserTimeline.', function() {
		const userTimeline = new UserTimeline('Alice');

		expect(userTimeline).to.be.instanceOf(UserTimeline);
	});

	it('UserTimeline(username) should instantiate the posts as an empty Map.', function() {
		const userTimeline = new UserTimeline('Alice');

		expect(userTimeline.Posts).to.be.instanceOf(Array);
		expect(userTimeline.Posts).to.be.empty;
	});

	it('addNewPost(messageText) should take a message and store it as a new Post in the Posts.', function() {
		const userTimeline = new UserTimeline('Alice');

		userTimeline.addNewPost('A new post.');

		expect(userTimeline.Posts.length).to.be.greaterThan(0);
	});

	it('Posts getter should return an array of posts.', function() {
		const userTimeline = new UserTimeline('Alice');
		expect(userTimeline.Posts).to.be.instanceOf(Array);
		expect(userTimeline.Posts).to.be.empty;
	});
});