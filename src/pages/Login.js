import { Link, Navigate } from "react-router-dom";
import { UserAuth } from "../firebase/user_auth"
import { useEffect, useRef, useState } from "react"

const Login = () => {
    const passwordRef = useRef()
    const emailRef = useRef()

    const {loginUser, user} = UserAuth()
    const [isLogged, setLogged] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await loginUser(emailRef.current.value, passwordRef.current.value)
         } catch(e) {
            console.log(e)
        }
    }
    useEffect(() => {
            if(user) {
                setLogged(true)
            } else {
                setLogged(false)
            }
        }, [])
    return(
        <>
        {/* Improve: Navigate to previous location */}
        {isLogged && <Navigate to="/home" replace={true}/>}
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type='email' ref={emailRef}/>

            <label>Password</label>
            <input ref={passwordRef} type='password'/>
            <button type="submit">Login</button>

            <Link to="/signup">
            <button>Sign Up</button>
            </Link>
        </form>

        <small>
            For demo purposes:
            User name: demo@gmail.com
            Password: 123456
        </small>
        </>
        
    )
}

export default Login