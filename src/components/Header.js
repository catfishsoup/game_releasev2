import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import Logo from './Logo'

const Header = () => {
    return (
        <>
        <header>
            <nav>
                <Logo/>
                <ul className='links-cont'>
                    <li><NavLink to='/home' className='link'>Home</NavLink></li>
                    <li><NavLink to='/games' className='link'>Games</NavLink></li>
                    <li><NavLink to='/about' className='link'>About</NavLink></li>
                </ul>
                <div className='user-sl'><input placeholder='Search...'/> <NavLink to='/login' className='link'>Login</NavLink></div> 
            </nav>
        </header>
        <Outlet/>
        </>
    )
}

export default Header 