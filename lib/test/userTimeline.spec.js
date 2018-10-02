const expect = require('chai').expect;
const UserTimeline = require('../userTimeline');

describe('UserTimeline', function() {
	it('UserTimeline(username) should return a new instance of UserTimeline.', function() {
		const userTimeline = new UserTimeline('Alice');

		expect(userTimeline).to.be.instanceOf(UserTimeline);
	});

	it('UserTimeline(username) should instantiate the object with the username.', function() {
		const userTimeline = new UserTimeline('Alice');

		expect(userTimeline.Username).to.equal('Alice');
	});

	it('UserTimeline(username) should instantiate the posts as an empty Map.', function() {
		const userTimeline = new UserTimeline('Alice');

		expect(userTimeline.Posts).to.be.instanceOf(Map);
		expect(userTimeline.Posts).to.be.empty;
	})

	it('addNewPost(messageText) should take a message and store it as a new Post in the Posts.', function() {
		const userTimeline = new UserTimeline('Alice');

		userTimeline.addNewPost('A new post.');

		expect(userTimeline.Posts.size).to.be.greaterThan(0);
	});
});