import styled from 'styled-components'

const PositiveAlert = styled.p`
    background-color: #90EE90;
    color: #03C03C;
    position: absolute; 
    top: 5%; 
    z-index: 2;
    padding: 1rem;
    width: 20ch;
    border-radius: 5px;
`

export const AddedFavorite = ({favoriteStatus}) => {
    if(favoriteStatus === true) {
       return(
        <PositiveAlert className="alert-pass">Added to favorites</PositiveAlert>
    ) 
    } else {
        return (<p>Removed from favorites</p>)
    }
}


export const SettingAlert = ({text, openAlert}) => {
      return(
        <PositiveAlert>{text} updated!</PositiveAlert>
    )  

    
}

export const SettingFailedAlert = ({text}) => {
    return(
        <p>{text} update failed! Please try again.</p>
    )
}