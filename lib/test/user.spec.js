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

		expect(newUser.Timeline).to.be.instanceOf(UserTimeline);
	});

});