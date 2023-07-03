import { useState, useCallback, useEffect } from "react"
import { collection, query, where, getCountFromServer } from "firebase/firestore"; 
import {auth, db } from '../../firebase/firebase.js'
import Picture from "../../components/Picture.js";
import styled from 'styled-components'
import userService from '../../firebase/user_request'
import ProfileList from "./ProfileList.js";
const StatusStyle = styled.div`
    background: ${props => props.$color};
    padding: 5px; 
    border-radius: 5px; 
    color: white;
    text-align: center;
`


const ProfileOverview = () => {
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
    const [favorites, setFavorites] = useState([])
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
          userService.fetchFavorite().then((result) => setFavorites(result))  
    }, [])
      return (
        <section className='overview-sect'>
            <section className='overview-sect-left'>
                <h2>Your List</h2><button className="action-btn">View More</button>
              <section className='list-overview'>
                {/* Render few of user lists here */}
               <section className="indiv-list">
                    <div>a</div>
                    <div>Title - Games</div>
                </section>
                
            </section>  



            {/*****/}
            <h2>Favorited Games</h2><button className="action-btn">View More</button>
            <section className='favorite-overview'>
                
                <section className='picture-cont'>
                    {favorites.map((data) => {
                        return(<Picture data={data} text={'t_cover_small'} key={data.id}/>)
                    }
                    )}
                </section>
            </section>
            </section>
            
            <section className='overview-sect-right'>
                <h2>Backlog Status</h2>
                <section className='backlog-overview'>
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
            {/**/}
            <h2>Game Activity</h2>
                <section className='backlog-overview'>
                {/* Count games by their completion status. */}
                <section>
                    
                </section>
            </section>           

            </section>
        </section>
    )  
}

export default ProfileOverview