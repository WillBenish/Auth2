import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { generateClient } from "aws-amplify/api";
import { createImageRaw } from './graphql/mutations';

const client = generateClient()

const ImageUpload = ({multiple,setUploadedFiles}) => {

  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = async (event) => {
    // Get the selected files
    const files = event.target.files;
    console.log(files)

    // Update the state with the selected files
   // setSelectedFiles(files);  

    var uploadedFileList= [];

    await Promise.all(
      // For demonstration purposes, log the file names
      Array.from(files).map(async (file) => {
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
<div>Or Upload from Camera Roll</div>
<input
        type="file"
        accept="image/HEIC*" // Accept only image files
        multiple={multiple} // Allow multiple file selection
        onChange={handleFileChange}
  
      />

      
      <p/>
    </div>
  );
};

export default ImageUpload;
