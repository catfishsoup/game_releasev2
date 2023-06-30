
import { useRef, useState } from 'react'
import { doc, setDoc, addDoc} from "firebase/firestore"; 
import {auth, db} from '../firebase/firebase.js'
import {ListAlert, FailedAlert} from './Alert.js'
import '../App.scss'
const ListModal = ({click}) => {

    const listName = useRef()
    const [finish, setFinish] = useState(false)
    const [alert, setAlert] = useState(false)
    const [falsealert, setfalseAlert] = useState(false)
    const createList = (e) => {
        e.preventDefault()
        if(listName.current.value !== '') {
           const userListRef = doc(db, `users/${auth.currentUser?.uid}/lists/${listName.current.value.replace(/\s/g, "")}`)
        setDoc(userListRef, {
            name: listName.current.value,
        }).then(() => {
            setFinish(true)
            setAlert(true)
        }).catch((e) => console.log(e)) 
        } else {
            setfalseAlert(true)
        }
        
    }

    if(finish) {
        setTimeout(() => {
            setAlert(false)
        }, 1500)
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    } else if(falsealert) {
        setTimeout(() => {setfalseAlert(false)}, 1500)
    }

    return (
        <section className="create-list-modal">
            <section className="create-list-modal-main">
             <h1>New List</h1>
             <label>New list name</label>
             <input type="text" placeholder="List name" ref={listName} required/>
             <button onClick={(e) => createList(e)} className="save-btn" >Save</button>
             <button className="close-btn" onClick={() => click(false)}>Close</button>   
            </section>
            {alert && <ListAlert text={listName.current.value}/>}
            {falsealert && <FailedAlert text={'Unable to create list!'}/>}
        </section>
    )
}

export default ListModal;