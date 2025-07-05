import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Search() {

    const navigate = useNavigate()
    
    const handleSearch = (formData) => {
        const newSearch = formData.get('search-word')
        if (newSearch.trim().length > 3) {
            navigate(`/search/${encodeURIComponent(newSearch.trim())}`)
        }
    }

    return (
        <form className='search' action={handleSearch}>
            <div className='search-input-container'>
                <input type='text' placeholder="Search..." name='search-word'></input>
                <button type='submit' className='search-button'>
                    <FaSearch />
                </button>
            </div>
        </form>
    )
}

export default Search