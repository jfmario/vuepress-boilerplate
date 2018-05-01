
var argparse = require('argparse');

var parser = argparse.ArgumentParser({
  addHelp: true,
  description: "VuePress helper CLI.",
  version: "1.0.0"
});

var subs = parser.addSubparsers({
  dest: 'sub',
  title: "subcommand"
});

var newCommand = subs.addParser('new', {
  addHelp: true
});
newCommand.addArgument('type', {
  action: 'store',
  choices: ["page", "post"]
});
newCommand.addArgument(['-e', '--template'], {
  action: 'store',
  defaultValue: "empty"
});
newCommand.addArgument(['-t', '--title'], {
  action: 'store'
});

var args = parser.parseArgs();
if (args.sub == 'new') {
  require('./scripts/new-item')(args);
}

