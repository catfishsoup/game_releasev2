
import '../styles/Settings.scss'
import { useRef, useState } from 'react'; 
import { UserAuth } from "../firebase/user_auth"
import { updateProfile } from "firebase/auth"
import {GeneralPositiveAlert} from '../components/Alert.js'
const Settings = () => {
    /**
     * Allow user to: change user name, profile picture, email, password, delete the account. 
     **/
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmpasswordRef = useRef()
    const { user, updateEmailForCurrentUser, updateuserPassword, delUser, uploadPicture} = UserAuth()
    const [activeButton, setactiveButton] = useState([ 
        {id: 1, active: false,}, 
        {id: 2, active: false,}, 
        {id: 3, active: false,}, 
        {id: 4, active: false,}, 
        {id: 5, active: false,},])

    const [profileImage, setProfileImage] = useState()
    const [coverImage, setCoverImage] = useState()
    const [alertText, setalertText] = useState('')
    const [openAlert, setopenAlert] = useState(false)

    const toggleButton = (id) => {
        const newArray = activeButton.map(button => {
            if(button.id === id) {
              return {...button, active: true}
            }
            return button
          })
          setactiveButton(newArray)
    }

    // User Func down here
    const userSettings = (e, id) => {
        // * Re-authenticate the user first then switch. 
        // * Validate user input
        e.preventDefault()
        switch(id) {
            case 1: 
            updateProfile(user, {displayName: usernameRef.current.value}); 
            setalertText('User name updated successfully!')
            case 2: 
            updateEmailForCurrentUser(emailRef.current.value)
            setalertText('Email updated successfully!')
            break;

            case 3: 
            updateuserPassword(confirmpasswordRef.current.value)
            setalertText('Password updated successfully!')
            break;

            case 4: 
            uploadPicture(profileImage, 'pfp', 'user_pfp.jpg');
            setalertText('Profile picture updated successfully!')
            break;

            case 5: uploadPicture(coverImage, 'cover', 'user_cover.jpg');
            setalertText('Cover picture updated successfully!')
            break;
        }
        setopenAlert(true)

        setTimeout(() => {
            setopenAlert(false)
        }, 2000)
    }

    const delUserProfile = (e) => {
        e.preventDefault()
        // Create a pop-up confirmation. 
        delUser()
    }
      return (
        <section className="settings">
            <section className='acct-setting-sect'>
              <h1>Account Settings</h1>
                    <div>
                        <label>Username</label>
                        <input ref={usernameRef} onFocus={() => toggleButton(1)} defaultValue={user.displayName}/> 
                        <button type="button" onClick={(e) => userSettings(e, 1)} className={`save-btn ${activeButton[0].active === true ? 'active' : 'hidden'}`} >Save User Name</button>
                    </div>
                    
                    <div>
                        <label>Email</label>
                        <input ref={emailRef} onFocus={() => toggleButton(2)} defaultValue={user.email}/>  
                        <button onClick={(e) => userSettings(e, 2)} className={`save-btn ${activeButton[1].active === true ? 'active' : 'hidden'}`}>Save Email</button>
                    </div>
                    
                    <div>
                        <label>Change Password</label>
                        <input placeholder='New Password' ref={passwordRef}/>
                        <input placeholder='Confirm New Password' ref={confirmpasswordRef} onFocus={() => toggleButton(3)}/> 
                        <button type="button" onClick={(e) => userSettings(e, 3)} className={`save-btn ${activeButton[2].active === true ? 'active' : 'hidden'}`}>Save Password</button> 
                    </div>
                    
 
            </section>
            
            {/**/}
                <section className='profile-setting-sect'>
                <h1>Profile Settings</h1>
                    <div>
                     <label>Change Profile Picture</label>
                    <input type="file" onFocus={() => toggleButton(4)} onChange={(e) => setProfileImage(e.target.files[0])}/>
                    <button type="button" onClick={(e) => userSettings(e, 4)} className={`save-btn ${activeButton[3].active === true ? 'active' : 'hidden'}`}>Save Profile Picture</button>   
                    </div>
                    
                    <div>
                     <label>Change Cover Picture</label>
                    <input type="file" onFocus={() => toggleButton(5)} onChange={(e) => setCoverImage(e.target.files[0])}/>
                    <button type="button" onClick={(e) => userSettings(e, 5)} className={`save-btn ${activeButton[4].active === true ? 'active' : 'hidden'}`}>Save Cover Picture</button>   
                    </div>
                    
                </section>
                

                <section className='delete-setting-sect'>
                <h1>Delete Account</h1>
                <p style={{color: '#d83e4f', marginTop: '1em'}}>Warning! This will permanently delete all your account data.</p>
                    <button type="button" onClick={(e) => delUserProfile(e)} className='delete-account-btn' >Delete User Account</button>
 
                </section>
                {openAlert && <GeneralPositiveAlert text={alertText}/>}
        </section>
    )  
    }
    

export default Settings