import styled from 'styled-components'

const PositiveAlert = styled.p`
    background-color: #90EE90;
    color: #03C03C;
    position: absolute; 
    top: 5%; 
    z-index: 2;
    padding: 1rem;
    width: fit-content;
    border-radius: 5px;
`
const FalseAlert = styled.p`
    background-color: #999999;
    color: white;
    position: absolute; 
    top: 5%; 
    z-index: 2;
    padding: 1rem;
    width: fit-content;
    border-radius: 5px;
`
export const AddedFavorite = ({favoriteStatus}) => {
    if(favoriteStatus === true) {
       return(
        <PositiveAlert className="alert-pass">Added to favorites</PositiveAlert>
    ) 
    } else {
        return (<FalseAlert>Removed from favorites</FalseAlert>)
    }
}


export const SettingAlert = ({text}) => {
      return(
        <PositiveAlert>{text} updated!</PositiveAlert>
    )    
}

export const ListAlert = ({text}) => {
    return(
      <PositiveAlert>List '{text}' created successfully! The page will be refresh shortly.</PositiveAlert>
  )    
}

export const FailedAlert = ({text}) => {
    return(
        <FalseAlert>{text}</FalseAlert>
    )
}