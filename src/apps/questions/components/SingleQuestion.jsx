import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
const SingleQuestion = ({ question, answer }) => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <article className='question'>
            <header>
                <h4>{question}</h4>
                <button className='q_btn' onClick={() => setShowInfo(!showInfo)}>
                    {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </button>
            </header>
            <div className={`${showInfo ? "show" : ""} answer`}>
                {showInfo && <p>{answer}</p>}
            </div>
        </article>
    )
}

export default SingleQuestion
