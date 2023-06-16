import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import Logo from './Logo'
import SearchBar from './SearchBar'
const Header = () => {
    return (
        <>
        <header>
            <nav>
                <Logo/>
                <ul className='links-cont'>
                    <li><NavLink to='/games' className='link'>Games</NavLink></li>
                </ul>
                <div className='user-sl'><SearchBar/> <NavLink to='/login' className='link'>Login</NavLink></div> 
            </nav>
        </header>
        <Outlet/>
        </>
    )
}

export default Header 