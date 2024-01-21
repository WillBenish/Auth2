import React, { useState,useEffect } from 'react';
import CreateBook from './createBook.js'
import EditBook from './editBook.js'

import { generateClient } from "aws-amplify/api";
import { listBooks } from "./graphql/queries";
import { getUrl } from 'aws-amplify/storage';

const BookShelf = ({ books ,setSelectedBook,selectedBook,user,getImageUrl}) => {


       
    
const [editMode,setEditMode] = useState(false)
const [showCreateBook,setShowCreateBook]= useState(false)
const [bookList,setBookList] =useState([])

const createNewBook = () =>{
    setShowCreateBook(true)
    
}
  

const getMyBooks = async ()=>{
  const client = generateClient()
           // List all items
  const allBooks = await client.graphql({
           query: listBooks,
           variables:{filter: {and:[{creatorUserId: {eq: user.id}},{creatorUserId: {attributeExists:true}}]}}
       });
       
       const initialBookList = await Promise.all(allBooks.data.listBooks.items.map(async (each) => {
         if(each.cover_s3_key != null){
         each.imageUrl = await getImageUrl(each.cover_s3_key)
         }
         return each
       }))
       
       setBookList(initialBookList)
 }

 const getAllBooks = async ()=>{
  const client = generateClient()
           // List all items
  const allBooks = await client.graphql({
           query: listBooks
       });
       
console.log('all books')
console.log(allBooks)
 }

useEffect(() => {
  console.log('MyBooks useEffect')
  
  getAllBooks()

  getMyBooks()
   
},[showCreateBook])
 

const images = ['local1.png','local2.png','local3.png','local1.png','local2.png','local3.png']
  
  return (<>
  {!selectedBook &&
    <div className="image-gallery">
      <div className="gallery-div">
        <img key='CreateNew.png' src='CreateNew.png' alt='Create New Book' className="gallery-image" onClick={()=>{createNewBook()}}/>
      </div>
      
      {bookList.map(each=> (
        <div className="gallery-div"  onClick={()=>{setSelectedBook(each.name)}}>
         
          {each.imageUrl && <img key={each.name} src={each.imageUrl} alt={each.name} className="gallery-image"/>}
          {!each.imageUrl && <p>{each.name}   </p>}
        </div>
        ))}
  
    </div>
    }
    {selectedBook && <EditBook user={user} selectedBook={selectedBook} setSelectedBook={setSelectedBook} getImageUrl={getImageUrl}/>}
    {showCreateBook && 
      <CreateBook 
        showCreateBook={showCreateBook} 
        setShowCreateBook={setShowCreateBook}
        user={user}
         />}
    
      </>
  );
};

export default BookShelf;