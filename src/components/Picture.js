import React from 'react'
import '../App.scss';
import { Link } from "react-router-dom";

const Picture = ({data, text}) => {
    return(
        <Link className='indv-pic-cont' to={`../games/${data.id}`} target="_blank">
            <div id={data.id}>
               <img src={data.cover?.url.replace('t_thumb', text)
                            || data.url.replace('t_thumb', text)} className='img-test' alt="game-cover"/>
                <p>{data.name}</p> 
                <div className='img-overlay'></div>
            </div>
            
        </Link>
    )
}

export default Picture; 