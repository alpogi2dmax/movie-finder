function Cast(props) {

    const topBilledCast = props.cast.slice(0,10)

    console.log(topBilledCast)

    const castCard = () => topBilledCast.map(actor => (
        <div className='actor-card'>
            <img
                className="actor-image"
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
            />
            <h4>{actor.name}</h4>
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