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


const markGame = ({id, action}) => {
    
}

const setGameStatus = () => {
    
}

const getGameStatus = () => {
    
}

export default {retrieveUserData}