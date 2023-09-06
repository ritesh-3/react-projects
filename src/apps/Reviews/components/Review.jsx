import React, { useState } from 'react'
import reviews from '../ReviewData'
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';


const Review = () => {
    const [index, setIndex] = useState(0);
    const { name, job, image, text } = reviews[index];

    const handleEdgeCases = (index) => {
        if (index >= reviews.length) return 0;
        if (index < 0) return reviews.length - 1;
        return index;
    }

    const nextButton = () => {
        setIndex((index) => {
            return handleEdgeCases(index + 1)
        })
    }

    const prevButton = () => {
        setIndex((index) => {
            return handleEdgeCases(index - 1)
        })
    }

    const changeReview = () => {
        let randomNumber = Math.floor(Math.random() * reviews.length);
        if (randomNumber === index) randomNumber = index + 1;
        setIndex(handleEdgeCases(randomNumber));
    }

    return (
        <article className='review'>
            <div className="img-container">
                <img src={image} alt="" className='person-img' />
                <span className='quote-icon'><FaQuoteRight /></span>
            </div>
            <h4 className='author'>{name}</h4>
            <p className='job'>{job}</p>
            <p className='info'>{text}</p>
            <div className='button-container'>
                <button onClick={prevButton} className='prev-btn'>
                    <FaChevronLeft />
                </button>
                <button className='next-btn' onClick={nextButton}>
                    <FaChevronRight />
                </button>
            </div>
            <button className='change-btn' onClick={changeReview}>Change</button>
        </article>
    )
}

export default Review
