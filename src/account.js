
import react,{ useState ,useEffect}  from 'react'

const AccountPage = ({user})=>{
    
    return (
        <>
            <p> this is the account page</p>
            <p> Welcome {user.username}</p>
        </>
    )
}

export default AccountPage;