import { useRef } from 'react'
import '../App.scss'
import { useState } from 'react'



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
            modal.current?.showModal()
        }

        const closeModal = (e) => {
            e.preventDefault()
            modal.current?.close()
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
            <h1>Log Game</h1>
            <div className='mini-title'>{info[0].name}</div>
            <form method="">
                <img src={`${info[0].cover.url.replace('t_thumb', 't_logo_med')}`}></img>
                <div>
                    <label className='label-input'>Game Status</label>
                    <select name="game-status" onChange={handleGameStatus} defaultValue={gamestatus}>
                        {statuses.map((status) => <option key={status.id} 
                           value={status.text}>{status.text}</option>)}
                    </select>
                    <div>
                        <div>Completion Status</div>
                        <div className='date-picker'>
                        <label className='label-input'>Start Date</label><br/>
                        <input type="date" name="startdate" defaultValue={`${dates[0].startdate}`} onChange={handleDate}></input>   
                        </div>
                      <div className='date-picker'>
                       <label className='label-input'>End Date</label><br/>
                       <input type="date" name="enddate" defaultValue={`${dates[0].enddate}`} onChange={handleDate}></input>   
                      </div>
                    
                    </div>
                    
                </div>
            </form>
            <div className='two-btn'>
                <button className='fav-btn' onClick={() => setFavorite()}>Favorite</button> 
                <button onClick={() => postData(gamestatus, dates)} className='save-btn'>Save</button>
            </div>
            <button onClick={(e) => closeModal(e)} className='close-btn'>Close</button>
        </dialog>
    )
}

export default GameLog