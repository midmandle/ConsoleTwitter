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
});