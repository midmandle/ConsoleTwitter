const expect = require('chai').expect;
const User = require('../user');
const UserTimeline = require('../userTimeline');

describe('User', function() {
	it('User(username) should return a new instance of User.', function() {
		const newUser = new User('Bob');

		expect(newUser).to.be.instanceOf(User);
	});

	it('Each User instance should have their own UserTimeline instance.', function() {
		const newUser = new User('Bob');

		expect(newUser.timeline).to.be.instanceOf(UserTimeline);
	});

	it('Each User instance should be instantiated without following anyone.', function() {
		const newUser = new User('Bob');

		expect(newUser.follows).to.be.empty;
	});

	it('Getting the User\'s list of follows should return an array of users.', function() {
		const userA = new User('Alice');
		const userB = new User('Bob');
		const userC = new User('Catherine');

		userA.follows.push(userB, userC);

		expect(userA.follows).to.be.eql([userB, userC]);
	});

	it('User.subscribeToUser(user) should add a User reference to the follows list.', function() {
		const userA = new User('Alice');
		const userB = new User('Bob');

		userA.subscribeToUser(userB);

		expect(userA.follows).to.be.eql([userB]);
	});

	it('User.getListOfFollowedUserNames() should return an array of username strings.', function() {
		const userA = new User('Alice');
		const userB = new User('Bob');
		const userC = new User('Catherine');

		userA.subscribeToUser(userB);
		userA.subscribeToUser(userC);

		expect(userA.getListOfFollwedUserNames()).to.be.eql(['Bob', 'Catherine']);
	});
});