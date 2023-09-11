import React, { useState } from 'react'
import "./ColorPicker.css"

import Values from 'values.js'
import SingleColor from './compoents/SingleColor'

const ColorPicker = () => {
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)
  const [list, setList] = useState(new Values('#cc66ff').all(10))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(false)
    try {
      let colors = new Values(color).all(10)
      setList(colors)
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }

  return (
    <>
      <section className='cp_container'>
        <h3>Color Picker</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder='#cc66ff'
              onChange={(e) => setColor(e.target.value)}
              className={`${error ? 'cp_error' : null} cp_input`}
            />
            <button className='cp_btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </section>
      <section className='cp_colors'>
        {
          list.map((color, idx) => (
            <SingleColor
              key={idx}
              {...color}
              index={idx}
              hexColor={color.hex}
            />
          ))
        }
      </section>
    </>
  )
}

export default ColorPicker
