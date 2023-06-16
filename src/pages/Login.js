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

        const demoLogin = () => {
            emailRef.current.value = 'demo@gmail.com'
            passwordRef.current.value = '123456'
        }
    return(
        <>
        {/* Improve: Navigate to previous location */}
        {isLogged && <Navigate to="/home" replace={true}/>}
        <section>
            
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Nice seeing you again</h1>
                
            <div>
                <label>Email</label>
                <input type='email' ref={emailRef} placeholder='Email' required/>  
            </div>
            
            <div>
                <label>Password</label>
                <input ref={passwordRef} type='password' placeholder="Password" required/>   
            </div>
            
            <button type="submit" className="submit-btn"><span>Login</span></button>

            <div className="sign-up-sect">
            <div>Don't have an account? <Link to="/signup">Sign Up</Link></div>
            </div>
            <section className="demo-account">
                <small style={{display: 'block', textAlign: 'center'}}>Or login with</small>
                <button className="btn" onClick={() => demoLogin()}>Demo Account</button>
                <button type="button">Google</button>
            </section>
            
        </form>
        </section>
        

        
        </>
        
    )
}

export default Login