import { Link } from 'react-router-dom'

function MovieCard(props) {

    console.log(props.movie)

    return (
        <div className='movie-card'>
            <Link to={`/movie/${props.movie.id}`}>
                <div className='image-container'>
                    <img 
                        src={`https://image.tmdb.org/t/p/w780${props.movie.poster_path}`} 
                        alt={props.movie.original_title}
                    />
                    <div className='score'>
                        {Math.round(props.movie.vote_average * 10)}%
                    </div>
                </div>
            </Link>
            <h4>{props.movie.original_title}</h4>
            <p>{props.movie.release_date}</p>
        </div>
    )
}

export default MovieCard