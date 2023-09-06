import React from 'react'

const ScoreBoard = ({ scores, xPlaying }) => {
    const { xScore, oScore } = scores;
    return (
        <div className='scoreBoard'>
            <span className={`score x-score ${!xPlaying && "inactive"}`}>X - {xScore}</span>
            <span className={`score o-score ${xPlaying && "inactive"}`}>O - {oScore}</span>
        </div>
    )
}

export default ScoreBoard
