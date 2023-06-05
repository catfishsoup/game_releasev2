import Logo from './Logo'
import { UserAuth } from "../firebase/user_auth"
import { NavLink, Outlet } from "react-router-dom";
import { useState } from 'react';
const UserOption = ({open, handleLogOut}) => {
    if(open === true) {
        return(
            <ul className='user-option-lists'>
                <li>Profile</li>
                <li>Bookmark</li>
                <li>Settings</li>
                <li><button onClick={handleLogOut}>Log Out</button></li>
            </ul>
        )
    }
}
const AuthHeader = () => {
    const {user, logout} = UserAuth()
    const [openUP, setopenUP] = useState(false)
    const handleLogOut = async() => {
        try {
            await logout()
        } catch (e) {
            console.log(e)
        }
    }

    const openUserTab = () => {
        setopenUP(!openUP)
        console.log(openUP)
    }


    return(
        <>
        <header>
            <nav>
                <Logo/>
                <ul className='links-cont'>
                    <li><NavLink to='/home' className='link'>Home</NavLink></li>
                    <li><NavLink to='/games' className='link'>Games</NavLink></li>
                    <li><NavLink to='/about' className='link'>About</NavLink></li>
                </ul>
                <div className='user-sl'><input placeholder='Search...'/> 
                <span onClick={openUserTab} className='user-pfp'>{user && user.email}</span>
                <UserOption open={openUP} handleLogOut={handleLogOut}/>
                </div> 
            </nav>
        </header>
        <Outlet/>
        </>
    )
}

export default AuthHeader