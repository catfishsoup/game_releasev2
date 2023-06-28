import {db, auth} from '../firebase/firebase.js'
import { getDocs } from "firebase/firestore"; 
import { useState, useEffect } from 'react'

export const fetchFavorite = () => {

    const q = query(collection(db, 'users', `${auth.currentUser?.uid}`, 'games'), where('favorite', '==', true))
        getDocs(q).then(() => {
            queryGames.forEach((doc) => {
                const gameObject = {
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url
                }
                setFavoriteGame(game => [...game, gameObject])
            })
        })
}
