
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
newCommand.addArgument('title', {
  action: 'store'
});
newCommand.addArgument(['-e', '--template'], {
  action: 'store',
  defaultValue: "empty"
});

var publishCommand = subs.addParser('publish', {
  addHelp: true
});
publishCommand.addArgument(['-p', '--production'], {
  action: 'storeTrue'
});

var bookCommand = subs.addParser('book', {
  addHelp: true
});


var args = parser.parseArgs();
if (args.sub == 'new') {
  require('./scripts/new-item')(args);
}
if (args.sub == 'publish') {
  require('./scripts/publish')(args);
}
if (args.sub == 'book') {
  require('./scripts/book')(args);
}