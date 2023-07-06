

import { NavLink } from "react-router-dom";
import '../App.scss'
const Logo = ({link}) => {
    return(
        <div>
            <NavLink to={link} className='logo-name'>VIDEA</NavLink>
        </div>
    )
}

export default Logo