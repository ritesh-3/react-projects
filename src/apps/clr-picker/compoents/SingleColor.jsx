import React, { useState, useEffect } from 'react'
import rgbToHex from '../utils'

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [alert, setAlert] = useState(false)
  const bcg = rgb.join(',')
  const hex = rgbToHex(...rgb)
  const hexValue = `#${hexColor}`
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert])
  return (
    <article
      className={`cp_color ${index > 10 && 'cp_color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        setAlert(true)
        navigator.clipboard.writeText(hexValue)
      }}
    >
      <p className='cp_percent-value'>{weight}%</p>
      <p className='cp_color-value'>{hexValue}</p>
      {alert && <p className='cp_alert'>copied to clipboard</p>}
    </article>
  )
}

export default SingleColor
