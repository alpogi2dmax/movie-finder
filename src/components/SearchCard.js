import { Link } from 'react-router-dom'
import poster_photo from './poster_photo.png'

function SearchCard(props) {

    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const day = props.movie.release_date.slice(8)
    const month = props.movie.release_date.slice(5,7)
    const year = props.movie.release_date.slice(0,4)


    return (
        <div className='search-card'>
            <Link to={`/movie/${props.movie.id}`}>
                <img 
                    className='search-image'
                    src={props.movie.poster_path
                        ? `https://image.tmdb.org/t/p/w780${props.movie.poster_path}` 
                        : poster_photo
                    } 
                    alt={props.movie.original_title}
                />
            </Link>
            <div className='search-text-container'>
                <h2>{props.movie.original_title}</h2>
                <p>{monthList[parseInt(month) - 1]} {day}, {year}</p>
                <p>{props.movie.overview}</p>
            </div>
        </div>
    )
}

export default SearchCard