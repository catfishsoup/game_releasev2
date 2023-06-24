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
    const [profilePicture, setprofilePicture] = useState()
    const createUser = async(email, password, username) => {
        // Resolve promises cleaner. . .
           await createUserWithEmailAndPassword(auth, email, password)
                updateProfile(auth.currentUser, {displayName: username})    
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

    const uploadPicture = (file, path, name) => {
       uploadBytes(ref(storage, `${user.displayName}/${path}/${name}`), file).then(() => {  
        if(path === 'pfp') {
            getDownloadURL(ref(storage, `${user.displayName}/pfp/pfp.jpg`)).then((url) => {
            updateProfile(user, {photoURL: url})
        })
        }
       }).catch((e) => {console.log(e)})
    }

    
    return(
        <UserContext.Provider value={{createUser,
            loginUser,
            logout,
            user, 
            updateEmailForCurrentUser, 
            updateuserPassword, 
            delUser,
            uploadPicture, 
            profilePicture}}>
            {!loading && children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}