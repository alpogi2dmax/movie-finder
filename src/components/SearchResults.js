import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import tmdb from '../api/tmdb'
import SearchCard from './SearchCard'

function SearchResults() {

    const { query } = useParams()
    const [searchList, setSearchList] = useState(null)

    useEffect(() => {
        async function fetchSearch() {
            try {
                const response = await tmdb.get(`/search/movie?query=${query}`)
                setSearchList(response.data)
            } catch (err) {
                console.error('Failed to fetch search list:', err)
            }
        }
        fetchSearch()
    }, [query])

    if (!searchList) return <p>Loading...</p>

    console.log(searchList)

    const searchDisplay = () => 
        searchList.results.map(movie => (
            <SearchCard key={movie.id} movie={movie} />
        ))
    

    return (
        <div>
            <Link to='/'><p>back</p></Link>
            <h1>Search Results for {query}</h1>
            {searchDisplay()}
            
        </div>
    )
}

export default SearchResults