import React, { useState,useEffect,useRef } from 'react';
import RecordRTC from 'recordrtc';

import { generateClient } from "aws-amplify/api";
import { listBooks } from "./graphql/queries";
import { updateBook,createMediaRaw } from './graphql/mutations';
import { uploadData } from 'aws-amplify/storage';

import ImageUpload from './imageUpload.js'
import VideoRecorder from './VideoRecorder.js'
import SwipeImageSlider from './book-swipe.js'

import ReactPlayer from 'react-player';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConsoleLogger } from 'aws-amplify/utils';

const NewReading = ({book,pages,selectedPageIndex}) => {
    
    
    const [images,setImages] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const videoRef = useRef(null);
    const recorderRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
  
  
  const loadRecorder =() =>{
    navigator.mediaDevices.getUserMedia({ video: true , audio: true})      .then((stream) => {
        videoRef.current.srcObject = stream;
        recorderRef.current = RecordRTC(stream, { type: 'video' });
      })
  }

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ video: true , audio: true})
      .then((stream) => {
        videoRef.current.srcObject = stream;
        recorderRef.current = RecordRTC(stream, { type: 'video' });
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
    const newFileName = newMediaRaw.data.createMediaRaw.id+'.webm'
        
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
        

        uploadNewReadMedia(newFileName,pageIndex)
        
        
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
    
    
  const handleNext = () => {
    stopRecording(currentIndex)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    startRecording()
  };

  const handlePrev = () => {
    
    stopRecording(currentIndex)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    startRecording()
  };

  const handleRestartRecording=()=>{
    console.log('handleRestart')
    stopRecording()
    startRecording()
  }

  const handleFinishRecording=()=>{
    console.log('finish')
    stopRecording(currentIndex)
  }

  const handleStart = () => {
    console.log('handlestart')
    stopRecording(currentIndex)
    startRecording()
  };
    
    useEffect(()=>{
      if(selectedPageIndex){
        setCurrentIndex(selectedPageIndex)
      }
      console.log(selectedPageIndex)
        loadRecorder()
        const newImageArray = pages.map(each=> each.imageUrl)
        setImages(newImageArray)
    },[])
    
    
    
    
    return (<><p>Test</p>
      <div className="newReader-container">
      <video ref={videoRef} autoPlay playsInline muted />
      {!isRecording && (<button onClick={handleRestartRecording}>Starts Recording</button>)}
          {isRecording &&(<button onClick={handleRestartRecording}>re-start for this page</button>)}
          {isRecording && (selectedPageIndex != null || currentIndex+1 >= images.length) && (<button onClick={handleFinishRecording}>Finish</button>)}
      <div className="page-view">
        <div className="page-navigator-container">
          

          {selectedPageIndex == null && <button onClick={handlePrev} className="page-navigator">{currentIndex>=images.length && "Previous"}</button>}
          {selectedPageIndex == null && currentIndex+1<images.length && (<button onClick={handleNext} className="page-navigator">Next</button>)}
          {currentIndex+1 >= images.length && (<button onClick={handleFinishRecording} className="page-navigator">Finish</button>)}
        </div>
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
      </div>
      </div>
        </>)
}

export default NewReading
