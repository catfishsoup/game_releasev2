const Favorites = ({favoriteGame}) => {
    /**
     * Display all the games that user marked as 'Favorite' 
     */
       return (
        <section className='fav-sect'>
            <h1>Favorite Games</h1>
           <section className='favorite-main-sect'>
            
           {favoriteGame.map((game) => {
                        return(
                            <Picture data={game} text={'t_cover_small'} key={game.id}/>
                        )
                    })}
        </section> 
        </section>
       
        
    ) 
}