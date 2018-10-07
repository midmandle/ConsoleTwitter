const expect = require('chai').expect;
const sinon = require('sinon');
const CommandProcessor = require('../commandProessor');

describe('commandProcessor', function () {
	
	let commandProcessor = undefined;

	beforeEach(async () => {
		commandProcessor = new CommandProcessor();
		sinon.spy(console, 'log');
	});

	afterEach(async () => {
		console.log.restore();
	});

	it('should create a new user', function() {
		const command = 'Alice';

		commandProcessor.process(command);

		expect(console.log.notCalled).to.be.true;
	});

	it('should create a new post for a given user', function() {
		const command = 'Alice -> Hello';

		commandProcessor.process(command);

		expect(console.log.notCalled).to.be.true;
	});

	it('should output to the console a list of the given user\'s posts if the user exists', function() {
		const command1 = 'Alice';
		const command2 = 'Alice -> Hello';
		const command3 = 'Alice';

		commandProcessor.process(command1);
		commandProcessor.process(command2);
		commandProcessor.process(command3);
		expect(console.log.calledOnce).to.be.true;
		expect(console.log.calledWith('Alice - Hello')).to.be.true;
	});

	it('should display the time since the post was written beside posts older than 1 second', function(done) {
		const command1 = 'Alice';
		const command2 = 'Alice -> Hello';
		const command3 = 'Alice';

		commandProcessor.process(command1);
		commandProcessor.process(command2);
		commandProcessor.process(command3);
		expect(console.log.calledOnce).to.be.true;
		expect(console.log.calledWith('Alice - Hello')).to.be.true;

		setTimeout(() => {
			commandProcessor.process('Alice');
			expect(console.log.calledWith('Alice - Hello (1 second ago)')).to.be.true;
			done();
		}, 1000);		
	});

	it('writing a post for a non-existant user should create that user and associate that post with them.', function() {
		const command1 = 'Alice -> Hello';
		const command2 = 'Alice';

		commandProcessor.process(command1);
		commandProcessor.process(command2);

		expect(console.log.calledOnce).to.be.true;
		expect(console.log.calledWith('Alice - Hello')).to.be.true;
	});

	it('should let one user follow another user.', function() {
		const commands = [
			'Alice',
			'Bob',
			'Alice follows Bob',
			'Bob -> Alice is creepy...',
			'Alice wall'
		];

		for(let command of commands) {
			commandProcessor.process(command);
		}

		expect(console.log.called).to.be.true;
		expect(console.log.args[0][0]).to.eql('Bob - Alice is creepy...');
	});

	it('displaying the user\'s wall should show all the posts for the wall owner and the users followed by the owner.', function(done) {
		const commands = [
			'Alice',
			'Bob',
			'Alice follows Bob',
			'Bob -> Alice is creepy...',
			'Alice wall',
		];

		for(let command of commands) {
			commandProcessor.process(command);
		}

		setTimeout(() => {
			commandProcessor.process('Alice -> Wow Bob. Wow...');
			commandProcessor.process('Alice wall');
			expect(console.log.called).to.be.true;
			expect(console.log.args[0][0]).to.eql('Bob - Alice is creepy...');
			expect(console.log.args[1][0]).to.eql('Alice - Wow Bob. Wow...');
			expect(console.log.args[2][0]).to.eql('Bob - Alice is creepy... (1 second ago)');
			done();
		}, 1000);
	});
});