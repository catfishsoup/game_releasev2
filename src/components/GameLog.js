import { useRef, createRef } from 'react'
import '../App.scss'
import { useEffect, useState } from 'react'
import {db} from '../firebase/firebase.js'
import {auth} from '../firebase/firebase.js'
import { doc, setDoc, collection, getDoc, deleteDoc, updateDoc } from "firebase/firestore"; 



const GameLog = ({modalValue, info, setOpen, setFavorite, postData, userData}) => {


    // Initializing variables 
    const [dates, setDates] = useState([ 
        { startdate: userData.start_date || '', enddate: userData.finish_date || ''}
    ])
    const [gamestatus, setGameStatus] = useState(userData.status || '')
    const statuses = [ 
        {id: 1, text: 'Interested'}, {id: 2,text: 'On Hold'}, {id: 3, text: 'Dropped'}, 
        {id: 4, text: 'In Progress'}, {id: 5, text: 'Completed'}, 
    ]
    // 
    const modal = useRef()
        if(modalValue === true) {
            modal.current?.removeAttribute('open')
            modal.current.showModal()
        }

        const closeModal = (e) => {
            e.preventDefault()
            modal.current.close()
            setOpen(false)
        }

        const handleGameStatus = (e) => {
            setGameStatus(e.target.value)
        }

        const handleDate = (e) => {
            setDates({...dates, [e.target.name] : e.target.value})
        }
    return(
        <dialog ref={modal} className='modal-tab'>
            <div className='mini-title'>{info[0].name}</div>
            <form method="">
                <img src={`${info[0].cover.url.replace('t_thumb', 't_logo_med')}`}></img>
                <div>
                    <label><small>Status</small></label>
                    <select name="game-status" onChange={handleGameStatus} defaultValue={gamestatus}>
                        {statuses.map((status) => <option key={status.id} 
                           value={status.text}>{status.text}</option>)}
                    </select>
                    <label><small>Start Date</small></label>
                    <input type="date" name="startdate" defaultValue={`${dates[0].startdate}`} onChange={handleDate}></input>
                    <br/><label><small>End Date</small></label>
                    <input type="date" name="enddate" defaultValue={`${dates[0].enddate}`} onChange={handleDate}></input>
                </div>
            </form>
            <div className='two-btn'><button className='fav-btn' onClick={() => setFavorite()}>Favorite</button> <button onClick={() => postData(gamestatus, dates)}>Save</button></div>
            <button onClick={(e) => closeModal(e)} className='close-btn'>X</button>
        </dialog>
    )
}

export default GameLog