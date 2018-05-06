
var fs = require('fs-extra');
var path = require('path');

const LIMIT_RECENT_POSTS = 10;

var postsConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname,
  'posts.json')).toString());
var postsSection = [];

// gather blog posts
for (var i = 0; i < postsConfig.posts.length; ++i) {
  
  // gather recent postss
  var post = postsConfig.posts[i];
  postsSection.push(`/posts/${post}`);
  
  // copy most recent blog post to README.md
  if (i == 0) {
    fs.copySync(path.resolve(__dirname, '..', 'posts', `${post}.md`),
      path.resolve(__dirname, '..', 'posts', 'README.md'));
  }
  if (i == LIMIT_RECENT_POSTS) break;
}

var sidebar = [
  // delete the following object if you don't want blog behavior
  {
    title: 'Recent Posts',
    collapsible: true,
    children: postsSection
  }
]

var booksJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname,
  'books.json')).toString());

for (var i = 0; i < booksJSON.length; ++i) {
  sidebar.push(booksJSON[i]);
}

module.exports = {
  title: "My Blog",
  description: "So this is my blog.",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/posts/" },
      { text: "About", link: "/pages/about" }
    ],
    sidebar: sidebar
  }
};