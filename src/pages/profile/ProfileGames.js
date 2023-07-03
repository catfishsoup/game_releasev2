import { useState, useEffect } from "react"
import { getDocs, collection } from "firebase/firestore"; 
import { UserAuth } from "../../firebase/user_auth"
import { db } from '../../firebase/firebase.js'

const ProfileGames = () => {
    //Keep the original data here 
    const [games, setGames] = useState([])

    //Modify the data here 
    const [gamesCopy, setgamesCopy] = useState([])
    const [preSearch, setpreSearch] = useState([])
    const [filter, setFilter] = useState(false)
    const {user} = UserAuth()
    const statuses = [ 
        {id: 1, text: 'All'}, {id: 2, text: 'Interested'}, 
        {id: 3,text: 'On Hold'}, {id: 4, text: 'Dropped'}, 
        {id: 5, text: 'In Progress'}, {id: 6, text: 'Completed'}, 
    ]
    useEffect(() => {
        const fetchGame = () => {
            getDocs(collection(db, 'users', `${user.uid}`, 'games')).then((docs) => {
                docs.forEach((data) => {
                    setGames(game => [...game, data.data()])
                    setgamesCopy(game => [...game, data.data()])
                })
            }).catch(e => {
                console.log(e)
            })
        }
        return fetchGame
    }, [])

    const filterStatus = (genre) => {
        const filtered = games.filter(game => game.status == genre)
        setgamesCopy(filtered)
        setpreSearch(filtered)
        setFilter(true)
        if(genre === 'All') {
            setgamesCopy(games)
            
            setFilter(false)
        }
    }

    const searchGame = (e) => {
        const search = gamesCopy.filter(game => game.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setgamesCopy(search)
        if(e.target.value === '' && filter) {
            setgamesCopy(preSearch)
        }
    }
    return (
        <>
        <h1 className='sub-page-title'>Game List</h1>
            <section className='game-sect'>
                <aside className='filter-list'>
                    <section>
                        <h2 className='filter-title'>Search Bar</h2>
                        <input className='search-bar' placeholder='Search...' onChange={(e) => searchGame(e)}/>
                    </section>
                            
                    <section>
                        <h2 className='filter-title'>Status</h2>
                        <ul className="status-filter">
                            {statuses.map((status) => {
                                return(<li onClick={() => filterStatus(status.text)} key={status.id}>{status.text}</li>)
                            })}
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

                                {gamesCopy.map((game) => {
                                    return(
                                        <tr key={game.id} className='indv-game-row'>
                                            <td className='img-col'><img src={game.url.replace('t_thumb', 't_micro')} alt="game-logo"/></td>
                                            <td className='name-col'>{game.name}</td>
                                            <td className='status-col'>{game.status}</td>
                                            <td className='start-col'>{game.start_date === 'undefined' ? '-': game.start_date}</td>
                                            <td className='end-col'>{game.finish_date === 'undefined' ? '-' : game.finish_date}</td>
                                            <td className='action-col'><button><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
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