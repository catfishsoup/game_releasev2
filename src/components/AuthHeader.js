import Logo from './Logo'
import { UserAuth } from "../firebase/user_auth"
import { NavLink, Outlet } from "react-router-dom";

const AuthHeader = () => {
    const {user, logout} = UserAuth()
    
    const handleLogOut = async() => {
        try {
            await logout()
        } catch (e) {
            console.log(e)
        }
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
                <div className='user-sl'><input placeholder='Search...'/> {user && user.email}
                <button onClick={handleLogOut}>Log Out</button>
                </div> 
            </nav>
        </header>
        <Outlet/>
        </>
    )
}

export default AuthHeader