const repl = require('repl');

const CommandProessor = require('./lib/commandProessor');

const commandProcessor = new CommandProessor();

function customEvaluator(cmd, context, filename, callback) {
	callback(null, commandProcessor.process(cmd));
}

repl.start({
	prompt: '> ',
	eval: customEvaluator,
	ignoreUndefined: true
});
