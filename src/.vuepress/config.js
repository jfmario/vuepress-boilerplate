
var fs = require('fs-extra');
var path = require('path');

var postsConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname,
  'posts.json')).toString());
var postsSection = [];

for (var i = 0; i < postsConfig.posts.length; ++i) {
  var post = postsConfig.posts[i];
  postsSection.push(`/posts/${post}`);
  
  if (i == 0) {
    fs.copySync(path.resolve(__dirname, '..', 'posts', `${post}.md`),
      path.resolve(__dirname, '..', 'posts', 'README.md'));
  }
}

module.exports = {
  title: "My Blog",
  description: "So this is my blog.",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/blog/" }
    ],
    sidebar: [
      {
        title: 'Recent Posts',
        collapsible: true,
        children: postsSection
      }
    ]
  }
};