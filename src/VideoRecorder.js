import React, { useState, useRef,useEffect } from 'react';
import RecordRTC from 'recordrtc';

import { generateClient } from "aws-amplify/api";
import { createMediaRaw } from './graphql/mutations';
import { uploadData } from 'aws-amplify/storage';

const VideoRecorder = ({setUploadedMedia}) => {
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

  const stopRecording = async () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        const videoUrl = URL.createObjectURL(blob);
        console.log('Video URL:', videoUrl);
        uploadVideoBlob(blob);
        
        setIsRecording(false);
        

        
      });
    }
  };

  const handleStartStopClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  

    
const uploadVideoBlob = async (blob) => {
  
   const client = generateClient()
  console.log('adding rawMedia')
  
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
        
        if(setUploadedMedia){
        setUploadedMedia(newFileName)
        }
        
    }

useEffect(()=>{
  loadRecorder()
},[])

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
      <button onClick={handleStartStopClick}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {isRecording && <p>Recording...</p>}
    </div>
  );
};

export default VideoRecorder;
