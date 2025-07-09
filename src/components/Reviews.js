import { Link } from 'react-router-dom'
import ReviewCard from './ReviewCard';

function Reviews(props) {

    const id = props.movieId

    const reviewDate = (date) => {
        const newDate = new Date(date);
        const options = { year: 'numeric', month: 'short', day: 'numeric'}
        const formattedDate = newDate.toLocaleString('en-US', options)
        return formattedDate
    }

    const reviewCard = () => props.reviews.slice(0,1).map(review => (
        <ReviewCard key={review.id} review={review}/>
        // <div key={review.id} className='review-card'>
        //     <div className='review-card-header'>
        //         <h2 className='review-author-icon'>{review.author[0].toUpperCase()}</h2>
        //         <div className='review-card-header-details'>
        //             <h3>A review by {review.author}</h3>
        //             <div className='rating-line'>
        //                 <h4 className='review-rating'>✩ {review.author_details.rating * 10}%</h4>
        //                 <span>{reviewDate(review.created_at)}</span>
        //             </div>
        //         </div>
        //     </div>
        //     <p>{review.content}</p>
        // </div>
    ))

    console.log(props.reviews)

    return (
        <div>
            <h2>Reviews</h2>
            {reviewCard()}
            <Link to={`/movie/reviews/${id}`}>
                <h3>Read more reviews</h3>
            </Link>
        </div>
    )
}

export default Reviews