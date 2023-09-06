import React from 'react'

const TicBox = ({ value, onClick }) => {

    const style = value === "x" ? "tic-box x" : "tic-box o";

    return (
        <>
            <button className={style} onClick={onClick} >{value && value.toUpperCase()}</button>
        </>
    )
}

export default TicBox
