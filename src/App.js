
import react,{ useState ,useEffect}  from 'react'

import './App.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator} from '@aws-amplify/ui-react'

import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';

import { generateClient } from "aws-amplify/api";
import { listUsers } from "./graphql/queries";
import { createUser } from './graphql/mutations';
import { deleteUser } from './graphql/mutations';

import { fetchUserAttributes } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';

import Menu from './menu.js'
import Bookshelf from './bookshelf.js'
import Social from './social.js'
import AccountPage from './account.js'
import PageTurn from './PageTurn.js'
import MyBooks from './myBooks.js'
import TestVideoRecorder from './TestVideoRecorder.js';


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
            "email": userAttributes.email}
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
    const [menuSelection,setMenuSelection] = useState(null)
    const [selectedBook,setSelectedBook] = useState(null)

    const getImageUrl = async(filename)=>{

      try {
      const getUrlResult = await getUrl({
             key: filename,
             options: {
                 accessLevel:'public',
                 validateObjectExistence:true
             },
         })
         
 
         return getUrlResult.url.href
        }
        catch(err){
          console.log('trying alternative url')
          console.log(filename)
          const newFilename = filename.split('/')[1].split('.')[0]+'.webm'
          //let outputString = inputString.replace(/video_mp4/g, 'video_webm');

          const getUrlResult = await getUrl({
            key: newFilename,
            options: {
                accessLevel:'public'
            },
        })
        

        return getUrlResult.url.href
        }
         
    }


  
    const setNewMenuOption=(input)=>{
    
      setSelectedBook(null)
      setMenuSelection(input)
    }

    async function validateUser()  {
      console.log('validate user')
      var userAttributes = await fetchUserAttributes()
      userAttributes.identitiesParsed=JSON.parse(userAttributes.identities)
      userAttributes.cognitoId = userAttributes.sub

      var currentUser =  await getUserByEmail(userAttributes.email)
  
      if(!currentUser.exists){
        console.log('user does not exist, creating user')
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
      setMenuSelection('bookshelf')



  

  }

  
    

useEffect(()=>{
  validateUser()


},[])
    

 
   

    return (

    <div className="App">

      
      <header className="App-header">
      {menuSelection === 'social' && <Social  user={userProfile}/>}
      {menuSelection === 'bookshelf' && 
          <Bookshelf 
            setSelectedBook={setSelectedBook} 
            selectedBook={selectedBook} 
            user={userProfile}
            getImageUrl={getImageUrl}
            />}
        {menuSelection === 'myBooks' && <MyBooks  
            setSelectedBook={setSelectedBook} 
            selectedBook={selectedBook} 
            user={userProfile}
            getImageUrl={getImageUrl}
            />
        }
        {menuSelection === 'account' && <AccountPage  user={userProfile} signOut={signOut}/>}
       
       {user !=null && (<Menu onSelect={setNewMenuOption}  setSelectedBook={setSelectedBook} signOut={signOut}/>)}
       {menuSelection === 'videotest' && <TestVideoRecorder />}
      </header>
    </div>
    );
  }
  export default withAuthenticator(App);