const expect = require('chai').expect;
const Wall = require('../wall');
const User = require('../user');

describe('Wall', function() 
{
	let userA;
	let userB;
	let userC;

	this.beforeEach(() => {
		userA = new User('Alice');
		userB = new User('Bob');
		userC = new User('Charlie');
		userA.timeline.addNewPost('Hello from Alice!');
		userB.timeline.addNewPost('Hello from Bob!');
		userC.timeline.addNewPost('Hello from Charlie!');

		userA.subscribeToUser(userB);
	});

	it('Wall() should take an owner and return a new Wall object.', function() {
		const userAWall = new Wall(userA);
		expect(userAWall).to.be.instanceOf(Wall);
	});

	it('view() should return a timeline of the owner\'s posts and the users they follow', function() {
		const userAWall = new Wall(userA);
		const userAWallPosts = userAWall.view();
		
		expect(userAWallPosts.length).to.equal(2);
		expect(userAWallPosts).to.eql([
			'Bob - Hello from Bob!',
			'Alice - Hello from Alice!'
		]);
	});

	it('a user\'s wall should update if the user follows an additional person.', function () {
		userA.subscribeToUser(userC);

		const userAWall = new Wall(userA);
		const userAWallPosts = userAWall.view();
		
		expect(userAWallPosts.length).to.equal(3);
		expect(userAWallPosts).to.eql([
			'Bob - Hello from Bob!',
			'Charlie - Hello from Charlie!',
			'Alice - Hello from Alice!'
		]);
	});
});