import {db, auth} from '../firebase/firebase.js'
import { collection, query, where } from "firebase/firestore"; 
import { getDocs } from "firebase/firestore"; 
import { useState } from 'react'

const fetchFavorite = async() => {
    const tempArr = []
    const q = query(collection(db, 'users', `${auth.currentUser?.uid}`, 'games'), where('favorite', '==', true))
    const querySnapshot = await getDocs(q); 
    querySnapshot.forEach((doc) => {
        const gameObject = {
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url
        }
        tempArr.push(gameObject)
    })
        return tempArr
}


export default {fetchFavorite}