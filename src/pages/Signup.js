import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRef } from "react"
import { UserAuth } from "../firebase/user_auth"
const Signup = () => {
    const passwordRef = useRef()
    const confirmPassword = useRef()
    const emailRef = useRef()
    const userNameRef = useRef()
    // When you use {createUser} with a bracket, you are defining an object without any values. Therefore, it will throw "undefined" error. It is best to use without bracket. 
    const {createUser} = UserAuth()


    const handleSubmit = (e) => {
            e.preventDefault()
            createUser(emailRef.current.value, passwordRef.current.value, userNameRef.current.value)
    }
    return(
        <section>
            <form onSubmit={handleSubmit} className="user-form">
            <h1>Sign Up</h1>
            <div>
                <label>Username</label>
                <input type='text' ref={userNameRef} required/>   
            </div>
            
            <div>
                <label>Email</label>
                <input type='email' ref={emailRef} required/>   
            </div>
            
            <div>
              <label>Password</label>
                <input  type='password' ref={passwordRef} required/>  
            </div>
            
            <div>
              <label>Confirm Password</label>
                <input  type='password' ref={confirmPassword} required/>  
            </div>
            
            <button type='submit' className="submit-btn">Sign Up</button>
        </form>
        </section>
        
    )
}

export default Signup