/**
 * Publishes site to S3 dev or pub bucket.
 */

require('dotenv').config();

var AWS = require('aws-sdk');
var fs = require('fs-extra');
var mime = require('mime-types');

var walk = require('../lib/walk');

async function putS3File(params, S3) {
  return new Promise(function(resolve, reject) {
    S3.putObject(params, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    })
  })
}

async function publish(args) {
  
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY;
  AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY;
  AWS.config.region = process.env.AWS_REGION;
  var S3 = new AWS.S3();

  var bucketName = process.env.DEV_S3_BUCKET;
  if (args.production) bucketName = process.env.PUB_S3_BUCKET;
  
  await Promise.all([
    // first copy home files
    walk('src/.vuepress/dist').map(function(fpath) {

      var mType = mime.lookup(fpath);
      if (!mType) mType = 'application/octet-stream';

      var key = fpath.split('src/.vuepress/dist/')[1];
      var params = {
        ACL: 'public-read',
        Body: fs.readFileSync(fpath),
        Bucket: bucketName,
        ContentType: mType,
        Key: key
      };

      console.log(`Placing file in S3 Bucket: ${params.Key}`);
      return putS3File(params, S3);
    })
  ]);
}

module.exports = publish;