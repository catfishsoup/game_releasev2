import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRef } from "react"
import { UserAuth } from "../firebase/user_auth"
const Signup = () => {
    const passwordRef = useRef()
    const confirmPassword = useRef()
    const emailRef = useRef()
    const userNameRef = useRef()
    // When you use {createUser} with a bracket, you are defining an object without any values. Therefore, it will throw "undefined" error. It is best to use without bracket. 
    const createUser = UserAuth()


    const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                    await createUser(emailRef.current.value, passwordRef.current.value)
            } catch(e) {
                console.log(e)
            }
    }
    return(
        <form onSubmit={handleSubmit} className="sign-up-form">
            <label>Username</label>
            <input type='text' ref={userNameRef}/>
            <label>Email</label>
            <input type='email' ref={emailRef}/>
            <label>Password</label>
            <input  type='password' ref={passwordRef}/>
            <label>Confirm Password</label>
            <input  type='password' ref={confirmPassword}/>
            <button type='submit'>Sign Up</button>
            <label>Or Login Using:</label>
            {/* Google Email */}
        </form>
    )
}

export default Signup