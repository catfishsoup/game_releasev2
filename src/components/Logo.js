

import { NavLink } from "react-router-dom";
import '../App.scss'
const Logo = () => {
    return(
        <div>
            <NavLink to='/home' className='logo-name'>VIDEA</NavLink>
        </div>
    )
}

export default Logo