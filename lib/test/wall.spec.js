const expect = require('chai').expect;
const Wall = require('../wall');
const User = require('../user');

describe('Wall', function() 
{
	let userA;
	let userB;

	this.beforeEach(() => {
		userA = new User('Alice');
		userB = new User('Bob');
		userA.timeline.addNewPost('Hello from Alice!');
		userB.timeline.addNewPost('Hello from Bob!');

		userA.subscribeToUser(userB);
	});

	it('Wall() should take an owner and return a new Wall object.', function() {
		const userAWall = new Wall(userA);
		expect(userAWall).to.be.instanceOf(Wall);
	});

	it('view() should return a timeline of the owner\'s posts and the users they follow', function() {
		expect(userA.getWallPosts().length).to.equal(2);
	});

	it('getMergedTimelines() should return the user\'s timeline merged with the user\'s followed.', function() {
		const userAWall = new Wall(userA);
		expect(userAWall.getMergedTimelines()).to.have.lengthOf(2);
	});

	it('extractFollowedPosts(user) should extract the posts from each of the followed users and add them to the wall owners list of posts.', function() {
		const owner = new User('Alice');
		const followedUser1 = new User('Bob');
		const followedUser2 = new User('Charlie');

		owner.timeline.addNewPost('Hello Alice!');
		followedUser1.timeline.addNewPost('Hello Bob!');
		followedUser2.timeline.addNewPost('Hello Charlie!');

		owner.follows.push(followedUser1);
		owner.follows.push(followedUser2);

		const ownerWall = new Wall(owner);
		const extractedPosts = ownerWall.extractFollowedPosts(owner);

		const expected = [
			followedUser1.timeline.posts,
			followedUser2.timeline.posts,
			owner.timeline.posts
		];

		expect(extractedPosts).to.eql(expected);
	});

	it('mergeposts(listOfPosts) should flatten the listOfPosts array of lists into a flat array of posts.', function() {
		const owner = new User('Alice');
		const followedUser1 = new User('Bob');
		const followedUser2 = new User('Charlie');

		owner.timeline.addNewPost('Hello Alice!');
		followedUser1.timeline.addNewPost('Hello Bob!');
		followedUser2.timeline.addNewPost('Hello Charlie!');

		owner.follows.push(followedUser1);
		owner.follows.push(followedUser2);

		const ownerWall = new Wall(owner);
		const extractedPosts = ownerWall.extractFollowedPosts(owner);
		const mergedPosts = ownerWall.mergePosts(extractedPosts);

		const expected = [
			followedUser1.timeline.posts[0],
			followedUser2.timeline.posts[0],
			owner.timeline.posts[0]
		];

		expect(mergedPosts).to.eql(expected);
	});
});