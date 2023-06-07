import React, { useState, useEffect } from 'react'
import gameService from '../services/gamereq.js'
import Picture from '../components/Picture.js'

const Trending = () => {
    const [trending, setTrending] = useState([])
    useEffect(() => {
        gameService.getTrending().then(data => {
          setTrending(data)
        })
      }, [])
    return(
        <section className='trending-cont'>
            <div className='cont-direct'>Trending <img src={require('../img/arrow-right.png')} alt="right-arrow"/></div>
            <section className='picture-cont'>
                {trending.map((data) => {
                    if('cover' in data) {
                        return (<Picture key={data.id} data={data} text={'t_cover_big'}/>)
                    }
                })}
            </section>
            
        </section>
    )
}

const Upcoming = () => {
    const [released, setReleased] = useState([])
    useEffect(() => {
        gameService.getReleased().then(data => {
          setReleased(data)
        })
      }, [])

    return (
        <section className='upcoming-cont'>
            <div className='cont-direct'>Upcoming <img src={require('../img/arrow-right.png')} alt="right-arrow"/></div>
           
            <div className='cont-direct'>Recently Released <img src={require('../img/arrow-right.png')} alt="right-arrow"/></div> 
            <section className='picture-cont'>
               {released.map((data) => {
                    if('cover' in data) {
                        return (<Picture key={data.id} data={data} text={'t_cover_big'}/>)
                    }
                })} 
            </section>
            
        </section>
    )
}

const Platform = () => {
    return(
        <section>
            <div>Browse by Platform</div>
        </section>
    )
}

const Games = () => {
    return(
        <section className="games-cont">
        <Trending/>
        <Upcoming/>
        <Platform/>
        </section>
    )
}

export default Games