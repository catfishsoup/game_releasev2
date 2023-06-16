import { useEffect, useRef } from "react"
import { Link, Redirect, Navigate, useNavigate } from "react-router-dom";
const SearchBar = () => {
    const inputRef = useRef()
    const navigate = useNavigate()
    const directPage = (e) => {
        if(e.key === 'Enter') {
            navigate(`../search/${inputRef.current.value}`)
        }
        
    }

    return(
        <input placeholder='Search for game' ref={inputRef} type="text" onKeyDown={(e) => directPage(e)}/>
    )
}

export default SearchBar