import { useState, useEffect, useCallback } from 'react'
import { UserAuth } from '../firebase/user_auth'; //Get current user from here 
import '../styles/Profile.scss'
import styled from 'styled-components'
import cover from '../img/cover_test.jpg'
import { getDocs, collection, query, where, getCountFromServer } from "firebase/firestore"; 
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
               <img className='profile-picture' src={user?.photoURL} alt="user-profile"/>   
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
    }, [fetchCount])

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
                            <Picture data={game} text={'t_cover_small'} key={game.id}/>
                        )
                    })}
                </section>
            </section>

            
        </section>
    )  
    }
    
}
const Game = ({click}) => {

    const [games, setGames] = useState([])
    useEffect(() => {
        const fetchGame = async() => {
            await getDocs(collection(db, 'users', `${auth.currentUser?.uid}`, 'games')).then((docs) => {
                docs.forEach((data) => {
                    setGames(game => [...game, data.data()])
                })
            }).catch(e => {
                console.log(e)
            })
        }

        return fetchGame
    }, [])
    if(click === 2) {
       return (
        <section className='game-sect'>
            <aside className='filter-list'>
                <section>
                    <h2 className='filter-title'>Search Bar</h2>
                    <input className='search-bar' placeholder='Search...'/>
                </section>
                
                <section>
                    <h2 className='filter-title'>Status</h2>
                    <ul>
                        <li>All</li>
                        <li>In Progress</li>
                        <li>On Hold</li>
                        <li>Completed</li>
                        <li>Dropped</li>
                    </ul>
                </section>
            </aside>
            <section className='game-display-sect'>
                <table className='game-display-table'>
                    <tbody>
                       <tr className='table-header-row'>
                            <th></th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>Finish Date</th>
                            <th>Action</th>
                        </tr> 

                        {games.map((game) => {
                            return(
                                <tr key={game.id} className='indv-game-row'>
                                    <td className='img-col'><img src={game.url.replace('t_thumb', 't_micro')} alt="game-logo"/></td>
                                    <td className='name-col'>{game.name}</td>
                                    <td className='status-col'>{game.status}</td>
                                    <td className='start-col'>{game.start_date === 'undefined' ? '-': game.start_date}</td>
                                    <td className='end-col'>{game.finish_date === 'undefined' ? '-' : game.finish_date}</td>
                                    <td className='action-col'><button><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="7" cy="7" r="6.5"/><circle cx="7" cy="7" r=".5"/><circle cx="4" cy="7" r=".5"/>
                                        <circle cx="10" cy="7" r=".5"/></g></svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </section>
        
    ) 
    }
    
}

const List = ({click}) => {
    /**
     * List will includes 'Default' List and User generated Lists. 
     **/ 

    if(click === 3 ) {
      return (
        <section>
            <div>Lists</div>
        </section>
    )  
    }
    
}

const Favorites = ({click, favoriteGame}) => {
    /**
     * Display all the games that user marked as 'Favorite' 
     */
    if(click === 4) {
       return (
        <section className='fav-sect'>
            <h1>Favorite Games</h1>
           <section className='favorite-main-sect'>
            
           {favoriteGame.map((game) => {
                        return(
                            <Picture data={game} text={'t_cover_small'} key={game.id}/>
                        )
                    })}
        </section> 
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
            name: 'Games',
            id: 2, 
        },
        {
            name: 'Lists',
            id: 3, 
        },
        {
            name: 'Favorites',
            id: 4, 
        }])
    const [active, setActive] = useState(1)
    const [favoriteGame, setFavoriteGame] = useState([])
        const openNav = (id) => {
           setActive(id)
        }


    useEffect(() => {
        const fetchFavorite = async() => {
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
        <Game click={active}/>
        <List click={active}/>
        <Favorites click={active} favoriteGame={favoriteGame}/>
        </main>
    )
}


export default Profile