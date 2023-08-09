import { useCallback } from "react";
import { useEffect, useRef } from "react"
import {useNavigate } from "react-router-dom";

const SearchBar = () => {
    const inputRef = useRef()
    const navigate = useNavigate()
    const directPage = useCallback((e) => {
        if(e?.key === 'Enter') {
            navigate(`../search/${inputRef.current.value}`)
            inputRef.current.value = ''
        }
    }, [navigate])

    useEffect(() => {
        directPage()
    }, [directPage])

    return(
        <input className="search-bar" placeholder='Search for game' ref={inputRef} type="text" onKeyDown={(e) => directPage(e)}/>
    )
}

export default SearchBar