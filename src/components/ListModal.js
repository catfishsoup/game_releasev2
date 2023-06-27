
import { useRef, useState } from 'react'
import { doc, setDoc, addDoc} from "firebase/firestore"; 
import {auth, db} from '../firebase/firebase.js'
import {ListAlert} from './Alert.js'
import '../App.scss'
const ListModal = ({click}) => {

    const listName = useRef()
    const [finish, setFinish] = useState(false)
    const [alert, setAlert] = useState(false)
    const createList = () => {
        const userListRef = doc(db, `users/${auth.currentUser?.uid}/lists/${listName.current.value}`)
        setDoc(userListRef, {
            exist: true,
        }).then(() => {
            setFinish(true)
            setAlert(true)
        })
    }

    if(finish) {
        setTimeout(() => {
            setAlert(false)
        }, 1500)
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }

    return (
        <section className="create-list-modal">
            <section className="create-list-modal-main">
             <h1>New List</h1>
             <label>New list name</label>
             <input type="text" placeholder="List name" ref={listName} required/>
             <button onClick={() => createList()} className="save-btn">Save</button>
             <button className="close-btn" onClick={() => click(false)}>Close</button>   
            </section>
            {alert && <ListAlert text={listName.current.value}/>}
        </section>
    )
}

export default ListModal;