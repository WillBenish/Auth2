import React, { useRef } from 'react';

const PhotoLibraryComponent = () => {
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Handle the selected file (you can send it to the server or manipulate it as needed)
      console.log('Selected file:', file);
    }
  };

  const openPhotoLibrary = () => {
    // Trigger a click on the hidden input element to open the file selection dialog
    inputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        ref={inputRef}
        style={{ display: 'none' }}
      />
      <button onClick={openPhotoLibrary}>Open Photo Library</button>
    </div>
  );
};

export default PhotoLibraryComponent;
