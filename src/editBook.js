import React, { useState,useEffect,useRef } from 'react';

import { generateClient } from "aws-amplify/api";
import { listBooks } from "./graphql/queries";
import { updateBook } from './graphql/mutations';

import ImageUpload from './imageUpload.js'
import VideoRecorder from './VideoRecorder.js'

import ReactPlayer from 'react-player';
import DeleteIcon from '@mui/icons-material/Delete';
import NewReading from './NewReading.js'


  
  
const EditBook = ({setSelectedBook,user,selectedBook,getImageUrl}) => {
    const returnToSelection = ()=>{
        setSelectedBook(null)
    }
    

    
    const [coverImageUrl,setCoverImageUrl] = useState(null)
    const [pages,setPages] = useState([])
    const [book,setBook]=useState(null)
    const [dragEndIndex,setDragEndIndex]=useState(null)
    const [unsavedChanges,setUnsavedChanges]=useState(null)
    const [videoRecordingUrl,setVideoRecordingUrl]=useState(null)
    const videoPlayerRef = useRef(null)
    const [newRecordingActive,setNewRecordingActive] = useState(false)
    
    
    
    const client = generateClient()
   

    const getBook = async ()=>{

        //
            // List all items
         //   console.log(selectedBook)
        //try{
            /*
        const bookResult = await client.graphql({
               query: getBook(selectedBook)
          });
          */
        const allBooks = await client.graphql({
            query: listBooks,
            variables:{filter: {and:[{creatorUserId: {eq: user.id}},{name: {eq: selectedBook}}]}}
        });
        
        const thisBook = allBooks.data.listBooks.items[0];
        setBook(thisBook)
        
        const coverImageUrlTemp = await getImageUrl(thisBook.cover_s3_key)
        setCoverImageUrl(coverImageUrlTemp)
        
        const videoRecordingTemp = await getImageUrl(thisBook.raw_book_read_s3_key)
        setVideoRecordingUrl(videoRecordingTemp)
        console.log(videoRecordingTemp)
        console.log(allBooks)
        
        var pagesJSON = []
        if(Array.isArray(thisBook.bookPages)){
            
         pagesJSON = thisBook.bookPages.map(each => JSON.parse(each))
         
         
         
        }
        
        let pagesJSONwithURLs = []
        await Promise.all(
        pagesJSON.map(async(each,index)=>{ 
            if(!each.pageNumber){
                each.pageNumber=index
            }
            var newImageUrl = await getImageUrl(each.imageKey)
            each.imageUrl = newImageUrl
            
             pagesJSONwithURLs.push(each)
            
        })
        )
        setPages(pagesJSONwithURLs)

        
        
/*
        
        } catch(err){
            console.log(err)
        }
        */
        


      }
        
      
    
    useEffect(()=>{
      getBook()
      if (videoPlayerRef.current) {
      videoPlayerRef.current.getInternalPlayer().play();
    }
    },[selectedBook])
    
    const uploadNewPages = async(files) => {
        
        var priorPageCount = pages.length
        
        if(files.length===0){
            return null;
        }
        
        var newPages = files.map((each,index)=>{
                
            const pageObject = {

                "pageNumber":priorPageCount+index,
                "imageKey":each
            }
            return pageObject;
            })
        
        var allPages = [...pages, ...newPages]
        var allPagesString = allPages.map(each=>JSON.stringify(each))

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
    
    const uploadNewCoverPage = async(files) =>{
        
        const newCoverKey = files[0]
        
        try{
            const updatedBook = await client.graphql({
                query: updateBook,
                variables: {
                    input: {
                        id:book.id,
                		cover_s3_key: newCoverKey
                	}
                    }
            });
        } catch(err){
            console.log('error from updatedBook')
            console.log(err)
        }
        
        getBook()
        
        
    }
    
 
    
    var dragOverIndex = null
    
  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData('text/plain', index.toString());
    
      console.log("start"+ index)
  };

  const handleDragOver = (index) => (event) => {
      console.log("mouse over"+ index)
    event.preventDefault();
    dragOverIndex = index
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
    const droppedIndex = dragOverIndex; // Adjust this logic based on your requirements

    // Create a copy of the images array
    var newPages = [...pages];
    // Remove the dragged item from its original position
    const [draggedItem] = newPages.splice(draggedIndex, 1);
    // Insert the dragged item at the new position
    newPages.splice(droppedIndex, 0, draggedItem);
    console.log(newPages)
    
    newPages=newPages.map((each,index) => {
        each.pageNumber = index+1
        return each
    })

    // Update the state with the new order
    setPages(newPages);
    
  };
  
  const updatePages = async(newPages) => {

        var allPages = pages
        if(newPages){
            allPages = allPages.concat(newPages)
            }
        console.log(allPages)
        var allPagesString = allPages.map(each=>JSON.stringify(each))

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
    
  }
  
  const handlePageDelete = (pageIndex)=>{
      
      console.log('delete clicked:'+ pageIndex)
      var newPages =  [...pages]
      console.log(newPages.length)
      newPages.splice(pageIndex,1)
     
      console.log(newPages.length) 
      setPages(newPages)
      console.log(pages.length)
  }
    
    
    return <>
    {newRecordingActive && <NewReading book={book} pages={pages}/>}
    {!newRecordingActive && (
            <>
            <span onClick={()=>returnToSelection()}>
                    Return to My Books
                </span>
            <div style={{width:"250px"}}>
            <p>Cover Image</p>
                <button>edit cover page</button>    
                <img key='CreateNew.png' src={coverImageUrl} alt='CoverImage' className="gallery-image" />
                
                <ImageUpload multiple={false} setUploadedFiles={uploadNewCoverPage} />
            </div>
            <button onClick={()=>setNewRecordingActive(true)} > Record Full Book </button>
         
            <button onClick={()=>updatePages()}>Save Sort and Page Deletions</button>
            <div  className="image-gallery"   
                onDrop={handleDrop}
                >
                    {pages.map((each,index)=> (
                         <div className="gallery-div"
                            draggable
                            onDragStart={handleDragStart(index)}
                            onDragOver={handleDragOver(index)}
                            style={{ cursor: 'grab', marginRight: '10px' }}
                            >
                                      <button
                                           
                                            style={{
                                              position: 'absolute',
                                              top: '5px',
                                              right: '5px',
                                              background: 'none',
                                              border: 'none',
                                              cursor: 'pointer',
                                            }}
                                          >
                                            <DeleteIcon onClick={()=>handlePageDelete(index)}/>
                                          </button>
                                <img key={each.pageNumber} src={each.imageUrl} alt='CoverImage' className="gallery-image" />
                        </div>
                    ))}
                </div>
            <ImageUpload multiple={true} setUploadedFiles={uploadNewPages} />
                 <ReactPlayer
                    url={videoRecordingUrl} 
                    width="640"
                    height="360"
                    controls
                    playing
                  />
        </>)}



    </>
}

export default EditBook;