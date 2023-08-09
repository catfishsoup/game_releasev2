import { useRef, useState, useContext } from 'react'
import '../App.scss'
import userService from '../firebase/user_request'
import { GameContext } from '../pages/Template'

const GameLog = ({ modalValue, setOpen, setFavorite }) => {
    let {info} = useContext(GameContext)
    const {userData} = useContext(GameContext)
    // Initializing variables 
    if (!info) {
        info = ''
    }
    const [dates, setDates] = useState([
        { startdate: '', enddate: '' }
    ])
    const [gamestatus, setGameStatus] = useState()
    const statuses = [
        { id: 1, text: 'Interested' }, { id: 2, text: 'On Hold' }, { id: 3, text: 'Dropped' },
        { id: 4, text: 'In Progress' }, { id: 5, text: 'Completed' },
    ]
    // 
    const modal = useRef()
    if (modalValue) {
        modal.current?.removeAttribute('open')
        modal.current?.showModal()
    } else {
        modal.current?.close()
    }

    const handleGameStatus = (e) => {
        setGameStatus(e.target.value)
    }

    const handleDate = (e) => {
        let today = formatDate()
        if (e.target.value > today) {
            //Create Alert 
            console.log('Date set cannot be in the future.')
        } else {
            setDates({ ...dates, [e.target.name]: e.target.value })
        }
    }

    const validateData = () => {

        if (gamestatus === undefined) {
            console.log('Please enter a game status before saving')
        } else {
            userService.postData(userData?.id || String(info[0]?.id), userData.name || info[0]?.name, gamestatus, dates, userData?.url || info[0]?.cover.url)
        }

    }

    return (
        <dialog ref={modal} className='modal-tab'>
            <h1>Log Game</h1>
            <div className='mini-title'>{userData?.name || info[0]?.name}</div>
            <form >
                <img src={userData?.url !== undefined
                    ? `${userData.url?.replace('t_thumb', 't_logo_med')}` : info[0]?.cover.url.replace('t_thumb', 't_logo_med')} alt="game-thumbnail"></img>
                <div>
                    <label className='label-input'>Game Status</label>
                    <select name="game-status" key={userData?.status} onChange={handleGameStatus} defaultValue={userData?.status}>
                        {statuses.map((status) => <option key={status.id}
                            value={status.text}>{status.text}</option>)}
                    </select>
                    <div>
                        <div>Completion Status</div>
                        <div className='date-picker'>
                            <label className='label-input'>Start Date</label><br />
                            <input type="date" name="startdate" key={userData?.start_date} defaultValue={userData?.start_date} onChange={handleDate}></input>
                        </div>
                        <div className='date-picker'>
                            <label className='label-input'>End Date</label><br />
                            <input type="date" name="enddate" key={userData?.finish_date} defaultValue={userData?.finish_date} onChange={handleDate}></input>
                        </div>

                    </div>

                </div>
            </form>
            <div className='two-btn'>
                <button className='fav-btn' onClick={() => setFavorite()}>Favorite</button>
                <button onClick={() => validateData()} className='save-btn'>Save</button>
            </div>
            <button onClick={() => setOpen(false)} className='close-btn'>Close</button>
        </dialog>
    )
}

export default GameLog

function formatDate() {
    const date = new Date()
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}