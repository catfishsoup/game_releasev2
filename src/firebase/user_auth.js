import {auth, db, storage } from './firebase.js'
import { getMetadata, ref, uploadBytes, getDownloadURL, } from "firebase/storage";
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
    deleteUser, } from "firebase/auth";

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


    async function updateEmailForCurrentUser(email) {
        return await updateEmail(auth.currentUser, email);
    }

    const updateuserPassword = (password) => {
        updatePassword(auth.currentUser, password).then(() => {
            console.log('Updated Password')
        }).catch((e) => {console.log(e)})
    }

    const delUser = () => {
        deleteUser(user).then(() => {
            console.log('User Deleted')
          }).catch((e) => {console.log(e)});
          
    }

    const uploadCover = (file) => {
       uploadBytes(ref(storage, `${user.displayName}/cover/cover.jpg`), file).then((snapshot) => {
            alert('File Uploaded')
       }).catch((e) => {console.log(e)})
    }

    const getCover = () => {
        getMetadata(storage, `${user.displayName}/cover/cover.jpg`).then((metadata) => {
            console.log('metadata' + metadata)
        })
    }
    return(
        <UserContext.Provider value={{createUser,
            loginUser,
            logout,
            user, 
            updateEmailForCurrentUser, 
            updateuserPassword, 
            delUser,
            uploadCover, 
            getCover}}>
            {!loading && children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}