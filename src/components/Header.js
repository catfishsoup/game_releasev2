import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import Logo from './Logo'
import SearchBar from './SearchBar'
const Header = () => {
    return (
        <>
        <header>
            <nav>
                <ul className='links-cont'>
                    <li><Logo/></li>
                    <li className='link'><NavLink to='/' className='link'>Home</NavLink></li>
                    <li><NavLink to='/games' className='link'>Games</NavLink></li>
                    <li className='link'><NavLink to='/contact' className='link'>Contact</NavLink></li>
                </ul>
                <div className='user-sl'>
                    <SearchBar/> 
                    <NavLink to='/login' className='login-btn'>Login</NavLink>
                </div> 
            </nav>
        </header>
        <Outlet/>
        </>
    )
}

export default Header 