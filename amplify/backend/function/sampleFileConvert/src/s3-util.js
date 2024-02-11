/*global module, require, Promise, console */

import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const aws = require('aws-sdk'),
import	fs from 'fs'

const client = new S3Client({});

 const getObject = async (bucket,key) => {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: keyForUpload,
    });
  
    try {
      const response = await client.send(command);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

   const putObject = async (bucket,keyForUpload,fileToUpload) => {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: keyForUpload,
      Body: fileToUpload,
    });
  
    try {
      const response = await client.send(command);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

module.exports = {
	downloadFileFromS3: getObject,
	uploadFileToS3: putObject
};