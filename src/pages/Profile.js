import { useState, useEffect, useCallback } from 'react'
import { UserAuth } from '../firebase/user_auth'; //Get current user from here 
import '../styles/Profile.scss'
import styled from 'styled-components'
import cover from '../img/cover_test.jpg'
import { doc, setDoc, getDoc, getDocs, updateDoc, collection, query, where, collectionGroup, getCountFromServer } from "firebase/firestore"; 
import {auth, db} from '../firebase/firebase.js'
import Picture from '../components/Picture'

// User Profile Page Settings
/**
 * What should be includes: 
 * Tabs: Overview, List, Favorites, Settings
 * Fetch data from Firebase
 */

const ProfileHeader = styled.section`
    background-image: url(${cover});
    position: relative;
    padding: 7rem;
    width: 100vw;
`
const Header = () =>  {
    /**
     * Header will includes - User Profile Picture, User Name, Cover Picture. 
     * Should still display the user profile picture / name / cover if they are logged out. 
     **/    
    const { user } = UserAuth()
    return(
        <ProfileHeader>
            <div className='user-asset'>
               <img className='profile-picture' src={user?.photoURL}/>   
                <h1 className='user-name'>{user?.displayName}</h1> 
            </div>
        </ProfileHeader>
    )
}

const StatusStyle = styled.div`
    background: ${props => props.$color};
    padding: 5px; 
    border-radius: 5px; 
    color: white;
    text-align: center;
`
const Overview = ({click, favoriteGame}) => {
    /**
     * List will includes 'Default' List and User generated Lists. 
     **/ 
    const [statusList, setStatusList] = useState([
        {
            name: 'In Progress',
            count: 0,
            id: 1,
            color: '#32CD32'
        }, 
        {
            name: 'Completed',
            count: 0,
            id: 2,
            color: '#318CE7'
        },
        {
            name: 'On Hold',
            count: 0,
            id: 3,
            color: '#F4C431'
        },
        {
            name: 'Dropped',
            count: 0,
            id: 4,
            color: '#E44D2E'
        },
    ])
    const [done, setDone] = useState(false)
    const fetchCount = useCallback(async() => { 
        for(let x = 0; x < statusList.length; x++) {
                const q = query(collection(db, 'users', `${auth.currentUser?.uid}`, 'games'), where('status', '==', statusList[x].name))
                await getCountFromServer(q).then((snapshot) => {
                    statusList[x].count = snapshot.data().count
                })
            }
        setDone(true)
    }, [statusList])
    

    


    useEffect(() => {
        fetchCount()
    }, [])

    if(click === 1) {
      return (
        <section className='overview-sect'>
            <section className='list-overview'>
                <h2>Your List</h2><button>+</button>
                <section></section>
                {/* Render all of user lists here */}
            </section>
            
            <section className='backlog-overview'>
                <h2>Backlog Status</h2>
                {/* Count games by their completion status. */}
                <section className={done === true ? 'active' : 'not-active'}>
                    <ul className='game-status-list'>
                        {statusList.map((status) => {
                            return(<li key={status.id}>
                            <StatusStyle $color={status.color}>{status.name}</StatusStyle>
                            <span style={{color: status.color}}>{status.count}</span> entries
                            </li>)
                        })}
                    </ul>
                </section>
            </section>

            <section className='favorite-overview'>
                <h2>Favorited Games</h2><button>+</button>
                <section className='picture-cont'>
                    {favoriteGame.map((game) => {
                        return(
                            <Picture data={game} text={'t_cover_small'}/>
                        )
                    })}
                </section>
            </section>

            
        </section>
    )  
    }
    
}


const List = ({click}) => {
    /**
     * List will includes 'Default' List and User generated Lists. 
     **/ 

    if(click === 2 ) {
      return (
        <section>
            <div>Lists</div>
        </section>
    )  
    }
    
}

const Favorites = ({click}) => {
    /**
     * Display all the games that user marked as 'Favorite' 
     */
    if(click === 3) {
       return (
        <section>
            <div>Favorites</div>
        </section>
    ) 
    }
    
}


const Profile = () => {
    const [profileTab, setProfileTab] = useState([ 
        {
            name: 'Overview',
            id: 1, 
        },
        {
            name: 'Lists',
            id: 2, 
        },
        {
            name: 'Favorites',
            id: 3, 
        },])
    const [active, setActive] = useState(1)
    const [favoriteGame, setFavoriteGame] = useState([])
        const openNav = (id) => {
           setActive(id)
        }


    useEffect(() => {
        const fetchFavorite =  async () => {
            const q = query(collection(db, 'users', `${auth.currentUser?.uid}`, 'games'), where('favorite', '==', true))
            const queryGames = await getDocs(q)
                queryGames.forEach((doc) => {
                    const gameObject = {
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url
                    }
                    setFavoriteGame(game => [...game, gameObject])
                })
        }
        return fetchFavorite
    }, [])
    return(
        <main>
        <Header/>
        {/* Onclick change the tab down here */}
        <div className='user-nav'>
            {profileTab.map((tab) => {
               return(<div key={tab.id} onClick={() => openNav(tab.id)}>{tab.name}</div>) 
            })}
        </div>

        {/* Tidy this up later */}
        <Overview click={active} favoriteGame={favoriteGame}/>
        <List click={active}/>
        <Favorites click={active}/>
        </main>
    )
}


export default Profile