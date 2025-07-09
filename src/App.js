import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import Movies from './components/Movies';
import './App.css';
import Header from './components/Header';
import MovieDetails from './components/MovieDetails';
import Search from './components/Search';
import SearchResults from './components/SearchResults'
import Actor from './components/Actor';
import ReviewPage from './components/ReviewPage';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import tmdb from './api/tmdb';

function App() {

  const [popMovies, setPopMovies] = useState([])
  const [npMovies, setNpMovies] = useState([])
  const [tpMovies, setTpMovies] = useState([])
  const [upMovies, setUpMovies] = useState([])


  useEffect(() => {
    async function fetchMovies() {
      try {
        const popResponse = await tmdb.get('/movie/popular')
        const npResponse = await tmdb.get('/movie/now_playing')
        const tpResponse = await tmdb.get('/movie/top_rated')
        const upResponse = await tmdb.get('/movie/upcoming')
        setPopMovies(popResponse.data.results)
        setNpMovies(npResponse.data.results)
        setTpMovies(tpResponse.data.results)
        setUpMovies(upResponse.data.results)
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }
    fetchMovies()
  }, [])

  function AppContent() {
    const { auth } = useContext(AuthContext)

    return (
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        {auth?.authenticated ? (
          <>
            <Route 
              path='/' 
              element={
                <>
                  <Search />
                  <Movies movies={popMovies} title='Popular' />
                  <Movies movies={npMovies} title='Now Playing' />
                  <Movies movies={tpMovies} title='Top Rated' />
                  <Movies movies={upMovies} title='Upcoming' />
                </>
              } 
            />
            <Route path='movie/:id' element={<MovieDetails />} />
            <Route path='actor/:id' element={<Actor />} />
            <Route path='movie/reviews/:id' element={<ReviewPage />} />
            <Route 
              path='search/:query' 
              element={
                <>
                  <Search />
                  <SearchResults />
                </>
              } 
            />
          </>
        ) : (
          // Redirect to login for any unknown path
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    )
  }

  return (
    <AuthProvider>
      <Router>
        <Header />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
