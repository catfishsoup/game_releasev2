import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Logo from './Logo'
import '../styles/HeaderStyle.scss'
import SearchBar from './SearchBar'

const Header = () => {

    const [mobileNav, setmobileNav] = useState(false)
    const { pathname } = useLocation()
    

    const hamburgerMenu = () => {
        setmobileNav(!mobileNav)
        if(!mobileNav) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'visible';
    }
    }
    useEffect(() => {
        setmobileNav(false)
    }, [pathname])
    return (
        <>
        <header>
            <Logo/>
            <nav className={`nav-cont ${mobileNav ? 'active' : 'not-active'}`}>
            <button className='hamburger-menu' onClick={() => hamburgerMenu()}>
                <svg  xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 6h14M5 12h14M5 18h14"/>
                </svg>
            </button>
                <ul className='links-cont'>
                    <li><NavLink to='/' className='link'>Home</NavLink></li>
                    <li><NavLink to='/games' className='link'>Games</NavLink></li>
                    <li><NavLink to='/contact' className='link'>Contact</NavLink></li>
                </ul> 
                
                <section className='user-sl'>
                    <SearchBar/> 
                    <Link className='link search-btn' to='/search'>Search</Link>
                    <NavLink to='/login' className='login-btn link'>Login</NavLink>
                </section> 
            </nav>
        </header>
        <Outlet/>
        </>
    )
}

export default Header 