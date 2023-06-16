import Logo from './Logo'
import { UserAuth } from "../firebase/user_auth"
import { NavLink, Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import '../App.scss'
import SearchBar from './SearchBar'
const UserOption = ({open, handleLogOut, displayName}) => {
    if(open === true) {
        return(
            <ul className='user-option-lists'>
                {/* Improvement Needed: Only authorized / logged in user can access these links. */}
                <li><Link to={`/profile/${displayName}`}>Profile</Link></li>
                <li><Link>Settings</Link></li>
                <li><button onClick={() => handleLogOut()} className='log_out_btn'>Log Out</button></li>
            </ul>
        )
    }
}
const AuthHeader = () => {
    const {user, logout} = UserAuth()
    const [openUP, setopenUP] = useState(false)
    const [isLogged, setLogged] = useState(true)
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
                    <li className='link'>Home</li>
                    <li><NavLink to='/games' className='link'>Games</NavLink></li>
                    <li className='link'>Contact</li>
                </ul>
                <div className='user-sl'>
                <SearchBar/>
                <img onClick={openUserTab} className='user-pfp' src={user && user.photoURL}/>
                <UserOption open={openUP} handleLogOut={handleLogOut} displayName={`${user.displayName}`}/>
                </div> 
            </nav>
        </header>
        <Outlet/>
        </>
    )
}

export default AuthHeader