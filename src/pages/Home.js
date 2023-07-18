import React, { useEffect, useRef, useState } from 'react'
import gameService from '../services/gamereq.js'
import Picture from '../components/Picture.js'
import '../styles/Home.scss'
import divider from '../img/wave-haikei.svg'
import { Link } from 'react-router-dom'
import search_video from '../videos/search-func.mp4'
import favoritevideo from '../videos/addfavorite.mp4'

const Home = () => {
    const [page, setPage] = useState(1)
    const sum = useRef(page)
    const getPage = (count_input) => {
        sum.current = page + count_input; 
        setPage(sum.current)
    }
       return(
        <section className='home-cont'>
            <section className='intro-cont'>
                <h1 className='home-title'>
                    <span style={{color: '#8e53bd'}}>Tr</span>ack new gam<span style={{color: '#d83e4f'}}>es</span>. <br/> 
                    Redu<span style={{color: '#b34886'}}>ce</span> your backlog. 
                    <br/> Create game collections.
                </h1>
                <p className='small-desc'>Videa got your back to conquer the 'Video Games Backlog' boss!</p>
                <Link to="/login" className='demo-btn'>Try Demo Account</Link> <Link to="/signup" className='sign-up-btn'>Get Started</Link>
            </section>

            <img src={divider} className='spacer' alt='spacer'/>
            <section className='feature-cont'>
                <h2 className='subsection-title'> Website Features</h2>
                    <button className={`left-arrow ${page !== 1 ? 'active' : 'not-active'}`}><img src={require('../img/arrow_left.png')} alt="left-arrow" onClick={() => getPage(-1)}/></button> 
                    <button className={`right-arrow ${page !== 3 ? 'active' : 'not-active'}`}><img src={require('../img/arrow-right.png')} alt="right-arrow" onClick={() => getPage(1)} /></button>
                    { page === 1 && <Discover/>}
                    { page === 2 && <Collect/>}
                    { page === 3 && <Track/>}
            </section>
        </section>
    ) 
    
}

const Discover = () => {
    const [popular, setPopular] = useState([])
    useEffect(() => {
        gameService.getPopular().then(data=> {
          setPopular(data)
        })
      }, [])

    return(
        <section className='feature-sub-sect discover-sect'>
            <section className='discover-picture-grid'>
                {popular.map((games) => {
                    return(<Picture data={games} key={games.id} text={'t_cover_big'}/>)
                })}
            </section>
            {/**/}
                <section className='desc-section'>
                    <h3 className='feature-sub-title' style={{color: '#8e53bd' }}>Discover</h3>
                    <p>
                        Powered by IGDB, Videa empowers you with the tools to navigate through a vast library of titles, genres, and platforms. 
                        Whether you're a seasoned gamer or just beginning your gaming adventures, 
                        our feature is designed to cater to every level of expertise and interest.
                    </p>

                    <p>
                    Simply enter your desired keywords, such as game titles, genres, 
                     and watch a treasure trove of gaming possibilities unfolds before your eyes. 
                    </p>
                    <button className='action-btn'>Check out game section</button>
                </section>
            </section>
    )
}

const Collect = () => {
    return(
        <section className='feature-sub-sect collect-sect'>
            <section className='collect-picture-grid'>
                <video width="676" height="640" loop autoplay="" muted>
                    <source src={search_video} type="video/mp4"/>
                </video>
            </section>
                <section className='desc-section'>
                    <h3 className='feature-sub-title' style={{color: '#8e53bd' }}>Collect</h3>
                    <p>
                        Powered by IGDB, Videa empowers you with the tools to navigate through a vast library of titles, genres, and platforms. 
                        Whether you're a seasoned gamer or just beginning your gaming adventures, 
                        our feature is designed to cater to every level of expertise and interest.
                    </p>

                    <p>
                    Simply enter your desired keywords, such as game titles, genres, 
                     and watch a treasure trove of gaming possibilities unfolds before your eyes. 
                    </p>
                </section>
            </section>
    )

}

const Track = () => {
    return(
        <section className='feature-sub-sect'>
            <section className='collect-picture-grid'>
            <video width="676" height="640" loop autoplay="" muted>
                    <source src={favoritevideo} type="video/mp4"/>
                </video>
            </section>
            <section className='desc-section'>
                <h3 className='feature-sub-title' style={{color: '#d83e4f' }}>Track</h3>
                <p>
                From beloved classics to the latest releases, our feature empowers you to effortlessly organize, monitor, and update your personal gaming library in one centralized hub.
                    </p>

                    <p>
                    Simply create a personalized account, and you'll gain access to a powerful suite of tracking tools. 
                    Add games to your collection with a few clicks, and watch as our system automatically retrieves crucial information such as title, platform, genre, and release date. 
                    No more worrying about forgotten games or misplaced discs—the days of manual lists and spreadsheets are over. 
                    </p>
            </section>
        </section>
    )
}
export default Home