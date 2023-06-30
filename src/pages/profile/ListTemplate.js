
import { useParams, Link } from "react-router-dom"
import { UserAuth } from "../../firebase/user_auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import '../../App.scss'
const DisplayList = ({data, loading}) => {
    if(!loading) {
      return(
        <>
        {Object.entries(data).map((key) => {
            return(
                <Link className='indv-pic-cont' to={`../games/${key}`} target="_blank">
                    <div id={key}>
                       <img src={key[1].url.replace('t_thumb','t_cover_small')} className='img-test' alt="game-cover"/>
                        <p>{key[1].name}</p> 
                        <div className='img-overlay'></div>
                    </div>
                </Link>
            )
        })}
        
        </>
    )  
    }
    
}
const ListTemplate = () => {
    const { list_name } = useParams()
    const { user } = UserAuth()
    const [gameList, setgameList] = useState([])
    const [loading, setLoading] = useState(true)
    const query = doc(db, `users/${user.uid}/lists/${list_name}`)
    useEffect(() => {
        getDoc(query).then((snapshot) => {
              setgameList(snapshot.data())
              setLoading(false)
        }).catch((e) => console.log(e))
    }, [])
    return (
        <>
          <h1 className='sub-page-title'><Link to={`../profile/${user.displayName}/lists`} className="list-link">Lists</Link> / <Link className="list-link">{`${gameList.name}`}</Link> </h1> 
          <section className="sub-list-sect">
            <DisplayList data={gameList.games} loading={loading}/>
          </section>
        </>
    )
}

export default ListTemplate