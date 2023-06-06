import {useParams} from "react-router-dom";
import { useEffect, useState } from 'react'
import gameService from '../services/gamereq.js'
import '../styles/Template.scss'
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

const Status = ({logged}) => {
    // If user is not logged in, display the 'Log In to Bookmark' 
    // Else, check the bookmark status of this game from the user profile. 

}
const Template = () => {

    // Use Params - take in the param in the URL as data to use. Have to use the same param  define in path. 
    let { id } = useParams();
    const [info, setInfo] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        gameService.getCurrent(id).then(data => {
         setInfo(data)
         setLoading(false)
        })
      }, [])
    // Once we get the id, fetch the data to display under here 
    if(loading) {
        return <>Loading...</>
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
                <button> ❤️ Add as Favorite</button>
                <button> + Add to List</button>
            </section>
        </main>
    )
}

export default Template; 