import { useState } from 'react' 

function ReviewCard(props) {

    const [expanded, setExpanded] = useState(false)

    console.log(props)

    const reviewDate = (date) => {
        const newDate = new Date(date);
        const options = { year: 'numeric', month: 'short', day: 'numeric'}
        const formattedDate = newDate.toLocaleString('en-US', options)
        return formattedDate
    }

    const truncated = props.review.content.slice(0, 500)

    const toggleExpand = () => {
        setExpanded(prev => !prev)
    }

    return (
        <div className='review-card'>
            <div className='review-card-header'>
                <h2 className='review-author-icon'>{props.review.author[0].toUpperCase()}</h2>
                <div className='review-card-header-details'>
                    <h3>A review by {props.review.author}</h3>
                    <div className='rating-line'>
                        <h4 className='review-rating'>✩ {props.review.author_details.rating * 10}%</h4>
                        <span>{reviewDate(props.review.created_at)}</span>
                    </div>
                </div>
            </div>
            <p>
                {expanded ? props.review.content : truncated}
                {props.review.content.length > 500 &&
                    <span
                        className='read-more'
                        onClick={toggleExpand}
                        style={{color: 'blue', cursor: 'pointer', marginLeft: '5px'}}
                    >
                        {expanded ? 'Read Less' : 'Read More'}
                    </span>
                }
            </p>
        </div>
    )
}

export default ReviewCard