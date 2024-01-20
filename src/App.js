
import react,{ useState ,useEffect}  from 'react'

import './App.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator} from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

import { generateClient } from "aws-amplify/api";
import { listUsers } from "./graphql/queries";
import { createUser } from './graphql/mutations';

import { fetchUserAttributes } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';

  Amplify.configure(awsconfig);
  const client = generateClient()





  function App({ signOut }) {

    const [userList,setUserList]=useState([])

    const getImageUrl = async(filename)=>{
      const getUrlResult = await getUrl({
             key: filename,
             options: {
                 accessLevel:'public'
             },
         })
         
 
         return getUrlResult.url.href
         
    }

    async function validateUser()  {
      console.log('validate user')
  
      try{
            // List all items
        const userRows = await client.graphql({
            query: listUsers,
            variables:{}
        });

        setUserList(userRows.data.listUsers.items)

        const currentUser = await getCurrentUser()
        console.log(currentUser)

        const userAttributes = await fetchUserAttributes()
        console.log(userAttributes)
  
    } catch (err) {
        console.log('Error getting user')
        console.log(err)
    }
  }

  
    

useEffect(()=>{
  validateUser()
  console.log('useEffect')


},[])
    

 
   

    return (

    <div className="App">

      
      <header className="App-header">
        <h1>Thankyou for doing verification</h1>
        <h2>My Content</h2>
         <button onClick={signOut}>Sign out</button>
         {userList.map((each)=><p>{each}</p>)}
      </header>
    </div>
    );
  }
  export default withAuthenticator(App);