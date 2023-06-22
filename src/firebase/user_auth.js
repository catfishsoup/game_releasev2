import {auth, db, storage } from './firebase.js'
import { ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, collection, getDoc, updateDoc } from "firebase/firestore"; 
import {createContext, useContext, useEffect, useState} from 'react'
import {createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    signInWithEmailLink, 
    onAuthStateChanged,
    updateProfile, 
    updateEmail,
    updatePassword,
    deleteUser} from "firebase/auth";

import user_pfp from '../img/user.png'
const UserContext = createContext("")


export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const createUser = async(email, password, username) => {
        // Resolve promises cleaner. . .
           await createUserWithEmailAndPassword(auth, email, password)
                updateProfile(auth.currentUser, {displayName: username, photoURL: user_pfp}) 
                uploadBytes(ref(storage, `${username}/pfp/${user_pfp}`))       
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            setUser(currUser)
            setLoading(false)
        })
        return unsubscribe
    }, [])


    const updateuserEmail = (email) => {
        updateEmail(user, email).then(() => {
            console.log('Updated Email')
        }).catch((e) => {console.log(e)})
    }

    const updateuserPassword = (password) => {
        updatePassword(user, password).then(() => {
            console.log('Updated Password')
        }).catch((e) => {console.log(e)})
    }

    const delUser = () => {
        deleteUser(user).then(() => {
            console.log('User Deleted')
          }).catch((e) => {console.log(e)});
          
    }

    return(
        <UserContext.Provider value={{createUser,
            loginUser,
            logout,
            user, 
            updateuserEmail, 
            updateuserPassword, 
            delUser}}>
            {!loading && children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}