import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import profile_photo from './profile_photo.png'
import poster_photo from './poster_photo.png'
import tmdb from '../api/tmdb'

function Actor() {

    const [ actor, setActor ] = useState(null)
    const [ credit, setCredit ] = useState([])

    const {id} = useParams()

    useEffect(() => {
        async function fetchActor() {
            try {
                const response = await tmdb.get(`person/${id}`)
                const creditResponse = await tmdb.get(`person/${id}/movie_credits`)
                setActor(response.data)
                setCredit(creditResponse.data.cast)
                
            } catch (err) {
                console.error('failed to fetch actor details:', err)
            }
        }
        fetchActor()
    }, [id])

    const dateConvert = (date) => {
        const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        const day = date.slice(8)
        const month = date.slice(5,7)
        const year = date.slice(0,4)

        return `${monthList[parseInt(month) - 1]} ${day}, ${year}`
    }

    const featureMovies = credit.sort((a, b) => b.popularity - a.popularity).slice(0, 10)

    const sortMovies = credit.sort((a, b) => parseInt(b.release_date.slice(0, 4) - parseInt(a.release_date.slice(0, 4))))

    console.log(sortMovies)

    const featureCard = () => 
        featureMovies.map(movie => (
            <div className='feature-card' key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                    <img
                        className='feature-photo'
                        src={movie.poster_path
                            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` 
                            : poster_photo
                        }
                        alt={actor.name}
                    />
                </Link>
                <span>{movie.title}</span>
            </div>
        ))
    
    const movieList = () => 
        sortMovies.map(movie => (
            <div className='actor-movie-block'>
                <h4>{movie.release_date.slice(0, 4)}</h4>
                <Link to={`/movie/${movie.id}`}>
                    <h4>{movie.original_title}</h4>
                </Link>
            </div>
        ))
    

    if (!actor || !credit) return  <p>Loading...</p>

    return (
        <div className='actor-container'>
            <div className='actor-left-container'>
                <img
                    className="profile-image"
                    src={actor.profile_path 
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` 
                        : profile_photo
                    }
                    alt={actor.name}
                />
                <h2>Personal Info</h2>
                <div className='movie-info-block'>
                    <h4>Known for</h4>
                    <p>{actor.known_for_department}</p>
                </div>
                <div className='movie-info-block'>
                    <h4>Birthday</h4>
                    <p>{ actor.birthday ? dateConvert(actor.birthday) : 'N/A'}</p>
                </div>
                <div className='movie-info-block'>
                    <h4>Place of Birth</h4>
                    <p>{actor.place_of_birth}</p>
                </div>
                <div className='movie-info-block'>
                    <h4>Also Known as</h4>
                    {actor.also_known_as.map(name => (
                        <p>{name}</p>
                    ))}
                </div>
            </div>
            <div className='actor-right-container'>
                <div className='actor-bio'>
                    <h1>{actor.name}</h1>
                    <h2>Biography</h2>
                    <p>{actor.biography}</p>
                </div>
                <div className='known-for'>
                    <h2>Known For</h2>
                    <div className='feature-container'>
                        {featureCard()}
                    </div>
                </div>
                <div>
                    <h2>Movies</h2>
                    <div className='actor-movie-list-container'>
                        {movieList()}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Actor

