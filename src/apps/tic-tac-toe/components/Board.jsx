import React from 'react'
import TicBox from './TicBox'

const Board = ({ board, onClick }) => {
    return (
        <div className='tic-board'>
            {board.map((elem, i) => (
                <TicBox key={i} value={elem} onClick={() => elem === null && onClick(i)} />
            ))}
        </div>
    )
}

export default Board
