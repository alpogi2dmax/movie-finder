function MovieInfo(props) {

    console.log(props.movie)

    const getLanguageName = (code) => {
    try {
        const languageName = new Intl.DisplayNames(['en'], { type: 'language' })
        return languageName.of(code)
    } catch {
        return code // fallback if not supported
    }
}

    return (
        <div className='movie-info-container'>
            <div className='movie-info-block'>
                <h4>Status</h4>
                <p>{props.movie.status}</p>
            </div>
            <div className='movie-info-block'>
                <h4>Original Language</h4>
                <p>{getLanguageName(props.movie.original_language)}</p>
            </div>
            <div className='movie-info-block'>
                <h4>Budget</h4>
                <p>{props.movie.budget.toLocaleString()}</p>
            </div>
            <div className='movie-info-block'>
                <h4>Revenue</h4>
                <p>{props.movie.revenue.toLocaleString()}</p>
            </div>
            
            
            

        </div>
    )
}

export default MovieInfo