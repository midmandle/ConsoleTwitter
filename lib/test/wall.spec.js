const expect = require('chai').expect;
const Wall = require('../wall');
const User = require('../user');
const Post = require('../post');

describe('Wall', function() 
{
	let userA;
	let userB;

	this.beforeEach(() => {
		userA = new User('Alice');
		userB = new User('Bob');
		userA.Timeline.addNewPost('Hello from Alice!');
		userB.Timeline.addNewPost('Hello from Bob!');

		userA.subscribeToUser(userB);
	});

	it('Wall() should take an owner and return a new Wall object.', function() {
		const userAWall = new Wall(userA);
		expect(userAWall).to.be.instanceOf(Wall);
	});

	it('view() should return a timeline of the owner\'s posts and the users they follow', function() {
		expect(userA.Wall.length).to.equal(2);
	});

	it('getMergedTimelines() should return the user\'s timeline merged with the user\'s followed.', function() {
		const userAWall = new Wall(userA);
		expect(userAWall.getMergedTimelines()).to.have.lengthOf(2);
	});

	it('extractFollowedPosts(user) should extract the posts from each of the followed users and add them to the wall owners list of posts.', function() {
		const owner = new User('Alice');
		const followedUser1 = new User('Bob');
		const followedUser2 = new User('Charlie');

		owner.Timeline.addNewPost('Hello Alice!');
		followedUser1.Timeline.addNewPost('Hello Bob!');
		followedUser2.Timeline.addNewPost('Hello Charlie!');

		owner.follows.push(followedUser1);
		owner.follows.push(followedUser2);

		const ownerWall = new Wall(owner);
		const extractedPosts = ownerWall.extractFollowedPosts(owner);

		const expected = [
			followedUser1.Timeline.Posts,
			followedUser2.Timeline.Posts,
			owner.Timeline.Posts
		];

		expect(extractedPosts).to.eql(expected);
	});

	it('mergeposts(listOfPosts) should flatten the listOfPosts array of lists into a flat array of posts.', function() {
		const owner = new User('Alice');
		const followedUser1 = new User('Bob');
		const followedUser2 = new User('Charlie');

		owner.Timeline.addNewPost('Hello Alice!');
		followedUser1.Timeline.addNewPost('Hello Bob!');
		followedUser2.Timeline.addNewPost('Hello Charlie!');

		owner.follows.push(followedUser1);
		owner.follows.push(followedUser2);

		const ownerWall = new Wall(owner);
		const extractedPosts = ownerWall.extractFollowedPosts(owner);
		const mergedPosts = ownerWall.mergePosts(extractedPosts);

		const expected = [
			followedUser1.Timeline.Posts[0],
			followedUser2.Timeline.Posts[0],
			owner.Timeline.Posts[0]
		];

		expect(mergedPosts).to.eql(expected);
	});

	it('formatPost(username, post) and return {usename} - {message} ({timeDifference}).', function() {
		const user = new User('Alice');
		const post = new Post('Hello Test!');
		const wall = new Wall(user);

		const formattedPost = wall.formatPost('Alice', new Date(), post);
		const expected = `Alice - ${post.Message}`;

		expect(formattedPost).to.equal(expected);
	});

	it('getTimeDifference(currentTime, postTime) returns the time difference as a formatted string.', function() {
		const user = new User('Alice');
		const wall = new Wall(user);

		const date1 = new Date();
		const date2 = new Date();
		date2.setSeconds(date1.getSeconds() + 1);
		const date3 = new Date();
		date3.setSeconds(date1.getSeconds() + 2);
		const date4 = new Date();
		date4.setSeconds(date1.getSeconds() + 60);
		const date5 = new Date();
		date5.setSeconds(date1.getSeconds() + 120);

		expect(wall.getTimeDifference(date1, date2)).to.equal('(1 second ago)');
		expect(wall.getTimeDifference(date1, date3)).to.equal('(2 seconds ago)');
		expect(wall.getTimeDifference(date1, date4)).to.equal('(1 minute ago)');
		expect(wall.getTimeDifference(date1, date5)).to.equal('(2 minutes ago)');

	});
});