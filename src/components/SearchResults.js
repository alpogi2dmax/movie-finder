import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import tmdb from '../api/tmdb'
import SearchCard from './SearchCard'

function SearchResults() {

    const { query } = useParams()
    const [searchList, setSearchList] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        async function fetchSearch() {
            try {
                const response = await tmdb.get(`/search/movie`, {
                    params: { query, page }
                })
                setSearchList(response.data)
            } catch (err) {
                console.error('Failed to fetch search list:', err)
            }
        }
        fetchSearch()
    }, [query, page])

    const handlePrev = () => {
        if (page > 1) setPage(prev => prev - 1)
    }

    const handleNext = () => {
        if (page < searchList.total_pages) setPage(prev => prev + 1)
    }

    const handlePage = (i) => {
        setPage(i)
    }

    if (!searchList) return <p>Loading...</p>

    console.log(searchList)

    const searchDisplay = () => 
        searchList.results.map(movie => (
            <SearchCard key={movie.id} movie={movie} />
        ))

    const pageNumber = () => {
        const pages = []
        const totalPages = searchList.total_pages
        const maxPages = 10
        const half = Math.floor(maxPages / 2)

        let start = Math.max(1, page - half)
        let end = start + maxPages - 1

        if (end > totalPages) {
            end = totalPages
            start = Math.max(1, end - maxPages + 1)
        }

        for (let i = start; i <= end; i++) {
            pages.push(
                <button 
                    key={i} 
                    onClick={() => handlePage(i)}
                    style={{
                        fontWeight: page === i ? 'bold' : 'normal',
                        cursor: 'pointer',
                        textDecoration: page === i ? 'underline': 'none',
                        padding: '4px 8px',
                        margin: '0 2px'
                    }}
                >
                    {i}
                </button>
            )
        }
        return pages
    }
    

    return (
        <div>
            <Link to='/'><p>back</p></Link>
            <h1>Search Results for {query}</h1>
            {searchDisplay()}
            <div className='page-buttons'>
                {page > 1 &&<button onClick={handlePrev}>prev</button>}
                {pageNumber()}
                {page < searchList.total_pages && <button onClick={handleNext}>next</button>}
            </div>
        </div>
    )
}

export default SearchResults