import React from 'react'
import BoxLoaderGif from "/loaders/box_loader.gif"

const BoxLoader = () => {
    return (
        <div className='box-loader' >
            <img src={BoxLoaderGif} alt="Loading..." />
        </div>
    )
}

export default BoxLoader
