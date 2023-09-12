import React from 'react'
import Review from './components/Review'
import "./Reviews.css"
const Reviews = () => {
  return (
    <main id='review'>
      <section className='review-container'>
        <div className='title'>
          <h2>Our Reviews</h2>
          <div className='rev_underline'></div>
        </div>
        <Review />
      </section>
    </main>
  )
}

export default Reviews
