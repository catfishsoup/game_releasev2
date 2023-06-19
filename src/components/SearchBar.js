import { useEffect, useRef } from "react"
import {useNavigate } from "react-router-dom";
const SearchBar = () => {
    const inputRef = useRef()
    const navigate = useNavigate()
    const directPage = (e) => {
        if(e?.key === 'Enter') {
            navigate(`../search/${inputRef.current.value}`)
        }
        
    }

    useEffect(() => {
        directPage()
    }, [directPage])

    return(
        <input placeholder='Search for game' ref={inputRef} type="text" onKeyDown={(e) => directPage(e)}/>
    )
}

export default SearchBar