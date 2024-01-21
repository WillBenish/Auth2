import React, { useRef, useState ,useEffect} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactPlayer from 'react-player';
import { generateClient } from "aws-amplify/api";

import { listBooks } from "./graphql/queries";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

//import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';


const client = generateClient()
    

const PageSwipe = async ({getImageUrl,user}) => {
  const [book,setBook] = useState(null)  
  const [pages,setPages] = useState([])
  
  
  
        
        
        
  console.log('book swipe')
  console.log(user)

  
useEffect(()=>{
 // getBook()
  
},[])
  return (
    <>
<p>test</p>
    </>
  );
}

/*
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {pages.map(each => (
        <><p>something</p>
        <SwiperSlide>
      
                <ReactPlayer
                    url={each.videoUrl} 
                    width="640"
                    height="360"
                    controls
                    playing
                  />
          <img key={each.imageUrl} src={each.imageUrl} alt={each.imageUrl} />
          
          </SwiperSlide>
          </>
          )
          )}
      </Swiper>
      
      */


export default PageSwipe;