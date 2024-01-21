import React, { useState,useEffect } from 'react';
import useSwipe from "./useSwipe"

const PageTurn = () => {
    
const [number, setNumber] = useState(0);



  const handleKeyPress = (event) => {
    
    event.preventDefault()
    if (event.key === 'ArrowRight' || event.code === 'Space') {
      // Right arrow key or spacebar pressed
      setNumber((prevNumber) => prevNumber + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);



  const handleSwipeLeft = () => {
    console.log("Swiped Left!");
    // Add logic for handling left swipe
  };

  const handleSwipeRight = () => {
    console.log("Swiped Right!");
    // Add logic for handling right swipe
  };

  const swipeHandlers = useSwipe({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '2em',
      }}
      onTouchStart={swipeHandlers.onTouchStart}
      onTouchMove={swipeHandlers.onTouchMove}
      onTouchEnd={swipeHandlers.onTouchEnd}

    >
      {number}
    </div>
  );
}

export default PageTurn