import {db, auth} from '../firebase/firebase.js'
import { collection, query, where, getDoc, doc, setDoc } from "firebase/firestore"; 
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
            name_id: document.id
        }
        const listRef = doc(db, 'users', `${auth.currentUser?.uid}`, 'lists', `${document.id}`);
        getDoc(listRef).then((datas) => {
           listObject.count = datas.data().count
           listObject.games = datas.data().games
           listObject.name = datas.data().name
           tempArr.push(listObject)
        })
        
    })

    return tempArr
}

async function postData(id, name, gamestatus, dates, url) {
    await setDoc(doc(collection(db, 'users'), `${auth.currentUser?.uid}`, 'games', id), {
        id: id,
        name: name,
        url: url,
        status: `${gamestatus}` || '',
        start_date: `${dates.startdate}` || '',
        finish_date: `${dates.enddate}` || '',
    }, {merge: true})
}


export default {fetchFavorite, fetchLists, postData}