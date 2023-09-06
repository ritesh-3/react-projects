import React from 'react'

const ResetButton = ({ resetBoard }) => {
    return (
        <button className='reset-btn' onClick={resetBoard}>Reset</button>
    )
}

export default ResetButton
