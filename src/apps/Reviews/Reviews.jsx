import React from 'react'
import Review from './components/Review'
import "./Reviews.css"
const Reviews = () => {
  return (
    <main id='review'>
      <section className='review-container'>
        <div className='title'>
          <h2>Our Reviews</h2>
          <div className='underline'></div>
        </div>
        <Review />
      </section>
    </main>
  )
}

export default Reviews
