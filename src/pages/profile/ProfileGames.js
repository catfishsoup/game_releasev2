import { useState, useEffect } from "react"
import { getDocs, collection } from "firebase/firestore"; 
import { UserAuth } from "../../firebase/user_auth"
import { db } from '../../firebase/firebase.js'
import { Link } from "react-router-dom";
import GameLog from "../../components/GameLog";
const ProfileGames = () => {
    //Keep the original data here 
    const [games, setGames] = useState([])

    //Modify the data here 
    const [gamesCopy, setgamesCopy] = useState([])
    const [preSearch, setpreSearch] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [currGame, setcurrGame] = useState([])
    const [filter, setFilter] = useState(false)
    const {user} = UserAuth()
    const statuses = [ 
        {id: 1, text: 'All'}, {id: 2, text: 'Interested'}, 
        {id: 3, text: 'On Hold', }, {id: 4, text: 'Dropped', }, 
        {id: 5, text: 'In Progress', }, {id: 6, text: 'Completed', },      
    ]

    const status_color = [
        
    ]
    useEffect(() => {
        const fetchGame = () => {
            getDocs(collection(db, 'users', `${user.uid}`, 'games')).then((docs) => {
                docs.forEach((data) => {

                    //Validate user form first!
                    if(data.data().status !== undefined && data.data().status !== '') {
                      setGames(game => [...game, data.data()])
                    setgamesCopy(game => [...game, data.data()])    
                    }
                })
            }).catch(e => {
                console.log(e)
            })
        }
        return fetchGame
    }, [])

    const filterStatus = (genre) => {
        const filtered = games.filter(game => game.status === genre)
        setgamesCopy(filtered)
        setpreSearch(filtered)
        setFilter(true)
        if(genre === 'All') {
            setgamesCopy(games)
            
            setFilter(false)
        }
    }

    const searchGame = (e) => {
        if(filter) {
          const search = gamesCopy.filter(game => game.name.toLowerCase().includes(e.target.value.toLowerCase()))
          setgamesCopy(search)  
          if(e.target.value === '') {
            setgamesCopy(preSearch)
          }
        } else {
            const search = games.filter(game => game.name.toLowerCase().includes(e.target.value.toLowerCase()))
            setgamesCopy(search)
            if(e.target.value === '') {
                setgamesCopy(games)
            }
        }
    }

    const gameModal = (game) => {
        console.log(game)
        setcurrGame(game)
        setOpenModal(true)
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
                                </tr> 

                                {gamesCopy.map((game) => {
                                    return(
                                        <tr key={game.id} className='indv-game-row'>
                                            <td className='img-col'>
                                                <div className="img-cont">
                                                <img src={game.url.replace('t_thumb', 't_micro')} alt="game-logo"/>
                                                <div className="overlay" onClick={() => gameModal(game)}></div>   
                                                </div>
                                                
                                            </td>
                                            <td className='name-col'><Link to={`../games/${game.id}`} target="_blank">{game.name}</Link></td>
                                            <td className='status-col'>{game.status}</td>
                                            <td className='start-col'>{!game.start_date || game.start_date === 'undefined' ? '-': game.start_date}</td>
                                            <td className='end-col'>{!game.finish_date || game.finish_date === 'undefined' ? '-' : game.finish_date}</td>
                    
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </section>
                        <GameLog modalValue={openModal} setOpen={setOpenModal} userData={currGame}/>
                    </section>
                    
        </>
        
        
    ) 
}

export default ProfileGames