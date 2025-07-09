import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import tmdb from '../api/tmdb'

function ReviewPage() {

    const [ movie, setMovie ] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [reviewPage, setReviewPage] = useState(0)
    const { id } = useParams()

    useEffect(() => {
            async function fetchMovie() {
                try {
                    const response = await tmdb.get(`/movie/${id}`)
                    const reviewResponse = await tmdb.get(`/movie/${id}/reviews`)
                    setMovie(response.data)
                    setReviews(reviewResponse.data)
                    setReviewPage(reviewResponse.data.page)
    
                } catch (err) {
                    console.error('Failed to fetch movie details:', err)
                }
            }
            fetchMovie()
        }, [id])

    if (!reviews) return <p>Loading...</p>

    console.log(reviews)

    const reviewCard = () => reviews.results.map(review => (
        <ReviewCard key={review.id} review={review}/>
    ))

    return (
        <div>
            <div className='review-header'>
                <h2>Reviews for {movie.original_title}</h2>
                <Link to={`/movie/${movie.id}`}>
                    <h4>Back to Main</h4>
                </Link>
            </div>
            <div className='review-page-container'>
                <img 
                    src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} 
                    alt={movie.original_title}
                />
                <div className='review-cards-container'>
                    {reviewCard()}
                </div>
            </div>
        </div>
    )
}

export default ReviewPage