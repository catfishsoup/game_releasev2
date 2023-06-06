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
        <form onSubmit={handleSubmit} className="sign-up-form">
            <label>Username</label>
            <input type='text' ref={userNameRef} required/>
            <label>Email</label>
            <input type='email' ref={emailRef} required/>
            <label>Password</label>
            <input  type='password' ref={passwordRef} required/>
            <label>Confirm Password</label>
            <input  type='password' ref={confirmPassword} required/>
            <button type='submit'>Sign Up</button>
            <label>Or Login Using:</label>
            {/* Google Email */}
        </form>
    )
}

export default Signup