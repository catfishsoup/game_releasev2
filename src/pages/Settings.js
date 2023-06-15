const Settings = ({click}) => {
    /**
     * Allow user to: change user name, profile picture, email, password, delete the account. 
     **/
    if(click === 4) {
      return (
        <section>
            <form>
                <div>
                    Account Settings
                    <label>Username</label>
                    <input/>

                    <label>Email</label>
                    <input/>

                    <label>Change Password</label>
                    <input placeholder='New Password'/>
                    <input placeholder='Confirm New Password'/>
                </div>
                
                <div>
                    Profile
                    <label>Change Profile Picture</label>
                    <input type="file"/>

                    <label>Change Cover Picture</label>
                    <input type="file"/>
                </div>
            </form>
        </section>
    )  
    }
    
}
