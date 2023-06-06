import { useState, useEffect } from 'react'
import '../styles/Profile.scss'
import {db} from '../firebase/firebase.js'
import { UserAuth } from '../firebase/user_auth';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
// User Profile Page Settings
/**
 * What should be includes: 
 * Tabs: Overview, List, Favorites, Settings
 * Fetch data from Firebase
 */


const Header = () =>  {
    /**
     * Header will includes - User Profile Picture, User Name, Cover Picture. 
     **/
    const [userData, setuserData] = useState([])
    const user = UserAuth()
    const user_id = user?.user
    useEffect(() => {
        const userRef = doc(db, "users", user_id.uid)
            getDoc(userRef).then((doc) => {
                setuserData(doc.data())
            }).catch((e) => console.log(e))
    }, [])
        
    
    console.log(userData)
    return(
        <section className='profile-header'>
            {/* Unable to display user profile */}
            <img className='profile-picture' src={userData.profile_picture}/>   
            <h1 className='user-name'>{userData.user_name}</h1>
        </section>
    )
}


const Overview = () => {
    /**
     * Overview will includes user list and favorites with 'View More' button.
     * Completion Status
     **/ 
    return (
        <section>
            <div>Overview</div>
        </section>
    )
}

const List = () => {
    /**
     * List will includes 'Default' List and User generated Lists. 
     **/ 
    return (
        <section>
            <div>Lists</div>
        </section>
    )
}

const Favorites = () => {
    /**
     * Display all the games that user marked as 'Favorite' 
     */
    return (
        <section>
            <div>Favorites</div>
        </section>
    )
}

const Settings = () => {
    /**
     * Allow user to: change user name, profile picture, email, password, delete the account. 
     **/
    return (
        <section>Settings</section>
    )
}



const Profile = () => {
    const [profileTab, setProfileTab] = useState([ 
        {   
            name: 'Overview',
            clicked: false,
        }, 
        {
            name: 'Your List',
            clicked: false,
        },
        {
            name: 'Favorites',
            clicked: false,
        }, 
        {
            name: 'Settings',
            clicked: false,
        }
    ])
    return(
        <main>
        <Header/>
        {/* Onclick change the tab down here */}
        <Overview/>
        <List/>
        <Favorites/>
        <Settings/>
        </main>
    )
}


export default Profile