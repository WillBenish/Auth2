import react,{useState,useEffect} from 'react'
import { generateClient } from "aws-amplify/api";
import { listUsers, getUser, listSubscriptions } from "./graphql/queries";
import { createSubscriptions } from './graphql/mutations';

const client = generateClient()


const Social =  ({user}) =>{

    const [showInvite,setShowInvite] = useState(false)
    const [emailInput, setEmailInput] = useState('');



const [userList,setUserList] = useState(['test','test2'])
const [ subscriptions,setSubscriptions] = useState([{"email":"No Subscribers"}])

const getData = async () =>{
    try{
        const client = generateClient()
            // List all items
        const allSubscriptions = await client.graphql({
            query: listSubscriptions,
            variables:{filter: {creatorId: {eq: user.id}}}
        });
        console.log(allSubscriptions);
       setSubscriptions(allSubscriptions.data.listSubscriptions.items)
    } catch (err) {
        console.log('Error retrieving subscriptions')
        console.log(err)
    }
        }
        
        
useEffect(()=>{
    getData();
    }, []); 

    const toggleShowInvite= () =>{
    setShowInvite(!showInvite)
    }

    const handleEmailInputChange =  (event) => {
        setEmailInput(event.target.value);
        };

    const handleAddFollowers = async () => {
    // Split the input into an array of email addresses
    const emailArray = emailInput.split(',').map((email) => email.trim());

    await Promise.all(emailArray.map(each=>{
        console.log('adding subscription: '+each)
        addSubscription(user.id,each)
    }));

    getData()



    // Update the userList state with the new array of email addresses
    //setUserList((prevUserList) => [...prevUserList, ...emailArray]);

    // Clear the email input
    setEmailInput('');
    };

    const addSubscription = async (creatorId,subscriberEmail) =>{
     
        try{
            const newSubscriptions = await client.graphql({
                query: createSubscriptions,
                variables: {
                    input: {
                    "creatorId": creatorId ,
                    "subscriberEmail": subscriberEmail
                    }
                    }
                })

                console.log(newSubscriptions)
            } catch(err){
            console.log('failed to add subscription')
        }

        return 1

    }


    return (
            <>
            {!showInvite && (
                <button onClick={toggleShowInvite}>Add Followers</button>)
            }
            {showInvite && (        <div>
          <input
            type="text"
            placeholder="Enter email addresses separated by commas"
            value={emailInput}
            onChange={handleEmailInputChange}
          />
          <button onClick={handleAddFollowers}>Add</button>
        </div>)}

            {subscriptions.map(each => (<p>{each.subscriberEmail}</p>))}
            </>
            )
    
    
}

export default Social;