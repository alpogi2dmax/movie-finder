import profile_photo from './profile_photo.png'
import { Link } from 'react-router-dom'

function Cast(props) {

    const topBilledCast = props.cast.slice(0,20)

    console.log(topBilledCast)

    const castCard = () => topBilledCast.map(actor => (
        <div className='actor-card'>
            <Link to={`/actor/${actor.id}`}>
                <img
                    className="actor-image"
                    src={actor.profile_path 
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` 
                        : profile_photo
                    }
                    alt={actor.name}
                />
            </Link>
            <div className='actor-text'>
                <h4>{actor.name}</h4>
                <p>{actor.character}</p>
            </div>
        </div>

    ))

    return (
        <div className='cast-container'>
            <h2>Top Billed Cast</h2>
            <div className='cast-list'>
                {castCard()}
            </div>
        </div>
    )
}

export default Cast