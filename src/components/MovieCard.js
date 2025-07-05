import { Link } from 'react-router-dom'

function MovieCard(props) {

    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const day = props.movie.release_date.slice(8)
    const month = props.movie.release_date.slice(5,7)
    const year = props.movie.release_date.slice(0,4)


    console.log(year)


    return (
        <div className='movie-card'>
            <Link to={`/movie/${props.movie.id}`}>
                <div className='image-container'>
                    <img 
                        src={`https://image.tmdb.org/t/p/w780${props.movie.poster_path}`} 
                        alt={props.movie.original_title}
                    />
                    <div 
                        className='score'
                        style={{
                            borderColor: 
                                props.movie.vote_count === 0 ?
                                'black' : 
                                props.movie.vote_average > 7.5 ? 
                                'green' : 
                                props.movie.vote_average > 5 ?
                                'orange' :
                                'red'
                        }}
                    >
                        {props.movie.vote_count > 0 && Math.round(props.movie.vote_average * 10)}
                    </div>
                </div>
            </Link>
            <div className='movie-card-text'>
                <h4>{props.movie.original_title}</h4>
                <p>{monthList[parseInt(month) - 1]} {day}, {year}</p>
            </div>
        </div>
    )
}

export default MovieCard