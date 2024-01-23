import React, { useState,useEffect,useRef } from 'react';

import { generateClient } from "aws-amplify/api";
import { listBooks } from "./graphql/queries";
import { updateBook,deleteBook } from './graphql/mutations';

import ImageUpload from './imageUpload.js'
import VideoRecorder from './VideoRecorder.js'

import ReactPlayer from 'react-player';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import NewReading from './NewReading.js'
import BookReadRecord from './BookReadRecord.js'
import EditPage from './EditPage'

import Modal from 'react-modal';

  
  
const EditBook = ({setSelectedBook,user,selectedBook,getImageUrl}) => {

    

    
    const [coverImageUrl,setCoverImageUrl] = useState(null)
    const [pages,setPages] = useState([])
    const [book,setBook]=useState(null)
    const [dragEndIndex,setDragEndIndex]=useState(null)
    const [unsavedChanges,setUnsavedChanges]=useState(null)
    const [videoRecordingUrl,setVideoRecordingUrl]=useState(null)
    const videoPlayerRef = useRef(null)
    const [newRecordingActive,setNewRecordingActive] = useState(false)
    const [selectedPageIndex,setSelectedPageIndex] = useState(null)
    const [showDeleteModal,setShowDeleteModal] = useState(false)
    
    const returnToSelection = ()=>{
        setSelectedBook(null)
    }
    
    const client = generateClient()
   

    const getBook = async ()=>{

        console.log('get book!')
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

  const handleEditPage = (pageIndex)=>{
    console.log('EditPageSelected')
    setSelectedPageIndex(pageIndex)
  }

  const handleEditComplete = ()=>{
    setSelectedPageIndex(null)
  }

  const initiateDelete = () =>{
    console.log('initiate delete')
    setShowDeleteModal(true)
    
  }

  const deleteBook = async () =>{
    console.log('delete initiated')
    console.log(book)
    const bookDetails = {
        id: book.id
      };

      console.log(bookDetails)

      try{
        const updatedBook = await client.graphql({
            query: updateBook,
            variables: {
                input: {
                    id:book.id,
                    creatorUserId: book.creatorUserId+'_archived'
                }
                }
        });
    } catch(err){
        console.log('error from updatedBook')
        console.log(err)
    }

    setSelectedBook(null)

  }
    
    
    return <>
    {showDeleteModal && <div style={{height:'100vh',width:'100vw', zIndex:2}}>
        <div style={{ filter: 'none',top:'25vh',left:'10vw', height:'50vh',width:'80vw',color:'white',backgroundColor:'black',zIndex:1,borderRadius:'25px',position:'absolute'}}>
        <p>Are you sure you want to delete this book?</p>
        <button onClick={deleteBook}>Yes, Delete this Book</button>
        <button onClick={()=>setShowDeleteModal(false)}>Cancel</button>
        </div></div>}
    {newRecordingActive && false && !selectedPageIndex && <NewReading book={book} pages={pages} />}
    {newRecordingActive && !selectedPageIndex && 
        <BookReadRecord 
        book={book} 
        pages={pages}
        editMode={true}
        setNewRecordingActive={setNewRecordingActive}
        />
        }
    {selectedPageIndex && 
        <>
            <ArrowBackIcon onClick={()=> handleEditComplete()}/>
            <EditPage 
                            user={user}
                            book={book}
                            pages={pages}
                            setPages={setPages}
                            selectedPageIndex={selectedPageIndex}
                            getBook={getBook}
                />
        </>}
    {!newRecordingActive && !selectedPageIndex && (
            <>
            <span onClick={()=>returnToSelection()}>
                    Return to My Books
                </span>
            <div style={{width:"250px"}}>
            <p>Cover Image</p>
                <img key='CreateNew.png' src={coverImageUrl} alt='CoverImage' className="gallery-image" />
                
                Upload New Cover Image: <ImageUpload multiple={false} setUploadedFiles={uploadNewCoverPage} />
            </div>
            <button onClick={initiateDelete} > Delete Book </button>
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
                                    style={{ cursor: 'grab', marginRight: '10px' ,position:'relative'}}
                                    >
                                         <button
                                           
                                           style={{position: 'absolute',
                                             top: '5px',
                                             right: '5px',
                                             background: 'none',
                                             border: 'none',
                                             cursor: 'pointer',
                                           }}
                                         >
                                           <EditIcon onClick={()=>handleEditPage(index)}/>
                                           <DeleteIcon onClick={()=>handlePageDelete(index)}/>
                                         </button>
                               <img key={each.pageNumber} src={each.imageUrl} alt='CoverImage' className="gallery-image" />


                         {/*EditPage = ({user,book,pages,setPages,selectedPageIndex,setSelectedPageIndex})*/}
                    </div>
                    ))}
                </div>
            <ImageUpload multiple={true} setUploadedFiles={uploadNewPages} />
        </>)}



    </>
}

export default EditBook;