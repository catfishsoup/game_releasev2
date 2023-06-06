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

const Overview = ({click}) => {
    /**
     * List will includes 'Default' List and User generated Lists. 
     **/ 

    if(click === 1) {
      return (
        <section className=''>
            <section>
                Your List
                {/* Render all of user lists here */}
            </section>
            <section>
                Favorited Games
                {/* Render top 10 recent games here */}
            </section>
        </section>
    )  
    }
    
}


const List = ({click}) => {
    /**
     * List will includes 'Default' List and User generated Lists. 
     **/ 

    if(click === 2 ) {
      return (
        <section>
            <div>Lists</div>
        </section>
    )  
    }
    
}

const Favorites = ({click}) => {
    /**
     * Display all the games that user marked as 'Favorite' 
     */
    if(click === 3) {
       return (
        <section>
            <div>Favorites</div>
        </section>
    ) 
    }
    
}

const Settings = ({click}) => {
    /**
     * Allow user to: change user name, profile picture, email, password, delete the account. 
     **/
    if(click === 4) {
      return (
        <section>
            <form>
                <div>
                    Account Settings
                    <label>Username</label>
                    <input/>

                    <label>Email</label>
                    <input/>

                    <label>Change Password</label>
                    <input placeholder='New Password'/>
                    <input placeholder='Confirm New Password'/>
                </div>
                
                <div>
                    Profile
                    <label>Change Profile Picture</label>
                    <input type="file"/>

                    <label>Change Cover Picture</label>
                    <input type="file"/>
                </div>
            </form>
        </section>
    )  
    }
    
}



const Profile = () => {
    const [profileTab, setProfileTab] = useState([ 
        {
            name: 'Overview',
            id: 1, 
        },
        {
            name: 'Lists',
            id: 2, 
        },
        {
            name: 'Favorites',
            id: 3, 
        }, 
        {
            name: 'Settings',
            id: 4, 
        }])

    const [active, setActive] = useState(1)

        const openNav = (id) => {
           setActive(id)
        }
    return(
        <main>
        <Header/>
        {/* Onclick change the tab down here */}
        <div className='user-nav'>
            {profileTab.map((tab) => {
               return(<div key={tab.id} onClick={() => openNav(tab.id)}>{tab.name}</div>) 
            })}
        </div>

        {/* Tidy this up later */}
        <Overview click={active}/>
        <List click={active}/>
        <Favorites click={active}/>
        <Settings click={active}/>
        </main>
    )
}


export default Profile