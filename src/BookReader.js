import React, { useRef, useState ,useEffect, useCallback} from 'react';
import { generateClient } from "aws-amplify/api";
import { listBooks } from "./graphql/queries";

import ReactPlayer from 'react-player';

import useSwipe from "./useSwipe"


const client = generateClient()
    


const BookReader = ({selectedBook,user,getImageUrl}) => {
    
    
    
    
    const [book,setBook]= useState(null)
    const [pages,setPages]=useState([])
  const [pageIndex,setPageIndex]= useState(0)
  const [videoUrl,setVideoUrl] = useState(null)
  const [imageUrl,setImageUrl] = useState(null)
  const [isVertical,setIsVertical] = useState(false)
  const [imageDimensions,setImageDimensions] = useState({width:0,height:0})
  const [viewportDimensions,setViewportDimensions] = useState({
            width: window.innerWidth,
            height: window.innerHeight,
          });

  const imageRef = useRef(null);
    
      const getBook = async ()=>{

        
            // List all items
        console.log('getBook')
        console.log(selectedBook)
        //try{
            /*
        const bookResult = await client.graphql({
               query: getBook(selectedBook)
          });
          */
        const allBooks = await client.graphql({
            query: listBooks,
            variables:{filter: {and:[{id: {eq: selectedBook}}]}}
        });
        
        
        console.log('allBooks')
        console.log(allBooks)
        
        const thisBook = allBooks.data.listBooks.items[0];
        setBook(thisBook)
        


        
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
            each.imageUrl=null
            each.videoUrl = null
            
            var newImageUrl = await getImageUrl(each.imageKey)
            if(newImageUrl){each.imageUrl = newImageUrl}
            
            var newVideoUrl = await getImageUrl(each.video_s3_key)
            
            if(newVideoUrl){each.videoUrl = newVideoUrl}
            
            
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
        console.log('Book Reader useEffect')
        
        getBook()


    },[])
    
    useEffect(()=>{
        let newVideoUrl = null
        let newImageUrl = null
        
        if(typeof pages[pageIndex] !== 'undefined'){
            newVideoUrl= pages[pageIndex].videoUrl
            newImageUrl = pages[pageIndex].imageUrl
        }
        
        setVideoUrl(newVideoUrl)
        setImageUrl(newImageUrl)
        
    },[pageIndex,pages])
    
    
  useEffect(() => {
      
    setViewportDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    document.addEventListener('keydown', handleKeyPress);

    // Remove event listener when the component unmounts
    return () => {
        document.removeEventListener('keydown', handleKeyPress);
        window.removeEventListener('resize', handleResize);
    };
  }, [pages]);

    
    const handleNextPage = ()=> {
       console.log('next page')
       console.log(pageIndex)
       console.log(pages)
        setPageIndex((priorPage) => (priorPage+1)%pages.length)
    }
    
    const handlePrevPage = () => {
        setPageIndex((priorPage) => (priorPage-1+pages.length)%pages.length)
    }
    
    const handleKeyPress = (event) => {
        console.log('in key press')
        console.log(pages)
        
        if(event.key === 'ArrowLeft'){
            handlePrevPage()
        }
        
        if(event.key === 'ArrowRight' || event.code==='Space'){
            handleNextPage()
        }
        console.log(event.key)
    // Check if the pressed key is an arrow key
      };
    
      
      const handleSwipeLeft = () => {
        console.log("Swiped Left!");
            handleNextPage()
        // Add logic for handling left swipe
      };
    
      const handleSwipeRight = () => {
        console.log("Swiped Right!");
        
            handlePrevPage()
        // Add logic for handling right swipe
      };
    
      const swipeHandlers = useSwipe({
        onSwipedLeft: handleSwipeLeft,
        onSwipedRight: handleSwipeRight,
      });
      
    const handleImageLoad = (event) => {
        const { naturalWidth, naturalHeight } = event.target;
        setImageDimensions({ width: naturalWidth, height: naturalHeight });
        
        determineSplit(naturalWidth,naturalHeight,viewportDimensions.width,viewportDimensions.height)
          };
    
    const determineSplit= (imageWidth,imageHeight,viewportWidth,viewportHeight)=>{
        const imageRatio = imageHeight/imageWidth;
        const viewportRatio = viewportHeight/viewportWidth;
        
        console.log('image ratio: '+imageRatio )
        console.log('viewportRatio: '+viewportRatio )
        
        let newOrientation = viewportRatio>imageRatio ? true : false
        console.log(newOrientation)
        setIsVertical(newOrientation)
            
        
        
    }
    
    const handleResize = () => {
        setViewportDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        
        let imageWidth = 0
        let imageHeight = 0
        if (imageRef.current) {
      // Accessing the natural dimensions of the image
               imageWidth = imageRef.current.naturalWidth;
               imageHeight = imageRef.current.naturalHeight;
        
            }
        determineSplit(imageWidth,imageHeight,window.innerWidth, window.innerHeight)
      };
                
    return (
        <>
        <div style={{height:"100vh", width:"100vw" ,objectFit:'fill'}} 
      onTouchStart={swipeHandlers.onTouchStart}
      onTouchMove={swipeHandlers.onTouchMove}
      onTouchEnd={swipeHandlers.onTouchEnd}>
        <div className="page-navigator-container">
            <button onClick={handlePrevPage} className="page-navigator ">Previous</button>
            <button onClick={handleNextPage} className="page-navigator">Next</button>
        </div>
        <div style={{display:'flex' ,flexDirection: isVertical ? 'column' : 'row',
                    alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
        height: '100vh', // Full viewport height
         overflow: 'hidden' 
        }}>
            <ReactPlayer
                    url={videoUrl} 
                    height='100vh'
                    width='100vw'
                    style={{ objectFit: 'fill' }}
                    controls={false}
                    playing
                  />
            <img ref={imageRef} src={imageUrl} className="book-reader-image" onLoad={handleImageLoad} style={{height:isVertical ? '50vh':'100vh', width: isVertical ? '100vw' : '50vw'}}/>
        </div>
        </div>
        
        
        
        </>
    )
}

export default BookReader