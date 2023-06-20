import {useParams} from "react-router-dom";
import styled from 'styled-components'
import { useEffect, useState} from 'react'
import gameService from '../services/gamereq.js'
import GameLog from '../components/GameLog.js'
import '../styles/Template.scss'
import { doc, setDoc, collection, getDoc, updateDoc } from "firebase/firestore"; 
import {auth, db} from '../firebase/firebase.js'
import ModalImage from "react-modal-image";
const List = ({data}) => {
    return(
        <li key={data.key}>{data.name}</li>
    )
}
const Screenshot = ({data}) => {
    return (
        <ModalImage className='modal-img' 
        small={data.url.replace('t_thumb', 't_screenshot_med')} 
        large={data.url.replace('t_thumb', 't_screenshot_huge')}/>
    )
}

const ProfileHeader = styled.div`
    background-image: url(${props => props.$cover || "#BF4F74"});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    opacity: 2;
    top: 0;
    left: 0;
    padding: 10rem;
    width: 100%;
    display: inline-block;
    z-index: -1;
`

const FavoriteBtn = styled.button`
    background: red;
    border-radius: 5px;
    padding: 5px;
    border: none;
`
const Template = () => {
    const [loading, setLoading] = useState(true)
    let { id } = useParams();
    const [contained, setContained] = useState(false)
    const [info, setInfo] = useState([])
    const [userData, setuserData] = useState([])
    const [openModal, setopenModal] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const userRef = doc(collection(db, 'users'), `${auth.currentUser?.uid}`, 'games', id)
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
                favorite: true,
                name: info[0].name,
                url: info[0].cover.url,
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
        <div className="game-info">
            <section className="header-cont">
                <ProfileHeader $cover={`${info[0].screenshots[0]?.url.replace('t_thumb', 't_screenshot_huge_2x')}`} className="game-header"></ProfileHeader> 
                <div className="header-cont-2">
                <img className="game_thumbnail" src={`${info[0].cover.url.replace('t_thumb', 't_cover_big')}` || ''} alt="game_thumbnail"/>
                <h1>{info[0].name}</h1>
               
                </div>
            </section>
           
                <section className="info-body">
                    <aside className="left-section">
                        <section className="manage-games">
                            {/* Only allow log in user to perform action down here.  */}
                            <h2>Manage Game</h2>
                            <button onClick={() => setopenModal(true)} className="log-btn">Log {`${info[0].name}`}</button> 
                    {/* Render on click, not on page refresh */}
                            <FavoriteBtn onClick={favoriteGame}><svg xmlns="http://www.w3.org/2000/svg" width="24" 
                            height="20" viewBox="0 0 24 24">
                                <path fill="white" 
                                d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"/>
                                </svg>
                                </FavoriteBtn>
                            <button> + Add to List</button>
                        </section>
                        <section className="release-dates">
                            <h2>Release Date</h2>
                            {/* <ul>
                                {info[0].involved_companies.map((curr_company) => {
                                return(<List data={curr_company.company}/>)
                                })}
                            </ul> */}
                        </section>

                        <section className="platforms">
                            <h2>Platforms</h2>
                            <ul>
                                {info[0].platforms.map((platform) => {
                                return(<List data={platform}/>)
                                })}
                            </ul>
                        </section> 
                
                        <section className="developers">
                            <h2>Created By:</h2>
                            <ul>
                                {info[0].involved_companies.map((curr_company) => {
                                return(<List data={curr_company.company}/>)
                                })}
                            </ul>
                        </section>

                        <section className="developers">
                            <h2>External Links</h2>
                            <ul>
                                {info[0].involved_companies.map((curr_company) => {
                                return(<List data={curr_company.company}/>)
                                })}
                            </ul>
                        </section>
                        
                    </aside>
                    {/*********/}
                    <section className="main-section">
                        
                        <section className="genre">
                            <ul> {info[0].genres.map((genre) => {return(<List data={genre}/>)})}
                            </ul>
                        </section>

                        <section className="desc">
                            <h2>Description</h2>
                            <p className="game-desc">{info[0].summary}</p>   
                        </section>
                        
                        <section className="screenshots"> 
                        <h2>Screenshots</h2>
                        <div className="modal-cont">
                           {info[0].screenshots.map((picture) => {
                            return(<Screenshot data={picture}/>)
                            })}  
                        </div>
                              
                        </section>

                        <section className="screenshots"> 
                        <h2>Videos</h2>
                        <div className="modal-cont">
                           {info[0].screenshots.map((picture) => {
                            return(<Screenshot data={picture}/>)
                            })}  
                        </div>
                              
                        </section>
                    </section>
                </section> 
        </div>
        <GameLog modalValue={openModal} setOpen={setopenModal} info={info} id={id} setFavorite={favoriteGame} postData={postData} userData={userData}/>
        </>
        
    )
}

export default Template; 