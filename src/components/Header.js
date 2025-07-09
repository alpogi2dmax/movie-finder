import movie_logo from './movie_logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

function Header() {

    const { auth, logout } = useContext(AuthContext)

    console.log(auth)



    return (
        <header>
            <Link to='/'>
                <img src={movie_logo} alt='movie logo' />
            </Link>
            <h1>MOVIE LISTS</h1>
            {auth && auth.username && <p title='Click to logout' onClick={logout}>{auth.username[0].toUpperCase()}</p>}
        </header>
    )
}

export default Header