import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Cast from './Cast'
import Reviews from './Reviews'
import MovieInfo from './MovieInfo'
import tmdb from '../api/tmdb'
import poster_photo from './poster_photo.png'

function MovieDetails() {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [cast, setCast] = useState([])
    const [crew, setCrew] = useState([])
    const [reviews, setReviews] = useState([])


    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await tmdb.get(`/movie/${id}`)
                const castResponse = await tmdb.get(`/movie/${id}/credits`)
                const reviewResponse = await tmdb.get(`/movie/${id}/reviews`)
                setMovie(response.data)
                setCast(castResponse.data.cast)
                setCrew(castResponse.data.crew)
                setReviews(reviewResponse.data.results)

            } catch (err) {
                console.error('Failed to fetch movie details:', err)
            }
        }
        fetchMovie()
    }, [id])

    if (!movie) return <p>Loading...</p>

    const crewDisplay = crew.filter(c => c.job === 'Director' || c.job === 'Screenplay' || c.job === 'Writer' || c.job === 'Characters')

    return (
        <>
            {/* <Link to={'/'}>
                <h4>back</h4>
            </Link> */}
            <div 
                className='movie-details'
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`
                }}
            >
                <div className='movie-overlay'></div>
                <div className='movie-content'>
                    <img
                        className="poster-image"
                        src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                            : poster_photo
                        }
                        alt={movie.original_title}
                    />
                    <div className='movie-text'>
                        <h1>{movie.original_title} <span>({movie.release_date.slice(0, 4)})</span></h1>
                        <div className='genre-line'>
                            <span>{movie.release_date} {movie.origin_country[0]}</span>
                            <ul>
                            {movie.genres.map(genre => (
                                <li key={genre.id || genre.name}>{genre.name}</li>
                            ))}
                            </ul>
                        </div>
                        <div className='score-line'>
                            <div 
                                className='score-details'
                                style={{
                                    borderColor:
                                        movie.vote_count === 0 ?
                                        'black' : 
                                        movie.vote_average > 7.5 ? 
                                        'green' : 
                                        movie.vote_average > 5 ?
                                        'orange' :
                                        'red'
                                }}
                            >
                                {movie.vote_count > 0 && Math.round(movie.vote_average * 10)}
                            </div>
                            <h2>User Score</h2>
                        </div>
                        <h4 className='tagline'>{movie.tagline}</h4>
                        <div className='overview'>
                            <h2>Overview</h2>
                            <p>{movie.overview}</p>
                        </div>
                        <div className='crew-display'>
                            {crewDisplay.map(c => (
                                <div key={c.id} className='crew-card'>
                                    <h4>{c.name}</h4>
                                    <p>{c.job}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='movie-bottom-info'>
                <div className='movie-bottom-right-info'>
                    <Cast key={cast.id} cast={cast}/>
                    <hr></hr>
                    {reviews.length > 0 && <Reviews reviews={reviews} movieId={movie.id}/>}
                </div>
                <MovieInfo movie={movie}/>
            </div>
        </>
        
    )

}

export default MovieDetails