
# VuePress Boilerplate #

UNDER CONSTRUCTION

This repository is a boilerplate for VuePress static sites. It should be used 
as a starter project.

The plan is to include a configuration and setup that I like, as well as 
a helpful CLI of utils.

## Overview #

## Getting Started #

### Installation #

```
git clone https://github.com/jfmario/vuepress-boilerplate.git
cd vuepress-boilerplate/
rm -rf .git/ # delete the git folder
npm i        # install dependencies
```

### Usage #

Create a new page:

`node . new page "New Page Name"`

Create a new post:

`node . new post "New Post Title"`

Build and server:

`npm run build && npm run serve`

**AWS**

Copy the `example.env` file to `.env` and fill the values.
You must create the AWS S3 Buckets and configure them for static site hosting.

Publish site to dev bucket:

`node . publish`

Publish site to public bucket:

`node . publish -p`

**Books**

NOTE: This part doesn't work that well so don't do book stuff with this boilerplate yet.

This boilerplate has support for "books". 
Book chapters should be defined somewhere under `books_src/` and
referenced in book.yml.
Book chapters should have no frontmatter or title. They should also 
not use any Vue components if you want to use RelaXedJs.

If you don't want the books, alter
"src/.vuepress/books.json" to be only `[]` and then
never run the `node . book` command.

List books in `book.yml`. When you run `node . book`, the book chapters
are given frontmatter and copied into the `src/book/` directory and 
the `src/.vuepress/books.json` file will be written. When the site is built,
any books will be present in the sidebar along with a table of contents.

The `node . book` command will also write a root-level `.pug` file with 
the name of the book that should be easily made into a PDF 
using RelaXedJs.

### Acknowledgements #

**Author**

* John F Marion

**Built With**

* VuePress
