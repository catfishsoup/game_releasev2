import { Link } from "react-router-dom";
import { UserAuth } from "../firebase/user_auth"
import { useRef } from "react"

const Login = () => {
    const passwordRef = useRef()
    const emailRef = useRef()

    const {loginUser} = UserAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await loginUser(emailRef.current.value, passwordRef.current.value)
         } catch(e) {
            console.log(e)
        }

    }
    return(
        <>
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

        <small>For demo purposes:
            User name: test@gmail.com
            Password: 123456
        </small>
        </>
        
    )
}

export default Login