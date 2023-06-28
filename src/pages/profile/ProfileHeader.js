import { UserAuth } from '../../firebase/user_auth';
import { ref, getDownloadURL } from "firebase/storage";
import styled from 'styled-components'
import cover from '../../img/cover_test.jpg'
import user_pfp from '../../img/user.png'
import {storage} from '../../firebase/firebase.js'
import { useState, useEffect } from 'react';
const ProfileHeaderStyled = styled.section`
    background: url(${props => props.$cover_pic});
    position: relative;
    padding: 7rem;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`
const ProfilePicture = styled.div` 
    background: url(${props => props.$pfp_pic});
    width: 160px;
    height: 160px;
    background-size: contain;
    display: inline-block;
    margin-right: 1em;
    vertical-align: bottom;
    border-radius: 5px 5px 0px 0px;
`

const ProfileHeader = () =>  {  
    const { user } = UserAuth()
    const [coverPicture, setcoverPicture] = useState()
    useEffect(() => {
        getDownloadURL(ref(storage, `${user.uid}/cover/user_cover.jpg`)).then((url) => {
            setcoverPicture(url)
        }).catch((e) => {console.log(e)})
    }, [])
    return(
        <ProfileHeaderStyled $cover_pic={coverPicture || cover}>
            <div className='user-asset'>
               <ProfilePicture $pfp_pic={user.photoURL || user_pfp}/>   
               <h1 className='user-name'>{user.displayName}</h1> 
            </div>
        </ProfileHeaderStyled>
    )
}

export default ProfileHeader