
import '../styles/Settings.scss'

const Settings = () => {
    /**
     * Allow user to: change user name, profile picture, email, password, delete the account. 
     **/

      return (
        <section className="settings">
            <section className='acct-setting-sect'>
              <h1>Account Settings</h1>
            <form>
                    <div>
                        <label>Username</label>
                        <input/> 
                    </div>
                    
                    <div>
                        <label>Email</label>
                        <input/>  
                    </div>
                    
                    <div>
                        <label>Change Password</label>
                        <input placeholder='New Password'/>
                        <input placeholder='Confirm New Password'/>  
                    </div>
                    
                </form>  
            </section>
            
            {/**/}
                <section className='profile-setting-sect'>
                <h1>Profile Settings</h1>
                    <label>Change Profile Picture</label>
                    <input type="file"/>

                    <label>Change Cover Picture</label>
                    <input type="file"/>
 
                </section>
                
            
        </section>
    )  
    }
    

export default Settings