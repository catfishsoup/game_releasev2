import {db, auth} from '../firebase/firebase.js'
import { collection, query, where, getDoc, doc } from "firebase/firestore"; 
import { getDocs } from "firebase/firestore"; 

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

const fetchLists = async() => {
    let tempArr = []
    const query = collection(db, 'users', `${auth.currentUser?.uid}`, 'lists')
    const querySnapshot = await getDocs(query)
    querySnapshot.forEach((document) => {
        const listObject = {
            name: document.id
        }
        const listRef = doc(db, 'users', `${auth.currentUser?.uid}`, 'lists', `${document.id}`);
        getDoc(listRef).then((datas) => {
           listObject.count = datas.data().count
           listObject.games = datas.data().games
           tempArr.push(listObject)
        })
        
    })

    return tempArr
}


const readCollection = () => {
    
}
export default {fetchFavorite, fetchLists}