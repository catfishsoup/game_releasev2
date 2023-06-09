import {useParams} from "react-router-dom";
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import gameService from '../services/gamereq.js'
import GameLog from '../components/GameLog.js'
import '../styles/Template.scss'
import {db} from '../firebase/firebase.js'
import { doc, setDoc, collection, getDoc, deleteDoc, updateDoc } from "firebase/firestore"; 
import {auth} from '../firebase/firebase.js'
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

const ProfileHeader = styled.section`
    background-image: url(${props => props.$cover || "#BF4F74"});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    padding: 5rem;
    width: 100%;
`
const Template = () => {
    const [loading, setLoading] = useState(true)
    let { id } = useParams();
    const [contained, setContained] = useState(false)
    const [info, setInfo] = useState([])
    const [userData, setuserData] = useState([])
    const [openModal, setopenModal] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const userRef = doc(collection(db, 'users'), `${auth.currentUser.uid}`, 'games', id)
    // Loads game data from IDGB
    useEffect(() => {
        gameService.getCurrent(id).then(data => {
         setInfo(data)
         setLoading(false)
        })
      }, [])

    // Check if the document is bookmarked by user. 
    useEffect(() => {
        const loadData = async() => {
            await getDoc(userRef).then((doc) => {
                // Check the information about the game
                if(doc.data() !== undefined) {
                    setuserData(doc.data())
                    setFavorited(doc.data().favorite)
                    setContained(true)
                }
            })
        }
        return loadData
    }, [])
    // Once we get the id, fetch the data to display under here 
    if(loading) {
        return <>Loading...</>
    }
// Use Params - take in the param in the URL as data to use. Have to use the same param  define in path.    
    async function favoriteGame() {
        // If data is contained and favorite is false. 
        console.log('clicked')
        if(contained === true) {
            setFavorited(!favorited)
            await updateDoc(userRef, {
                favorite: !favorited
            }, {merge: true})
        } else {
            await setDoc(userRef, {
                favorite: true
            }, {merge: true})
        }
    }

    async function postData(gamestatus, dates) {
        await setDoc(userRef, {
            name: info[0].name,
            url: info[0].cover.url,
            status: `${gamestatus}` || '',
            start_date: `${dates.startdate}` || '',
            finish_date: `${dates.enddate}` || '',
        }, {merge: true})
    }
    return(
        <>
        <main className="game-info">
            <ProfileHeader $cover={`${info[0].screenshots[0]?.url.replace('t_thumb', 't_screenshot_huge')}`}>
                <img className="game_thumbnail" src={`${info[0].cover.url.replace('t_thumb', 't_cover_big')}` || ''} alt="game_thumbnail"/>
            </ProfileHeader>
                
            
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
                <small>Manage Game</small>
               <button onClick={() => setopenModal(true)}>Log {`${info[0].name}`}</button> 
               {/* Render on click, not on page refresh */}
               <button onClick={favoriteGame}>{favorited === true ? 'Favorited' : 'Not Favorited'}</button>
               {/* <button> + Add to List</button> Implementing 'Lists' feature later */}
            </section>
        </main>
        <GameLog modalValue={openModal} setOpen={setopenModal} info={info} id={id} setFavorite={favoriteGame} postData={postData} userData={userData}/>
        </>
        
    )
}

export default Template; 