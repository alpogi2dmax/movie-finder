import movie_logo from './movie_logo.png'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <header>
            <Link to='/'>
                <img src={movie_logo} alt='movie logo' />
            </Link>
            <h1>MOVIE LISTS</h1>
        </header>
    )
}

export default Header