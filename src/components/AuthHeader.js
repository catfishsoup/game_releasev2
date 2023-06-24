import Logo from './Logo'
import { UserAuth } from "../firebase/user_auth"
import { NavLink, Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { motion } from "framer-motion"
import user_pfp from '../img/user.png'
import '../App.scss'
import SearchBar from './SearchBar'
const UserOption = ({open, handleLogOut, displayName}) => {
    if(open === true) {
        return(

              <ul className='user-option-lists'>
                {/* Improvement Needed: Only authorized / logged in user can access these links. */}
                <li><Link to={`profile/${displayName}`}>Profile</Link></li>
                <li><Link to={`profile/${displayName}/settings`}>Settings</Link></li>
                <li onClick={() => handleLogOut()}>Log Out</li>
            </ul>  

            
        )
    }
}
const AuthHeader = () => {
    const {user, logout, profilePicture} = UserAuth()
    const [openUP, setopenUP] = useState(false)
    const nav = useNavigate()
    const handleLogOut = async() => {
        try {
            await logout()
            nav('/login', {replace: true})
        } catch (e) {
            console.log(e)
        }
    }

    const openUserTab = () => {
        setopenUP(!openUP)
    }

    
    return(
        <>
        <header>
            <nav>
                
                <ul className='links-cont'>
                    <li><Logo/></li>
                    <li className='link'><NavLink to='/home' className='link'>Home</NavLink></li>
                    <li><NavLink to='/games' className='link'>Games</NavLink></li>
                    <li className='link'><NavLink to='/contact' className='link'>Contact</NavLink></li>
                </ul>
                <div className='user-sl'>
                <SearchBar/>
                <div>
                   <img onClick={openUserTab} className='user-pfp' src={user.photoURL !== undefined ? user.photoURL : user_pfp}/> 
                </div>
                <UserOption open={openUP} handleLogOut={handleLogOut} displayName={`${user?.displayName}`}/>
                </div> 
            </nav>
        </header>
        <Outlet/>
        </>
    )
}

export default AuthHeader