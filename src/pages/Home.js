import React, { useEffect, useState } from 'react'
import gameService from '../services/gamereq.js'
import Picture from '../components/Picture.js'



const Discover = ({page}) => {
    const [gamePicture, setGamePicture] = useState([])
    useEffect(() => {
        gameService.getPopular().then(data=> {
          setGamePicture(data)
        })
      }, [])
    return (
        <section className='discover-cont'>
            <h2>Discover</h2>
            <p>Find new games from genre that you love on many platforms!</p>
            <section className='discover-img-cont'>
                {gamePicture.map((data) => {
                    if('cover' in data) {
                        return (<Picture data={data} key={data.id}/>)
                    }
                })}
            </section>
        </section>
    )
}


const Book = ({page}) => {
    if(page === 1) {
       return (
        <section>
            <h2>Find and Book</h2>
            <p>Don't want to miss the game release date? One click to save the game!</p>
            <section>
            </section>
        </section>
    ) 
    }
}

const Home = () => {
    const [page, setPage] = useState(0) 
       return(
        <main className='home-cont'>
            <section className='intro-cont'>
                <img src={require('../img/gamepad.png')} alt="console-picture" className='decor-img'/>
                <img src={require('../img/console.png')} alt="console-picture" className='decor-img2'/>
                <h1 className='home-title'><span style={{color: '#d83e4f'}}>Track</span> new games<br/> and <br/> <span style={{color: '#b34886'}}>reduce</span> your backlog</h1>
                <p><small>Tired of keeping track of games via multiple platform? Or your games backlog is getting bigger every year? Don't worry we got your back.</small>
                </p>
                <button>Get Started</button>
            </section>
            
            <section className='toggle-container'>
                <div className='toggle-btn'><button><img src={require('../img/arrow_left.png')} alt="left-arrow"/></button> 
                    <button><img src={require('../img/arrow-right.png')} alt="right-arrow"/></button>
                </div>
                <Discover page={page}/>
                <Book page={page}/>
            </section>
        </main>
    ) 
    
}

export default Home