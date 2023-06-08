import {useParams} from "react-router-dom";
import {useEffect, useState} from 'react'
import Picture from '../components/Picture'
import gameService from '../services/gamereq.js'
import '../App.scss'
const Search = () => {
    const { name } = useParams();
    const [game, setGame] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        gameService.searchGame(String(name)).then(data => {
         setGame(data)
         setLoading(false)
        })
      }, [])

      if(loading) {
        return <>Loading...</>
    }
        return (
            <> 
            <h1>Search result: {name}</h1>
            <section className='search-cont'>
               {game.map((data) => {
                    if('cover' in data) {
                        return (<Picture key={data.id} data={data} text={'t_cover_big'}/>)
                    }
                })}
            </section>
            </>
           
        )
}

export default Search;