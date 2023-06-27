import {useParams} from "react-router-dom";
import styled from 'styled-components'
import { useEffect, useState} from 'react'
import gameService from '../services/gamereq.js'
import GameLog from '../components/GameLog.js'
import '../styles/Template.scss'
import { doc, setDoc, collection, getDoc, updateDoc, getDocs } from "firebase/firestore"; 
import {auth, db} from '../firebase/firebase.js'
import ModalImage from "react-modal-image";
import ListModal from '../components/ListModal.js'
import { FailedAlert, GeneralPositiveAlert } from "../components/Alert.js";
import { externalurl } from "../components/externalurl.js";
// 
// Styled components
const ProfileHeader = styled.div`
    background-image: url(${props => props.$cover});
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
    display: inline;
    vertical-align: middle;
    margin-left: 1em;
    padding: 5px;
    border: none;
`

// 
// Components
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

const Media = ({data}) => {
    return(
        <></>
    )
}


// Main
const Template = () => {
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    
    const [info, setInfo] = useState([])
    const [userData, setuserData] = useState([])
    const [userList, setuserList] = useState([])

    const [contained, setContained] = useState(false)
    const [openModal, setopenModal] = useState(false)
    const [favorited, setFavorited] = useState(false)

    // List related states 
    const [openList, setopenList] = useState(false)
    const [newList, setnewList] = useState(false)
    const [addList, setaddList] = useState(false)

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
        // Check the information about the game from user.
            getDoc(userRef).then((doc) => {
                if(doc.data() !== undefined) {
                    setuserData(doc.data())
                    setFavorited(doc.data().favorite)
                    setContained(true)
                }
            })
        // Check the list from the user
            getDocs(collection(db, `users/${auth.currentUser?.uid}/lists`)).then((docs) => {
                const tempArray = []
                docs.forEach((data) => {tempArray.push(data.id)}
                )
                setuserList(tempArray)
            })
    }, [])
    // Once we get the id, fetch the data to display under here 
    if(loading) {
        return <>Loading...</>
    }
// Use Params - take in the param in the URL as data to use. Have to use the same param  define in path.    
    async function favoriteGame() {
        // If data is contained and favorite is false. 
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

    const addtoList = (list) => {
        const userListRef = doc(db, `users/${auth.currentUser?.uid}/lists/${list}/${id}/info`)
        setDoc(userListRef, {
            name: info[0].name,
            url: info[0].cover.url,
        }, {merge: true}).then(() => {
            setaddList(true)
        })
    }

    if(addList) {
        setTimeout(() => 
        setaddList(false), 2000)
    }

    console.log(info[0].websites)
    // 
    return(
        <>
        <div className="game-info">
            <section className="header-cont">
                <ProfileHeader $cover={`${info[0].screenshots[0]?.url.replace('t_thumb', 't_screenshot_huge_2x')}` || "#BF4F74"} className="game-header"></ProfileHeader> 
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
                            <FavoriteBtn onClick={() => favoriteGame()}><svg xmlns="http://www.w3.org/2000/svg" width="24" 
                            height="20" viewBox="0 0 24 24">
                                <path fill="white" 
                                d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"/>
                                </svg>
                                </FavoriteBtn>
                            <div className="user-lists" onClick={() => setopenList(!openList)}>
                                {/* If not added to list, display 'Add to List' else display the belong list. */}
                                <div className="add-to-list">
                                    <span>Add to List</span> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g id="evaArrowDownFill0"><g id="evaArrowDownFill1">
                                    <path id="evaArrowDownFill2" fill="currentColor" d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05a2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17Z"/></g></g>
                                    </svg>
                                </div>
                                <div className="list-holder" style={{display: openList === true ? 'block' : 'none'}}>
                                    <div onClick={() => addtoList('wishlist')}>Wishlist</div>
                                 {userList.map((data) => {
                                    if(data !== 'wishlist') {
                                        return(<div onClick={() => addtoList(data)}>{data}</div>)
                                    }      
                                 } )}
                                 <div onClick={() => setnewList(true)} className="new-user-list">New List</div>   
                                </div>
                            </div>
                        </section>

                        {/**/}
                        <section className="release-dates">
                            <h2>Release Date</h2>
                            <p>{info[0].release_dates[0].human}</p>
                        </section>

                        {/**/}
                        <section className="platforms">
                            <h2>Platforms</h2>
                            <ul>
                                {info[0].platforms.map((platform) => {
                                return(<List data={platform}/>)
                                })}
                            </ul>
                        </section> 
                
                        {/**/}
                        <section className="developers">
                            <h2>Created By</h2>
                            <ul>
                                {info[0].involved_companies.map((curr_company) => {
                                return(<List data={curr_company.company}/>)
                                })}
                            </ul>
                        </section>
                        
                        {/**/}
                        <section className="ext-links">
                            <h2>External Links</h2>
                            <ul>
                                {info[0].websites.map((website) => {
                                    let temp_value = externalurl.filter(data => data.id === website.category)
                                    if(temp_value !== undefined) {
                                        return(<li><a href={website.url} target="_blank">{temp_value[0].name}</a></li>)
                                    }
                                })}
                            </ul>
                        </section>
                    </aside>

                    {/*  */}
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
                        {/* <div className="modal-cont">
                           {info[0].videos.map((picture) => {
                            return(<Screenshot data={picture}/>)
                            })}  
                        </div> */}
                              
                        </section>
                    </section>
                </section> 
        </div>
        <GameLog modalValue={openModal} setOpen={setopenModal} info={info} id={id} setFavorite={favoriteGame} postData={postData} userData={userData}/>
        {newList && <ListModal click={setnewList}/>}
        {addList && <GeneralPositiveAlert text={'Added to list successfully!'}/>}
        </>
        
    )
}

export default Template; 