import { useState, useEffect } from "react"
import { getDocs, collection } from "firebase/firestore"; 
import { UserAuth } from "../../firebase/user_auth"
import { db } from '../../firebase/firebase.js'

const ProfileGames = () => {
    const [games, setGames] = useState([])
    const {user} = UserAuth()
    useEffect(() => {
        const fetchGame = () => {
            getDocs(collection(db, 'users', `${user.uid}`, 'games')).then((docs) => {
                docs.forEach((data) => {
                    setGames(game => [...game, data.data()])
                })
            }).catch(e => {
                console.log(e)
            })
        }
        return fetchGame
    }, [])

    return (
        <>
        <h1 className='sub-page-title'>Game List</h1>
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

        </>
        
        
    ) 
}

export default ProfileGames