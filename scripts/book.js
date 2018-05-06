
var fs = require('fs-extra');
var path = require('path');

var slugify = require('slugify');
var yaml = require('yamljs');

var pugEnding = `
template.footer
  style(type='text/css').
    .pdf-footer {
      font-family: Helvetica;
      font-size: 10px;
      width: 100%;
      text-align: center;
    }  
  .pdf-footer #[span.pageNumber]
template.header
  //- If you have a footer, you need a header (here we leave it empty)
  span bla`;

module.exports = function(args) {
  
  var bookData = yaml.load('book.yml');
  var sidebarData = [];
  
  for (var i = 0; i < bookData.length; ++i) {
    
    var book = bookData[i];
    var sidebar = { collapsible: true, children: [] };
    var bookDir = slugify(book.title, { replacement: '_', lower: true });
    
    sidebar.title = book.title;
    sidebar.children.push(`book/${bookDir}/`);
    
    var indexMdLines = ['---'];
    indexMdLines.push(`title: "Contents"`)
    indexMdLines.push('---');
    indexMdLines.push('');
    indexMdLines.push(`# ${book.title}`)
    indexMdLines.push('');
    
    if (book.description) {
      indexMdLines.push(book.description);
      indexMdLines.push('');
    }
    
    var bookPugLines = [''];
    bookPugLines.push('style\n  include:scss book.scss');
    bookPugLines.push(`#cover`);
    bookPugLines.push(`  h1.book-title ${book.title}`);
    bookPugLines.push(`  h2.author ${book.author}`);
    
    for (var j = 0; j < book.chapters.length; ++j) {
      
      var chapter = book.chapters[j];
      var chapterLines = ['---'];
      
      chapterLines.push(`title: "${chapter.title}"`);
      chapterLines.push('---');
      chapterLines.push('');
      chapterLines.push(`# ${chapter.title}`);
      chapterLines.push('');
      
      bookPugLines.push('.chapter');
      
      if (chapter.img) {
        
        chapterLines.push(`![](${chapter.img})`);
        chapterLines.push('');
        
        bookPugLines.push(`  img.title-image(src="src/.vuepress/public${chapter.img}")`);
      }
      
      chapterLines.push(fs.readFileSync(path.resolve('books_src', chapter.src)).toString());
      var chapterMd = chapterLines.join('\n');
      
      fs.ensureDirSync(path.resolve(__dirname, '..', 'src', 'book', bookDir));
      fs.writeFileSync(
        path.resolve(__dirname, '..', 'src', 'book', bookDir, `p${j}.md`),
        chapterMd
      );
      
      indexMdLines.push(`* [${chapter.title}](./p${j}.md)`);
      sidebar.children.push(`book/${bookDir}/p${j}.md`);
      bookPugLines.push(`  h1 ${chapter.title}`)
      bookPugLines.push(`  include:markdown-it(html=true) books_src/${chapter.src}`);
    }
    
    fs.writeFileSync(
      path.resolve(__dirname, '..', 'src', 'book', bookDir, `README.md`),
      indexMdLines.join('\n')
    );
    sidebarData.push(sidebar);
    bookPugLines.push(pugEnding);
    
    fs.writeFileSync(
      path.resolve(__dirname, '..', `${bookDir}.pug`),
      bookPugLines.join('\n')
    )
  }
  
  fs.writeFileSync(
    path.resolve(__dirname, '..', 'src', '.vuepress', 'books.json'),
    JSON.stringify(sidebarData)
  )
}