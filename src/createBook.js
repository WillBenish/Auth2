

import React, {useState,useEffect} from 'react';
import { generateClient } from "aws-amplify/api";
import { createBook ,createRawImages} from './graphql/mutations';
import ImageUpload from './imageUpload.js'


const client = generateClient()


const CreateBook = ({ showCreateBook, setShowCreateBook,user }) => {

  const [bookTitle, setBookTitle] = useState('');
  
  const [coverS3Key, setCoverS3Key] = useState(null);
  const [uploadedFiles,setUploadedFiles] = useState([])
  
  const thisValueIsFalse = false
  
  const handleTitleChange = (e) => {
    setBookTitle(e.target.value);
  };
  
  const handleSubmit = async () => {
    // Pass the bookTitle to the parent component
    //onSubmit(bookTitle);
    
  const client = generateClient()
  console.log('cover s3 key:')
  console.log(coverS3Key)
  try {
  const newBook = await client.graphql({
        query: createBook,
        variables: {
            input: {
    		"name": bookTitle,
    		"creatorUserId":user.id,
    		"cover_s3_key":coverS3Key
    	}
        }
    });
        
  } catch(err){
    console.log('failed to createBook')
    console.log(err)
  }


    
    // Close the modal
    setShowCreateBook(false)
  };
  
  useEffect(()=>{
    
    if(uploadedFiles){
    console.log('Uploaded Files from Create Book:')
    console.log(uploadedFiles)
    setCoverS3Key(uploadedFiles[0])
    }
  },[uploadedFiles])

  if (!showCreateBook) return null;
  return (
    <div className="modal-overlay">
      <div className="modal" style={{color:"black"}}>
      
          <label>
            Book Title:
            <input
              type="text"
              value={bookTitle}
              onChange={handleTitleChange}
            />
          </label>
          <p>(optional) Upload Cover Page</p>
          <p></p>
          
          <ImageUpload multiple={false} setUploadedFiles={setUploadedFiles}/>
          <div className="button-container">
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
            <button type="button" onClick={()=>setShowCreateBook(false)}>
              Cancel
            </button>
          </div>
            
      </div>
    </div>
  );
};
/*
import react from 'react'
import ImageUploader from './imageUpload.js'

export default function createBook(){
    
    return (<>
            <p>Placeholder for content to create a new "Book"</p>
            <ImageUploader />
            </>);
}

*/
export default CreateBook;