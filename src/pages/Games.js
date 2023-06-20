import React, { useState, useEffect, useCallback } from 'react'
import gameService from '../services/gamereq.js'
import Picture from '../components/Picture.js'
import '../styles/Games.scss'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import computer from '../img/computer.svg'
import switch_con from '../img/switch-fill.svg'
import xbox from '../img/xbox-fill.svg'
import playstation from '../img/playstation-fill.svg'
import arrow from '../img/arrow.svg'
const Trending = ({trending}) => {
         return(
        <section className='trending-cont'>
            <h1 className='cont-direct'>Trending Games <img src={require('../img/arrow-right.png')} alt="right-arrow"/></h1>
            <section className='trending-img'>
                <div className='child-1'>
                    <img src={trending[0].cover.url.replace('t_thumb', 't_cover_big')}/>
                </div>
                <div className='child-3'>See More</div>
                <div className='child-2'>
                <img src={trending[3].cover.url.replace('t_thumb', 't_cover_big')}/>
                <img src={trending[1].cover.url.replace('t_thumb', 't_cover_big')}/>
                </div>
                <div className='child-4'>
                    <img src={trending[5].cover.url.replace('t_thumb', 't_screenshot_med')}/>
                </div>

                
            </section>
        </section>
    )
   
}

const Upcoming = ({upcoming}) => {
    return (
        <section className='upcoming-sect'>
            <h1>Upcoming</h1> 
            <section>
            {upcoming.map((picture, index) => {
                    if(index === 0) {
                        return(<Picture data={picture} text={'t_screenshot_med_2x'}/>)
                    } else {
                        return(<Picture data={picture} text={'t_cover_big_2x'}/>)
                    }
                }
                    
                )}
            </section>
        </section>
    )
}

const Platform = () => {
    return(
        <section className='platform-sect'>
            <h1>Browse by Platform</h1>
            <section className='platform-card-sect'>
                <div style={{background: '#695ef5'}} className='platform-card'>
                <img className='card-icon' src={xbox} alt='platform-icon'/>
                    <small className='card-count'>01</small>
                    <h2 className='card-title'>Xbox</h2>
                    <Link className='card-link' to='/games/PC'>View More <img src={arrow}/></Link>   
                </div>
                <div style={{background: '#8e53bd'}} className='platform-card'>
                <img className='card-icon' src={playstation} alt='platform-icon'/>
                    <small className='card-count'>02</small>
                   <h2 className='card-title'>Playstation</h2> 
                   <Link className='card-link' to='/games/PC'>View More <img src={arrow}/></Link> 
                </div>
                <div style={{background: '#b34886'}} className='platform-card'>
                    <small className='card-count'>03</small>
                    <img className='card-icon' src={switch_con} alt='platform-icon' />
                    <h2 className='card-title'>Switch</h2>
                    <Link className='card-link' to='/games/PC'>View More <img src={arrow}/></Link> 
                </div>
                <div style={{background: '#d83e4f'}} className='platform-card'>
                    <small className='card-count'>04</small>
                    <img className='card-icon' src={computer} alt='platform-icon'/>
                    <h2 className='card-title'>PC</h2>
                    <Link className='card-link' to='/games/PC'>View More <img src={arrow}/> </Link>           
                </div>  
            </section>
            
        </section>
    )
}

const Release = ({release}) => {
      return (
        <section className='release-sect'>
            <h1>Recently Released</h1> 
            <section >
                {release.map((picture, index) => {
                    if(index === 0) {
                        return(<Picture data={picture} text={'t_screenshot_med_2x'}/>)
                    } else {
                        return(<Picture data={picture} text={'t_cover_big_2x'}/>)
                    }
                }
                    
                )}
            </section>
        </section>
        
      )
      
      
}

const Games = () => {

    const [trending, setTrending] = useState([])
    const [released, setReleased] = useState([])
    const [loading, setLoading] = useState(true)
    const [upcoming, setUpcoming] = useState([])
    // const [platform, setPlatform] = useState([])

   async function fetchData() {
        const getTrending = gameService.getTrending().then((value) => {
            setTrending(value)
        })
        const getReleased = gameService.getReleased().then((value) => {
            setReleased(value)
        })

        const getUpcoming = gameService.getIncoming().then((value) => {
            setUpcoming(value)
        })

        const results = await Promise.all([getReleased, getTrending, getUpcoming]).then(() => {
                setLoading(false)
                console.log('Done :3')
        }).catch((e) => console.log(e))
    }

    useEffect(() => {
        fetchData()
    }, [loading])
       
if(loading) {
    return <>Loading...</>
}
if(loading === false ) {
     return(
        <section className="games-cont">
        <Trending trending={trending}/>
        <Release release={released}/>
        <Upcoming upcoming={upcoming}/>
        <Platform/>
        
        </section>
    )
}
   
}

export default Games