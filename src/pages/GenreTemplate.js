
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import gameService from '../services/gamereq.js'
import Picture from '../components/Picture.js'
import '../styles/Pagination.scss'
import Loading from '../components/Loading.js'
import Pagination from '../components/Pagination.js'


const GenreTemplate = () => {

    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [loading , setLoading] = useState(true)
    const [test, setTest] = useState()
    let totalPage = useRef(0); 
    let offset = useRef(0)
    //Count how many data there are and divide them into pages 
    useEffect(() => {
        gameService.getCount().then((value) => {
            totalPage.current = Math.ceil(value.count / 30)
        })
    }, [])

    const paginationRange = useMemo(() => {
        setLoading(true)
        if(page >= 1 && page < 3) {
            setTest([1, 2, 3, 'DOTS', totalPage.current])
        } else if (page >= 3 && page <= totalPage.current - 3) {
            setTest([1, 'DOTS', page, 'DOTS', totalPage.current])
        } else {
           let rightRange = range(totalPage.current - 3, totalPage.current)
           setTest([1, 'DOTS', ...rightRange]) 
        } 


        if(page - 1 < totalPage.current) {
            offset.current = (page - 1) * 30; 
        }
        
        gameService.getPlatforms(offset.current).then((value) => {
            setContent(value)
            setLoading(false)
        })
    }, [page])
    

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
            <button onClick={() =>  getPreviousPage()} className='pagination-btn'>Previous</button>
            {test.map((btn) => {
                if(btn === 'DOTS') {
                    return(<button>...</button>)
                }
                return(<button onClick={() => setPage(btn)}>{btn}</button>)
            })}
            <button onClick={() => getNextPage()} className='pagination-btn'>Next</button>   
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