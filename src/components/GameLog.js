import { useRef, createRef } from 'react'
import '../App.scss'
import { useEffect, useState } from 'react'
import {db} from '../firebase/firebase.js'
import {auth} from '../firebase/firebase.js'
import { doc, setDoc, collection, getDoc, deleteDoc, updateDoc } from "firebase/firestore"; 



const GameLog = ({modalValue, info, id, setOpen, setFavorite, postData }) => {
    const userRef = doc(collection(db, 'users'), `${auth.currentUser.uid}`, 'games', id)
    const [dates, setDates] = useState([ 
        { startdate: '', enddate: ''}
    ])
    const [gamestatus, setGameStatus] = useState()
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
                        <select name="game-status" defaultValue='Not Logged' onChange={handleGameStatus}>
                            <option value="interested">Interested</option>
                            <option value="on-hold">On Hold</option>
                            <option value="dropped">Dropped</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <label><small>Start Date</small></label>
                        <input type="date" name="startdate" defaultValue="2018-07-22" onChange={handleDate}></input>
                        <br/><label><small>End Date</small></label>
                        <input type="date" name="enddate" defaultValue="" onChange={handleDate}></input>
                </div>
            </form>
            <div className='two-btn'><button className='fav-btn' onClick={() => setFavorite()}>Favorite</button> <button onClick={() => postData(gamestatus, dates)}>Save</button></div>
            <button onClick={(e) => closeModal(e)} className='close-btn'>X</button>
        </dialog>
    )
}

export default GameLog