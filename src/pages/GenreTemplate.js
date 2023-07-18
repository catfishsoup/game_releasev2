
import { useEffect, useMemo, useRef, useState } from 'react'
import gameService from '../services/gamereq.js'
import Picture from '../components/Picture.js'
import '../styles/Pagination.scss'
import Loading from '../components/Loading.js'
import { useParams } from 'react-router-dom'


const GenreTemplate = () => {

    const [page, setPage] = useState(1)
    const genre = useParams()
    const [content, setContent] = useState([])
    const [loading , setLoading] = useState(true)
    const [test, setTest] = useState()
    let totalPage = useRef(0); 
    let offset = useRef(0)
    //Count how many data there are and divide them into pages 
    useEffect(() => {
        //add params 
        gameService.getCount(genre.platform).then((value) => {
            totalPage.current = Math.ceil(value.count / 30)
            setLoading(false)
        })
    }, [genre.platform])

    useMemo(() => {
        setLoading(true)
        if(page >= 1 && page < 3) {
            setTest([1, 2, 3, 'DOTS', totalPage.current])
        } else if (page >= 3 && page <= totalPage.current - 3) {
            setTest([1, 'DOTS', page, 'DOTS', totalPage.current])
        } else {
           let rightRange = range(totalPage.current - 3, totalPage.current)
           setTest([1, 'DOTS', ...rightRange, totalPage.current]) 
        } 


        if(page - 1 < totalPage.current) {
            offset.current = (page - 1) * 30; 
        }
        
        gameService.getPlatforms(offset.current, genre.platform).then((value) => {
            setContent(value)
            setLoading(false)
        })
    }, [page, genre.platform])
    

    const getNextPage = () => {
        setPage(page + 1)
    }

    const getPreviousPage = () => {
        setPage(page - 1)
    }


    if(loading) {
        return <Loading/>
    }

    if(!loading) {
      return(

        <section className='platform-cont'>
        <section className="search-cont">
          {content.map((data) => {
            return(<Picture key={data.id} data={data} text={'t_cover_med_2x'} alt='game-cover'/>)
        })}  
        </section>
        
        <section className='pagination-cont'>
            <button onClick={() =>  getPreviousPage()} className='pagination-btn-l pagination-btn'>&#8592; Prev</button>
            {test.map((btn) => {
                if(btn === 'DOTS') {
                    return(<p className='dots'>...</p>)
                }
                return(<button onClick={() => setPage(btn)} className={`page-number ${page === btn ? 'active' : 'not-active'}`}>{btn}</button>)
            })}
            <button onClick={() => getNextPage()} className='pagination-btn-r pagination-btn'>Next &#8594;</button>   
        </section>
        
        </section>
        
    )  
    }
    
}

const range = (start, end) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}

export default GenreTemplate; 