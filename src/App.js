
import react,{ useState ,useEffect}  from 'react'

import './App.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator} from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

import { generateClient } from "aws-amplify/api";
import { listUsers } from "./graphql/queries";
import { createUser } from './graphql/mutations';
import { deleteUser } from './graphql/mutations';

import { fetchUserAttributes } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';

  Amplify.configure(awsconfig);
  const client = generateClient()


const getUserByEmail = async (email) => {
  var userRow = {"exists":false}
  try{
    // List all items
    const userRows = await client.graphql({
        query: listUsers,
        variables:{filter:{email:{eq:email}}}
    });
    if(userRows.data.listUsers.items.length>0){
      userRow = {...userRow,...userRows.data.listUsers.items[0]}
      userRow.exists=true
    }


  } catch (err) {
    console.log('Error getting user')
    console.log(err)
}
return userRow;

}



const createUserRow = async (userAttributes) => {
  console.log('creating new user')
  var newUser = {exists:false}
  try{
    console.log('email: '+userAttributes.email)
    console.log('oauth_provider: '+userAttributes.identitiesParsed[0].providerName)
    console.log('oauth_provider_id: '+userAttributes.identitiesParsed[0].userId)
    const newUserRow = await client.graphql({
        query: createUser,
        variables: {
            input: {
            "email": 'will.benish@gmail.com'}
            }
        })
        console.log(newUserRow)

    newUser = newUserRow.data.createUser
    newUser.exists=true

    


    } catch(err){
      console.log(err)
      console.log('failed to add new user Row')
    }

    return newUser

}

const deleteWillBenish = async () => {
  const newUserRow = await client.graphql({
    query: deleteUser,
    variables: {
        input: {
        "email": 'tester@test.com'}
        }
    })
}





  function App({ user, signOut }) {

    const [userProfile,setUserProfile] = useState({exists:false})

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
      var userAttributes = await fetchUserAttributes()
      userAttributes.identitiesParsed=JSON.parse(userAttributes.identities)
      userAttributes.cognitoId = userAttributes.sub

      var currentUser =  await getUserByEmail(userAttributes.email)
  
      if(!currentUser.exists){
        var newUser = await createUserRow(userAttributes)
        if(newUser.exists){
          currentUser = newUser
        }
      }
      if(currentUser.exists){
      setUserProfile(currentUser)
      }
      console.log('Current User:')
      console.log(currentUser)



  

  }

  
    

useEffect(()=>{
  validateUser()


},[])
    

 
   

    return (

    <div className="App">

      
      <header className="App-header">
        <h1>Thankyou for doing verification</h1>
        <h2>My Content</h2>
         <button onClick={signOut}>Sign out</button>
         <p>{userProfile.email}</p>
      </header>
    </div>
    );
  }
  export default withAuthenticator(App);