const repl = require('repl');

const CommandProcessor = require('./lib/commandProessor');

const commandProcessor = new CommandProcessor();

function customEvaluator(cmd, context, filename, callback) {
	callback(null, commandProcessor.process(cmd));
}

repl.start({
	prompt: '> ',
	eval: customEvaluator,
	ignoreUndefined: true
});
