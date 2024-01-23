import React, { useState,useEffect,useRef } from 'react';

import { generateClient } from "aws-amplify/api";
import { updateBook } from './graphql/mutations';

import ImageUpload from './imageUpload.js'
import NewReading from './NewReading.js'
import BookReadRecord from './BookReadRecord.js'
import { ConsoleLogger } from 'aws-amplify/utils';


  
  
const EditPage = ({user,book,pages,setPages,selectedPageIndex,setSelectedPageIndex,getBook}) => {

    

    
  
    const [unsavedChanges,setUnsavedChanges]=useState(null)
    const [videoRecordingUrl,setVideoRecordingUrl]=useState(null)
    const videoPlayerRef = useRef(null)
    const [newRecordingActive,setNewRecordingActive] = useState(false)
    
    const returnToSelection = ()=>{
        setSelectedPageIndex(null)
    }
    
    const client = generateClient()
   
    useEffect(()=>{
      console.log(selectedPageIndex)
      console.log(pages[selectedPageIndex])
      },[])

      
    
    useEffect(()=>{
      if (videoPlayerRef.current) {
      videoPlayerRef.current.getInternalPlayer().play();
    }
    },[selectedPageIndex])
    
    const saveNewPageImage = async(files) => {
        var newPages = pages
        newPages[selectedPageIndex].imageKey = files[0]
        console.log(newPages)
        setPages(newPages)

        var allPagesString = newPages.map(each=>JSON.stringify(each))

        try{
            const updatedBook = await client.graphql({
                query: updateBook,
                variables: {
                    input: {
                        id:book.id,
                		bookPages: allPagesString
                	}
                    }
            });
        } catch(err){
            console.log('error from updatedBook')
            console.log(err)
        }

        getBook()
        
    }
    

    
 
    
   

 
  

  
  const handlePageDelete = ()=>{
      
      console.log('delete clicked:'+ selectedPageIndex)
      var newPages =  [...pages]
      console.log(newPages.length)
      newPages.splice(selectedPageIndex,1)
     
      console.log(newPages.length) 
      setPages(newPages)
      console.log(pages.length)
  }

  const handleRecordSpecificImage=()=>{
    console.log('specific page requesting recording:')
    console.log(selectedPageIndex)
    setNewRecordingActive(true)
  }
    
    
    return <>
    {newRecordingActive && (false) && <NewReading book={book} pages={pages} selectedPageIndex={selectedPageIndex}/>}
    {newRecordingActive && 
        <BookReadRecord 
        book={book} 
        pages={pages}
        editMode={true}
        selectedPageIndex={selectedPageIndex}
        setNewRecordingActive={setNewRecordingActive}
        />
        }
    {!newRecordingActive && (
            <div style={{position: 'relative'}}> 
                             <p>Upload New Image</p>

                <ImageUpload multiple={false} setUploadedFiles={saveNewPageImage} />  
                             <button onClick={handleRecordSpecificImage}>Record New Video</button>

                             <p>Save and Close</p>
                                <div className="edit-page-img">
                                <img key={pages[selectedPageIndex].pageNumber} src={pages[selectedPageIndex].imageUrl} alt='CoverImage'  />
                                </div>
                     

            
        </div>)}



    </>
}

export default EditPage;