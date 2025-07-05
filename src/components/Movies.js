import MovieCard from "./MovieCard"

function Movies(props) {

    return (
        <div className='movie-container'>
            <h2>{props.title}</h2>
            <div className='movie-list'>
                {props.movies.map((movie, index) => (
                <MovieCard key={index} movie={movie}/>
            ))}
            </div>
        </div>
    )
}

export default Movies