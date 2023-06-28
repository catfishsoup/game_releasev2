import { UserAuth } from "../../firebase/user_auth"
import { Link, Outlet } from "react-router-dom";
import '../../styles/Profile.scss'
import ProfileHeader from './ProfileHeader';


const Profile = () => {
    const profileTab = [ 
        {
            name: 'overview',
            id: 1, 
        },
        {
            name: 'games',
            id: 2, 
        },
        {
            name: 'lists',
            id: 3, 
        },
        {
            name: 'favorites',
            id: 4, 
        }]
    const { user } = UserAuth();
    return(
        <main>
        <ProfileHeader/>
        <div className='user-nav'>
            {profileTab.map((tab) => {
               return(<Link key={tab.id} to={`/profile/${user.displayName}/${tab.name}`}>{tab.name}</Link>) 
            })}
        </div>

        <Outlet/>
        </main>
    )
}

export default Profile