import movie_logo from './movie_logo.png'
function Header() {
    return (
        <header>
            <img src={movie_logo} alt='movie logo' />
            <h1>MOVIE LISTS</h1>
        </header>
    )
}

export default Header