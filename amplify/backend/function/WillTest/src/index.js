const AWS = require('aws-sdk');

const fs = require('fs');

const { exec } = require('child_process');

// Configure AWS SDK
exports.handler = function (eventObject, context) {

const s3 = new AWS.S3();

// Input and output S3 bucket and file keys
const inputBucket = 'auth271fa9d77521a48a78246e8e2cb04ee7f224759-staging';
const inputKey = 'public/009eeaac-8811-4e3c-8908-5ba7b405c9a0.webm';
const outputBucket = 'auth271fa9d77521a48a78246e8e2cb04ee7f224759-staging';
const outputKey = 'public/file.mp4';

// Local temporary file paths
const inputFilePath = '/tmp/input.webm';
const outputFilePath = '/tmp/output.mp4';

// Download WebM file from S3
const downloadParams = {
  Bucket: inputBucket,
  Key: inputKey,
};
console.log(`downloadParams: ${JSON.stringify(downloadParams)}`)

s3.getObject(downloadParams, (err, data) => {
  if (err) {
    console.error('Error downloading WebM file:', err);
    return;
  }
  console.log('in getObject')

  // Save the downloaded WebM file locally
  fs.writeFileSync(inputFilePath, data.Body);

  console.log('file saved locally')

  const ffmpegCommand = `opt/ffmpeg -i ${inputFilePath} ${outputFilePath}`;
  
  exec(ffmpegCommand, (ffmpegErr, stdout, stderr) => {
    if (ffmpegErr) {
      console.error('FFmpeg Error:', ffmpegErr);
      return;
    }

      console.log('Conversion finished');

      // Upload MP4 file to S3
      const uploadParams = {
        Bucket: outputBucket,
        Key: outputKey,
        Body: fs.createReadStream(outputFilePath),
      };

      console.log(`uploadParams: ${JSON.stringify(uploadParams)}`)
      s3.upload(uploadParams, (uploadErr, uploadData) => {
        if (uploadErr) {
          console.error('S3 Upload Error:', uploadErr);
        } else {
          console.log('S3 Upload Success:', uploadData.Location);
        }

        // Optionally, you can delete the local temporary files after processing
        fs.unlinkSync(inputFilePath);
        fs.unlinkSync(outputFilePath);
      });
    })
  

});

}
