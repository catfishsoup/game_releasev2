import { useEffect, useState } from 'react';
import userService from '../../firebase/user_request'
import gameService from '../../services/gamereq'
const ListThumbnail = ({data}) => {
    
    
    
    const [url, setUrl] = useState()
    useEffect(() => {
        let collectkeys = [];
        if(data.games !== undefined) {
       collectkeys = Object.keys(data.games) 
       
       gameService.getPicture(collectkeys[0]).then((data) => {
            setUrl(data)
        })
    }
        
    }, [])

    return(
        <div>
        <p>{data.name}</p>
        <p>{data.count || '0'}</p>
        </div>
    )
}



const ProfileList = () => {
    /**
     * List will includes 'Default' List and User generated Lists. 
     **/ 
    const [list, setList] = useState([])
    const [load, setLoad] = useState(true)
    useEffect(() => {
            userService.fetchLists().then((result) => {
                setList(result)
            }) 
            setTimeout(() => {
                setLoad(false)
            }, 2000)
    },[])

    if(!load) {
         return (
        <section className='list-section'>
            <div>Lists</div>
            {list.map((data) => {
                return(<ListThumbnail data={data}/>)
            })}
        </section>
    ) 
    }
          
}

export default ProfileList