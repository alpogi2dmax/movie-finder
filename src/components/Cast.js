import profile_photo from './profile_photo.png'

function Cast(props) {

    const topBilledCast = props.cast.slice(0,10)

    console.log(topBilledCast)

    const castCard = () => topBilledCast.map(actor => (
        <div className='actor-card'>
            <img
                className="actor-image"
                src={actor.profile_path 
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` 
                    : profile_photo
                }
                alt={actor.name}
            />
            <div className='actor-text'>
                <h4>{actor.name}</h4>
                <p>{actor.character}</p>
            </div>
        </div>

    ))

    return (
        <div>
            <h1>Cast</h1>
            <div className='cast-list'>
                {castCard()}
            </div>
        </div>
    )
}

export default Cast