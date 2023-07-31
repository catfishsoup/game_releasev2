import { useState } from "react"
import { UserAuth } from "../firebase/user_auth"
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const {createUser} = UserAuth()
    const nav = useNavigate()

    const [usernameMatch, setusernameMatch] = useState({value: '', valid: null})
    const [emailMatch, setemailMatch] = useState({value: '', valid: null})
    const [passwordMatch, setpasswordMatch] = useState({password: {value: '', valid: null}, confirm: {value: ''}})
    const handleSubmit = (e) => {
            e.preventDefault()
            if(usernameMatch.valid === false && emailMatch.value === false && passwordMatch.password.value === passwordMatch.confirm.value) {
               createUser(emailMatch.value, passwordMatch.confirm.value, usernameMatch.value)
               nav('/home', {replace: true})   
            }
                  
    }

    const usernameValidation = (name) => {
        if(!/[0-9a-zA-Z]{6}/.test(name)) {
            setusernameMatch({...usernameMatch, valid: false})
        } else {
            setusernameMatch({value: name, valid: true})
        }
    }

    const emailValidation = (email) => {
        if(!/^\S+@\S+\.\S+$/.test(email)) {
            setemailMatch({...emailMatch, valid: false})
        } else {
            setemailMatch({value: email, valid: true})
        }
    }

    const passwordValidation = (password_value) => {
        if(!/[0-9a-zA-Z]{6,}/.test(password_value)) {
            setpasswordMatch({...passwordMatch, password: {value: '', valid: false}})
        } else {
            setpasswordMatch({...passwordMatch, password: {value: password_value, valid: true}})
        }

        console.log(passwordMatch)
    }
    return(
        <section>
            <form className="user-form">
            <h1>Sign Up</h1>
            <div>
                <label>Username</label>
                <input type='text' onChange={(e) => usernameValidation(e.target.value)} pattern="[0-9a-zA-Z]{6}" required/>   
                {usernameMatch.valid === false && <small style={{color: 'red'}}>Username must be at least 6 characters in length.</small>}
            </div>
            
            <div>
                <label>Email</label>
                <input type='email' onChange={(e) => emailValidation(e.target.value)} pattern="/^\S+@\S+\.\S+$/" required/>   
                {!emailMatch.valid === false && <small style={{color: 'red'}}>Email must be in format of value@value.com</small>}
            </div>
            
            <div>
              <label>Password</label>
                <input type='password' title="Password must be at least 6 character long" pattern="[0-9a-zA-Z]{6}" onChange={(e) => passwordValidation(e.target.value)} required/>  
                {passwordMatch.password.valid === false && <small style={{color: 'red'}}>Password must be 6 character longs and contain no special characters</small>}
            </div>
            
            <div>
              <label>Confirm Password</label>
                <input type='password' pattern="[0-9a-zA-Z]{6}" onChange={(e) => setpasswordMatch({...passwordMatch, confirm: {value: e.target.value}})}required/> 
                {passwordMatch.password.value !== passwordMatch.confirm.value && <small style={{color: 'red'}}>Confirm password doesn't match. Please double check.</small> }
            </div>
            
            <button onClick={(e) => handleSubmit(e)} className="submit-btn">Sign Up</button>
        </form>
        </section>
        
    )
}

export default Signup