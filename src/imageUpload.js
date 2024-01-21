import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { generateClient } from "aws-amplify/api";
import { createImageRaw } from './graphql/mutations';

const client = generateClient()

const ImageUpload = ({multiple,setUploadedFiles}) => {
  console.log('ImageUpload')
  console.log(multiple)
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (event) => {
    // Get the selected files
    const files = event.target.files;
    console.log(files)

    // Update the state with the selected files
    setSelectedFiles(files);
  };

  const handleUpload = async (event) => {
     event.preventDefault();
    // Perform the upload logic using selectedFiles
    var uploadedFileList = [];
    if (selectedFiles) {
    await Promise.all(
      // For demonstration purposes, log the file names
      Array.from(selectedFiles).map(async (file) => {
        console.log('Uploading file:', file.name);
        // Perform your upload logic here (e.g., using FormData and fetch)
        const newImageRaw = await client.graphql({
              query: createImageRaw,
              variables: {
                  input: {
          		"originalFileName": file.name
          	}
              }
          });
          
        console.log(newImageRaw)
        const newFileName = newImageRaw.data.createImageRaw.id;
        try {
          const result = await uploadData({
            key: newFileName,
            data: file,
            options: {
              accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
             // onProgress // Optional progress callback.
            }
          }).result;
          console.log('Succeeded: ', result);
        } catch (error) {
          console.log('Error : ', error);
        }
        
        uploadedFileList.push(newFileName);


    })
    );
    }
    
    console.log('list from imageUpload:')
    console.log(uploadedFileList)
    setUploadedFiles(uploadedFileList);
  };
  
  

  return (
    <div>
      <input
        type="file"
        accept="image/HEIC*" // Accept only image files
        capture
        multiple={multiple} // Allow multiple file selection
        onChange={handleFileChange}
  
      />

      <button onClick={handleUpload}>Upload</button>
      <p/>
    </div>
  );
};

export default ImageUpload;
