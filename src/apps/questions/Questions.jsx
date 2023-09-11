import React from 'react'
import "./Questions.css"
import questions from './data'
import SingleQuestion from './components/SingleQuestion'

const Questions = () => {
    return (
        <main id='questions'>
            <div className='q_container'>
                <h3>Questions</h3>
                <section className='info'>
                    {questions.map((ques) => {
                        return <SingleQuestion key={ques.id} {...ques} />
                    })}
                </section>
            </div>
        </main>
    )
}

export default Questions
