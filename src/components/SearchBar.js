import { useRef } from "react"
import { Link, Redirect, Navigate, useNavigate } from "react-router-dom";
const SearchBar = () => {
    const inputRef = useRef()
    const navigate = useNavigate()
    const directPage = (e) => {
        if(e.key === 'Enter') {
            console.log(inputRef)
            navigate(`../search/${inputRef}`)
        }
        
    }


    return(
        <input placeholder='Search...' ref={inputRef} onKeyDown={(e) => directPage(e)}/>
    )
}

export default SearchBar