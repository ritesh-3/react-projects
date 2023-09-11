import React from 'react'
import CalcProvider from './context/CalcProvider'
import Button from './components/Button'
import Screen from './components/Screen'
import "./Calculator.css"

const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
]

const Calculator = () => {
    return (
        <CalcProvider >
            <main id='calculator'>
                <section >
                    <div className='title m-3'>
                        <h2>Calculator</h2>
                        <div className='calc_underline'></div>
                    </div>
                    <div className='calc_container'>
                        <Screen />
                        <div className='buttonBox'>
                            {
                                btnValues.flat().map((btn, i) => {
                                    return <Button key={i} value={btn} />
                                })
                            }
                        </div>
                    </div>
                </section>
            </main>
        </CalcProvider>

    )
}

export default Calculator
