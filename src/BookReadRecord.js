import React, { useRef, useState ,useEffect, useCallback} from 'react';
import { generateClient } from "aws-amplify/api";
import { updateBook,createMediaRaw } from './graphql/mutations';
import { uploadData } from 'aws-amplify/storage';

import ReactPlayer from 'react-player';
import RecordRTC from 'recordrtc';

import useSwipe from "./useSwipe"


const client = generateClient()
    


const BookReader = ({book,pages,editMode,selectedPageIndex,setNewRecordingActive}) => {
    
 
  const [pageIndex,setPageIndex]= useState(0)
  const [videoUrl,setVideoUrl] = useState(null)
  const [imageUrl,setImageUrl] = useState(null)
  const [isVertical,setIsVertical] = useState(false)
  const [imageDimensions,setImageDimensions] = useState({width:0,height:0})
  const [viewportDimensions,setViewportDimensions] = useState({
            width: window.innerWidth,
            height: window.innerHeight,
          });
    const videoRef = useRef(null);
    const recorderRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);

  const imageRef = useRef(null);
    

    /* Load Image and Video for this page*/
    useEffect(()=>{
        let newVideoUrl = null
        let newImageUrl = null
        
        if(typeof pages[pageIndex] !== 'undefined'){
            newVideoUrl= pages[pageIndex].videoUrl
            newImageUrl = pages[pageIndex].imageUrl
        }
        console.log(pages[pageIndex])
        setVideoUrl(newVideoUrl)
        setImageUrl(newImageUrl)
        
    },[pageIndex,pages])
    
    /*
    Initialize:
    -viewport dimensions
    -listen for changes to viewport
    -listener for "keydown"
    -load the recorder (IF editMode is enabled)
    */
    useEffect(() => {
        console.log(`pages: ${JSON.stringify(pages)}`)
        setViewportDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        });

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        document.addEventListener('keydown', handleKeyPress);

        if(editMode){
            console.log('editMode enabled.  Recording is enabled')
            loadRecorder()
        }
        if(selectedPageIndex){
            setPageIndex(selectedPageIndex)
        }
        // Remove event listener when the component unmounts
        return () => {
            //document.removeEventListener('keydown', handleKeyPress);
            //window.removeEventListener('resize', handleResize);
        };
    }, [pages]);

    
    const handleNextPage = ()=> {
       console.log('next page')
       console.log(pageIndex)
       console.log(pages)
       if(editMode){
            stopRecording(pageIndex)
        }
        console.log('selectedPageIndex:')
        console.log(selectedPageIndex)
       if(selectedPageIndex == null){
        setPageIndex((priorPage) => (priorPage+1)%pages.length)
        if(editMode){startRecording()}
       }

    }
    
    const handlePrevPage = () => {
        if(editMode){
            stopRecording(pageIndex)
           }
        
        if(selectedPageIndex == null){
            setPageIndex((priorPage) => (priorPage-1+pages.length)%pages.length)
            if(editMode){startRecording()}
        }
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

    /*Functions for Recording*/
    const loadRecorder =() =>{
        navigator.mediaDevices.getUserMedia({ video: true , audio: true}).then((stream) => {
            videoRef.current.srcObject = stream;
            recorderRef.current = RecordRTC(stream, { type: 'video', mimeType: 'video/mp4' });
          })
      }
    
    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ video: true , audio: true})
          .then((stream) => {
            videoRef.current.srcObject = stream;
            recorderRef.current = RecordRTC(stream, { type: 'video', mimeType: 'video/mp4' });
            recorderRef.current.startRecording();
            setIsRecording(true);
          })
          .catch((error) => {
            console.error('Error accessing camera:', error);
          });
      };
    
    const stopRecording = async (pageIndex) => {
        if (recorderRef.current) {
          recorderRef.current.stopRecording(() => {
            const blob = recorderRef.current.getBlob();
            const videoUrl = URL.createObjectURL(blob);
            console.log('Video URL:', videoUrl);
            if(pageIndex != null){
            uploadVideoBlob(blob,pageIndex);
            }
            
            setIsRecording(false);
            
    
            
          });
        }
      };
    
    
            
    const uploadVideoBlob = async (blob,pageIndex) => {
      
        const client = generateClient()
        const newMediaRaw = await client.graphql({
            query: createMediaRaw,
            variables: {
                input: {
                "originalFileName":"uploadedFromApp"
            }
            }
        });
        const coreKey = newMediaRaw.data.createMediaRaw.id
        const newFileName = 'video_webm/'+coreKey+'.webm'
            
            try {
              const result = await uploadData({
                key: newFileName,
                data: blob,
                options: {
                  accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
                 // onProgress // Optional progress callback.
                }
              }).result;
              console.log('Succeeded: ', result);
            } catch (error) {
              console.log('Error : ', error);
            }
            
    
            uploadNewReadMedia(coreKey,pageIndex)
            
            
        }
    
    const uploadNewReadMedia = async(fileName,pageIndex) =>{
            
            const client = generateClient()
            console.log('book')
            console.log(book)
            var updatedPage = pages[pageIndex]
            updatedPage.video_s3_key = fileName
            
            pages.splice(pageIndex,1,updatedPage)
            
            
            var allPagesString = pages.map(each=>JSON.stringify(each))
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
    
    const handleRestartRecording=()=>{
            console.log('handleRestart')
            stopRecording()
            startRecording()
          }
        
    const handleFinishRecording=()=>{
            console.log('finish')
            stopRecording(pageIndex)
            if(setNewRecordingActive){
            setNewRecordingActive(false)
            }
          }
        
                
    return (
        <>
        <div style={{height:"100vh", width:"100vw" ,objectFit:'fill'}} 
      onTouchStart={swipeHandlers.onTouchStart}
      onTouchMove={swipeHandlers.onTouchMove}
      onTouchEnd={swipeHandlers.onTouchEnd}>
        <div>
        {editMode && <div className="recordControls">
            {!isRecording && (<button onClick={handleRestartRecording}>Starts Recording</button>)}
              {isRecording &&(<button onClick={handleRestartRecording}>re-start for this page</button>)}
              {isRecording && (selectedPageIndex != null || pageIndex+1 >= pages.length) && (<button onClick={handleFinishRecording}>Finish</button>)}
              
            </div>
            }
            </div>
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
            <div className="page-video-container" 
                    height='100vh'
                    width='100vw'
                    style={{ objectFit: 'fill' }}>
                 <ReactPlayer
                    url={videoUrl} 
                    controls={false}
                    playsinline
                    playing
                    />
                    

                {editMode &&  <video ref={videoRef} autoPlay playsInline muted />
                }
            </div>
            <img ref={imageRef} src={imageUrl} className="book-reader-image" onLoad={handleImageLoad} style={{height:isVertical ? '50vh':'100vh', width: isVertical ? '100vw' : '50vw'}}/>
            
             
              
        </div>
        </div>
        
        
        
        </>
    )
}

export default BookReader