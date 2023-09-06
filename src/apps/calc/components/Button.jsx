import React, { useContext } from 'react'
import { CalcContext } from '../context/CalcProvider';


const Button = ({ value }) => {

    const { setCalc, calc } = useContext(CalcContext);

    //User Click Comma
    const commaClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
        })
    }
    // user click reset button c
    const resetClick = () => {
        setCalc({
            sign: '',
            num: 0,
            res: 0,
        })
    }
    //user click number
    const handleNumClick = () => {
        const numberString = value.toString()
        let numberValue;
        if (numberString === '0' && calc.num === 0) {
            numberValue = "0";
        } else {
            numberValue = Number(calc.num + numberString);
        }
        setCalc({
            ...calc,
            num: numberValue
        })
    }
    //user click operations button
    const signClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        })
    }

    //user click Equals
    const equalsClick = () => {
        if (calc.res && calc.num) {
            const Math = (a, b, sign) => {
                if (sign) {
                    const result = {
                        '+': (a, b) => a + b,
                        '-': (a, b) => a - b,
                        'x': (a, b) => a * b,
                        '/': (a, b) => a / b,
                    }
                    return result[sign](a, b);
                }
            }
            setCalc({
                res: Math(calc.res, calc.num, calc.sign),
                sign: "",
                num: 0,
            })
        }
    }

    // user click percent
    const percentClick = () => {
        setCalc({
            num: (calc.num / 100),
            res: (calc.res / 100),
            sign: ''
        })
    }
    //use click invert click
    const invertClick = () => {
        setCalc({
            num: calc.num ? calc.num * -1 : 0,
            res: calc.res ? calc.num * -1 : 0,
            sign: '',

        })
    }

    const handleBtnClick = () => {
        console.log(value)
        const results = {
            '.': commaClick,
            'C': resetClick,
            "/": signClick,
            "x": signClick,
            "-": signClick,
            "+": signClick,
            "=": equalsClick,
            "%": percentClick,
            "+-": invertClick,
        }
        if (results[value]) {
            return results[value]()
        } else {
            return handleNumClick()
        }
    }

    const getStyleName = (value) => {
        const className = {
            '=': 'equals_btn',
            'x': 'opt_btn',
            '-': 'opt_btn',
            '+': 'opt_btn',
            '/': 'opt_btn',
        }
        return className[value]
    }

    return (
        <>
            <button onClick={handleBtnClick} className={`${getStyleName(value)} calc_button`}> {value}</button >
        </>
    )
}

export default Button
