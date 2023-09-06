import React, { useContext } from 'react'
import { CalcContext } from '../context/CalcProvider'
import TextFit from './TextFit'

const Screen = () => {
    const { calc } = useContext(CalcContext)
    return (
        <>
            <div style={{ opacity: calc.sign ? '1' : '0' }} className='calc-sign'>{calc.sign ? calc.sign : " "}</div>
            <TextFit text={calc.num ? calc.num : calc.res} />
        </>
    )
}

export default Screen
