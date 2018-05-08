
var fs = require('fs-extra');
var path = require('path');

var moment = require('moment');
var slugify = require('slugify');
var yaml = require('yamljs');

var DEFAULT_METADATA = {
  creationTime: moment().format()
};

module.exports = function(args) {
  
  var filepath = 'pages';
  if (args.type == 'post') filepath = `posts/${moment().format('YYYY/MM/DD')}`
  
  var title = args.title;
  if (!title) {
    if (args.type == 'page') title = "New Page";
    else title = "New Post";
  }
  
  var filename = slugify(title, { replacement: '_', lower: true });
  console.log(filename);
  
  if (args.type == 'post') {
    var postsConfig = JSON.parse(fs.readFileSync(path.resolve(
      __dirname, '..', 'src', '.vuepress', 'posts.json')).toString());
    postsConfig.posts.unshift(`${filepath.slice(6)}/${filename}`);
    fs.writeFileSync(path.resolve(
      __dirname, '..', 'src', '.vuepress', 'posts.json'),
      JSON.stringify(postsConfig));
  }
  
  var metadata = DEFAULT_METADATA;
  metadata.title = title;
  
  var fileStrings = [];
  fileStrings.push('---');
  fileStrings.push(yaml.dump(metadata).trim());
  fileStrings.push('---');
  fileStrings.push('');
  fileStrings.push(`# ${title}`);
  fileStrings.push('');
  fileStrings.push(fs.readFileSync(path.resolve(__dirname,
    `../templates/${args.template}.md`)).toString());
  var fileString = fileStrings.join('\n').trim();
  
  console.log(fileString);
  fs.ensureDirSync(path.resolve(__dirname, '..', 'src', filepath));
  fs.writeFileSync(path.resolve(__dirname, '..', 'src', filepath, `${filename}.md`),
    fileString);
}