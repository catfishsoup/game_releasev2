import {db} from '../firebase/firebase.js'
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useState, useEffect } from 'react'

const retrieveUserData = async(id) => {
        const userRef = doc(db, "users", id)
            await getDoc(userRef).then((doc) => {
                return doc.data()
            })
}

const retrieveData = () => {

}

const postData = ({id, action}) => {
    
}

// Take in currUser authentication id 
const markGame = async({id, action, }) => {
    await setDoc(doc(db, 'users', `${id}/favorites`), {
        cover_url: '',
        name: '', 
    })
}

const setGameStatus = () => {
    
}

export default {retrieveUserData}