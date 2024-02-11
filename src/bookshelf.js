import React, { useState,useEffect } from 'react';
import SwipeImageSlider from './book-swipe.js'
import BookReader from './BookReader.js'
import BookReadRecord from './BookReadRecord.js'

import { generateClient } from "aws-amplify/api";
import { listBooks, listSubscriptions } from "./graphql/queries";
import { getUrl } from 'aws-amplify/storage';


const BookShelf = ({ books ,setSelectedBook,selectedBook,user,getImageUrl}) => {
  
  
const [bookList,setBookList] =useState([])
const [book,setBook] = useState(null)
const [pages,setPages] = useState([])

useEffect(() => {
  console.log('Bookshelf useEffect')
  console.log(book)
  console.log(user)
  const getBooks = async ()=>{
   const client = generateClient()

   const filterSubscriptionObject ={and:[{subscriberEmail:{eq: user.email}},{subscriberEmail:{attributeExists:true}}]}

   console.log(filterSubscriptionObject)
   const listOfSubscriptions = await client.graphql({
        query: listSubscriptions,
        variables:{filter: filterSubscriptionObject }
   })
   console.log('ListSubscriptions')
   console.log(listOfSubscriptions)

   var filterBookObject = {or:[{creatorUserId:{eq: user.id}}]}
   
   listOfSubscriptions.data.listSubscriptions.items.map(each => filterBookObject.or.push({creatorUserId:{eq: each.creatorId}}))
            // List all items

            console.log(filterBookObject)
    

   const allBooks = await client.graphql({
            query: listBooks,
            variables:{filter: filterBookObject}
        });
        
        const initialBookList = await Promise.all(allBooks.data.listBooks.items.map(async (each) => {
          if(each.cover_s3_key != null){
          each.imageUrl = await getImageUrl(each.cover_s3_key)
          }
          return each
        }))
        
        setBookList(initialBookList)
  }

  getBooks()
   
},[user])

const images = ['local1.png','local2.png','local3.png','local1.png','local2.png','local3.png']

const updateBookSelection = async (bookSelection) =>{
  console.log('select a book')
  
  console.log(bookSelection)
  setBook(bookSelection);
  setSelectedBook(bookSelection.id)

  var pagesJSON = []
        if(Array.isArray(bookSelection.bookPages)){
            
         pagesJSON = bookSelection.bookPages.map(each => JSON.parse(each))
         
         
         
        }
        
        let pagesJSONwithURLs = []
        await Promise.all(
          pagesJSON.map(async(each,index)=>{ 
              if(!each.pageNumber){
                  each.pageNumber=index
              }
              each.imageUrl=null
              each.videoUrl = null
              console.log(`this is the video_s3_key${each.video_s3_key}`)
              console.log(each.video_s3_key.replace(/\.webm$/, ".mp4"))
              
              var newImageUrl = await getImageUrl(each.imageKey)
              if(newImageUrl){each.imageUrl = newImageUrl}
              
              var newVideoUrl = await getImageUrl(each.video_s3_key.replace(/\.webm$/, ".webm"))
              
              if(newVideoUrl){
                each.videoUrl = newVideoUrl}
              
              
               pagesJSONwithURLs.push(each)
              
          })
          )
        setPages(pagesJSONwithURLs)
}
  
  return (<>
      {!selectedBook &&
    <div className="image-gallery">
      
      {bookList.map((each,index)=> (
        <div className="gallery-div"  onClick={()=>{updateBookSelection(each)}} key={index}>
         
          {each.imageUrl && <img key={each.name} src={each.imageUrl} alt={each.name} className="gallery-image"/>}
          {!each.imageUrl && <p>{each.name}   </p>}
        </div>
        ))}
  
    </div>
    }
    {selectedBook &&   false &&   <BookReader selectedBook={selectedBook} user={user} getImageUrl={getImageUrl} />}
    {selectedBook &&   pages.length>0  &&   <BookReadRecord book={book} pages={pages} />}
    
      </>
  );
};

export default BookShelf;