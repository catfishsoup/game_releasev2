import React, { useEffect, useState } from 'react'
import gameService from '../services/gamereq.js'
import Picture from '../components/Picture.js'
import '../styles/Home.scss'
import divider from '../img/wave-haikei.svg'



const Home = () => {
       return(
        <section className='home-cont'>
            <section className='intro-cont'>
                <h1 className='home-title'>Track new games. <br/> Reduce your backlog. <br/> Create game collections.</h1>
                <p className='small-desc'>Videa got your back to conquer the 'Video Games Backlog' boss!</p>
               <button className='demo-btn'>Try Demo Account</button> <button className='sign-up-btn'>Get Started</button>
            </section>

            <img src={divider} className='spacer'/>
            <section className='feature-cont'>
                <h2 className='subsection-title'> Website Features</h2>
                    <button className='left-arrow'><img src={require('../img/arrow_left.png')} alt="left-arrow" /></button> 
                    <button className='right-arrow'><img src={require('../img/arrow-right.png')} alt="right-arrow" /></button>
                    <Discover/>
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
                    <button className='action-btn'>Check out the game section</button>
                </section>
            </section>
    )
}

const Collect = () => {
    return(
        <section className='feature-sub-sect'>
            <section>
            </section>
                <section>
                    <h3>Collect</h3>
                </section>
            </section>
    )

}

const Track = () => {
    return(
        <section className='feature-sub-sect'>
            <section>
                <h3>Track</h3>
            </section>
        </section>
    )
}
export default Home