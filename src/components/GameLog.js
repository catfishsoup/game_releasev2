import { useEffect, useRef } from 'react'
import '../App.scss'
import { useState } from 'react'
import userService from '../firebase/user_request'


const GameLog = ({modalValue, setOpen, setFavorite, userData, info }) => {
    // Initializing variables 
    const [dates, setDates] = useState([ 
        { startdate: '', enddate: ''}
    ])
    const [gamestatus, setGameStatus] = useState()
    const statuses = [ 
        {id: 1, text: 'Interested'}, {id: 2,text: 'On Hold'}, {id: 3, text: 'Dropped'}, 
        {id: 4, text: 'In Progress'}, {id: 5, text: 'Completed'}, 
    ]
    // 

    const modal = useRef()
        if(modalValue) {
            modal.current?.removeAttribute('open')
            modal.current?.showModal()
        } else {
            modal.current?.close()
        }

        const handleGameStatus = (e) => {
            setGameStatus(e.target.value)
        }

        const handleDate = (e) => {
            setDates({...dates, [e.target.name] : e.target.value})
        }

    return(
        <dialog ref={modal} className='modal-tab'>
            <h1>Log Game</h1>
            <div className='mini-title'>{userData.name}</div>
            <form >
                <img src={`${userData.url?.replace('t_thumb', 't_logo_med')}`}></img>
                <div>
                    <label className='label-input'>Game Status</label>
                    <select name="game-status" key={userData.status} onChange={handleGameStatus} defaultValue={userData.status}>
                        {statuses.map((status) => <option key={status.id} 
                           value={status.text}>{status.text}</option>)}
                    </select>
                    <div>
                        <div>Completion Status</div>
                        <div className='date-picker'>
                        <label className='label-input'>Start Date</label><br/>
                        <input type="date" name="startdate" key={userData.start_date} defaultValue={userData.start_date} onChange={handleDate}></input>   
                        </div>
                      <div className='date-picker'>
                       <label className='label-input'>End Date</label><br/>
                       <input type="date" name="enddate" key={userData.finish_date} defaultValue={userData.finish_date} onChange={handleDate}></input>   
                      </div>
                    
                    </div>
                    
                </div>
            </form>
            <div className='two-btn'>
                <button className='fav-btn' onClick={() => setFavorite()}>Favorite</button> 
                <button onClick={() => userService.postData(userData.id, userData.name, gamestatus, dates, userData.url)} className='save-btn'>Save</button>
            </div>
            <button onClick={() => setOpen(false)} className='close-btn'>Close</button>
        </dialog>
    )
}

export default GameLog