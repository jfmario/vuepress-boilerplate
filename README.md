
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

### Acknowledgements #

**Author**

* John F Marion

**Built With**

* VuePress