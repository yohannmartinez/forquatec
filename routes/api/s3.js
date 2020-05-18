const express = require("express");
const router = express.Router();

const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

AWS.config.update({
    accessKeyId: "AKIAJ2XES3MMAFXKEO3A",
    secretAccessKey: "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"
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// @route POST api/s3/upload
// @desc upload file
// @access Public
const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: "forquatec",
      ContentType: type.mime,
      Key: `${name}`
    };
    return s3.upload(params).promise();
  };
  
  // Define POST route
  router.post('/upload', (request, response) => {
    const form = new multiparty.Form();
      form.parse(request, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
          const path = files.file[0].path;
          
          const buffer = fs.readFileSync(path);
          const type = fileType.fromBuffer(buffer);
          const timestamp = Date.now().toString();
          const fileName = `${timestamp + files.file[0].originalFilename}`;
          const data = await uploadFile(buffer, fileName, type);
          return response.status(200).send(data);
        } catch (error) {
            console.log(error)
          return response.status(400).send(error);
        }
      });
  });

module.exports = router;