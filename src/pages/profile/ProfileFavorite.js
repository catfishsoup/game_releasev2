
import userService from '../../firebase/user_request'
import { useEffect, useState } from 'react'
import Picture from "../../components/Picture.js";
const ProfileFavorite = () => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        userService.fetchFavorite().then((result) => setFavorites(result))
    }, [])
       return (
        <section className='fav-sect'>
            <h1>Favorite Games</h1>
           <section className='favorite-main-sect'>
            
           {favorites.map((game) => {
                        return(
                            <Picture data={game} text={'t_cover_small'} key={game.id}/>
                        )
                    })}
        </section> 
        </section>
       
        
    ) 
}

export default ProfileFavorite;