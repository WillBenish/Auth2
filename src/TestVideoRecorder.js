import React, {useState,useEffect} from 'react';
import { useRecordWebcam } from 'react-record-webcam'


const TestVideoRecorder = () =>{

    const {
        activeRecordings,
        createRecording,
        openCamera,
        startRecording,
        stopRecording,
      } = useRecordWebcam()
    
      const example = async () => {
        try {
          const recording = await createRecording();
          if (!recording) return;
          await openCamera(recording.id);
          await startRecording(recording.id);
          await new Promise((resolve) => setTimeout(resolve, 3000));
          await stopRecording(recording.id);
        } catch (error) {
          console.error({ error });
        }
      };
    
      return (
        <div>
          <button onClick={example}>Start</button>
          {activeRecordings.map(recording => (
            <div key={recording.id}>
              <video ref={recording.webcamRef} autoPlay muted />
              <video ref={recording.previewRef} autoPlay muted loop />
            </div>
          ))}
        </div>
      )
    
    
}

export default TestVideoRecorder;