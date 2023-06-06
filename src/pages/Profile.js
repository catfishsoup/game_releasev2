import { useState, useEffect } from 'react'
import { UserAuth } from '../firebase/user_auth'; //Get current user from here 
import '../styles/Profile.scss'
import styled from 'styled-components'
import userService from '../firebase/user_request'
import cover from '../img/cover_test.jpg'
// User Profile Page Settings
/**
 * What should be includes: 
 * Tabs: Overview, List, Favorites, Settings
 * Fetch data from Firebase
 */

const ProfileHeader = styled.section`
    background-image: url(${cover});
    position: relative;
    padding: 7rem;
    width: 100vw;
`
const Header = () =>  {
    /**
     * Header will includes - User Profile Picture, User Name, Cover Picture. 
     **/    
    const {user} = UserAuth()
    return(
        <ProfileHeader>
            <div className='user-asset'>
               <img className='profile-picture' src={user?.photoURL}/>   
                <div className='user-name'>{user?.displayName}</div> 
            </div>
        </ProfileHeader>
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
            name: 'Lists',
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
        <div className='user-nav'>
        <List/>
        <Favorites/>
        <Settings/>  
        </div>
        
        </main>
    )
}


export default Profile