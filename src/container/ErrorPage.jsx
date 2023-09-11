import React from 'react'
import ErrorGif from "/loaders/error.gif"
const ErrorPage = () => {
  return (
    <div className='error-page'>
      <img src={ErrorGif} alt="Error.." />
    </div>
  )
}

export default ErrorPage
