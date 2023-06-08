import {useParams} from "react-router-dom";
import { useEffect, useState } from 'react'
import gameService from '../services/gamereq.js'
import '../styles/Template.scss'
import {db} from '../firebase/firebase.js'
import { doc, setDoc, collection, getDoc, deleteDoc } from "firebase/firestore"; 
import {auth} from '../firebase/firebase.js'
import { deleteApp } from "firebase/app";
const List = ({data}) => {
    return(
        <li key={data.key}>{data.name}</li>
    )
}

const Screenshot = ({data}) => {
    return (
        <img key={data.id} src={data.url}/>
    )
}
const Template = () => {

    // Use Params - take in the param in the URL as data to use. Have to use the same param  define in path. 
    let { id } = useParams();
    const [info, setInfo] = useState([])
    const [loading, setLoading] = useState(true)
    const [favorited, setFavorited] = useState(false)
    const userRef = doc(collection(db, 'users'), `${auth.currentUser.uid}`, 'favorites', id)
    // Loads game data
    useEffect(() => {
        gameService.getCurrent(id).then(data => {
         setInfo(data)
         setLoading(false)
        })
      }, [])

    // Check if the document is favorited by user. 
    useEffect(() => {
        const favoriteCheck = async() => {
            await getDoc(userRef).then((doc) => {
                if(doc.data() !== undefined) {
                    setFavorited(doc.data().favorite)
                } 
            })
        }
        return favoriteCheck
    }, [])
    // Once we get the id, fetch the data to display under here 
    if(loading) {
        return <>Loading...</>
    }

    const addFavorite = async() => {
          // Path: [collection] users -> [document] currentUser.uid -> [collections] favorites -> new entry with game id
          if(favorited === false) {
             await setDoc(userRef, {
            id: id,
            name: `${info[0].name}`,
            url: `${info[0].cover.url}`,
            favorite: true, 
            })  
            setFavorited(true)
            } else if(favorited === true) {
                await deleteDoc(userRef)
                setFavorited(false)
            }
          }
         

    const openList = () => {

    }
    return(
        <main className="game-info">
            <img className="game_cover" src={`${info[0].cover.url.replace('t_thumb', 't_screenshot_huge')}`} alt="game_cover"/>
            <img className="game_thumbnail" src={`${info[0].cover.url.replace('t_thumb', 't_cover_big')}`} alt="game_thumbnail"/>
            <h1>{info[0].name}</h1>
            <p>{info[0].summary}</p>
            <section className="genre">
                <ul>
                    {info[0].genres.map((genre) => {
                        return(<List data={genre}/>)
                    })}
                </ul>
            </section>

            <section className="screenshots">
                    {info[0].screenshots.map((picture) => {
                        return(<Screenshot data={picture}/>)
                    })}
            </section>

            <section className="platforms">
                <ul>
                    {info[0].platforms.map((platform) => {
                        return(<List data={platform}/>)
                    })}
                </ul>
            </section>

            <section className="developers">
                <ul>
                    {info[0].involved_companies.map((curr_company) => {
                        return(<List data={curr_company.company}/>)
                    })}
                </ul>
            </section>

            <section>
                <button onClick={addFavorite}>{favorited === false ? 'Not Favorite' : 'Favorited'}</button>
                <button onClick={openList}> + Add to List</button>
            </section>
        </main>
    )
}

export default Template; 