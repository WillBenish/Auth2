
import react,{ useState ,useEffect}  from 'react'

import ReactPlayer from 'react-player';

const AccountPage = ({user})=>{
    const videoUrl = './outputVideo.mp4'
    return (
        <>
            <p> this is the account page</p>
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
                    </div>
            <p> Welcome {user.username}</p>
        </>
    )
}

export default AccountPage;