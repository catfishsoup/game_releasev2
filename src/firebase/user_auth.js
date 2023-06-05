import {auth} from './firebase.js'
import {createContext, useContext, useEffect, useState} from 'react'
import {createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    signInWithEmailLink, 
    onAuthStateChanged } from "firebase/auth";
const UserContext = createContext()


export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
            return createUserWithEmailAndPassword(auth, email, password);
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
    return(
        <UserContext.Provider value={{createUser,
            loginUser,
            logout,
            user}}>
            {!loading && children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}