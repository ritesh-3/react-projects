import React, { useEffect, useState } from 'react'
import "./MagicMatch.css"

const cardImages = [
    { "src": "/imgs/helmet-1.png", matched: false },
    { "src": "/imgs/potion-1.png", matched: false },
    { "src": "/imgs/ring-1.png", matched: false },
    { "src": "/imgs/scroll-1.png", matched: false },
    { "src": "/imgs/shield-1.png", matched: false },
    { "src": "/imgs/sword-1.png", matched: false },
]


const MagicCard = ({ card, handleChoice, flipped, disabled }) => {

    const hanldeClick = () => {
        if (!disabled) handleChoice(card)
    }

    return (

        <div className='magic-card' >
            <div className={flipped ? 'flipped' : ''}>
                <img className='front' src={card.src} alt="card front" />
                <img className='back' src='imgs/cover.png' onClick={hanldeClick} />
            </div>
        </div>
    )
}


const MagicMatch = () => {

    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [secondChoice, setSecondChoice] = useState(null);
    const [disabled, setDisabled] = useState(false);

    // Shuffle Cards
    const shuffleCard = () => {
        const shuffleCards = [...cardImages, ...cardImages]  //Duplicated images
            .sort(() => Math.random() - 0.5) //shuffled
            .map((card) => ({ ...card, id: Math.random() })) //added ID to each card

        setCards(shuffleCards);
        setTurns(0);
        setChoiceOne(null);
        setSecondChoice(null);
    }

    //hanlde a choice
    const handleChoice = (card) => {
        choiceOne ? setSecondChoice(card) : setChoiceOne(card);
    }

    useEffect(() => {
        if (secondChoice && choiceOne) {
            setDisabled(true);
            if (secondChoice.src === choiceOne.src) {
                //set card macthed true for matched one
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        }
                        else {
                            return card
                        }
                    })
                })
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [secondChoice, choiceOne])

    useEffect(() => {
        shuffleCard();
    }, [])

    const resetTurn = () => {
        setChoiceOne(null)
        setSecondChoice(null)
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }

    return (
        <div className='MagicMatch'>
            <div className='magic-wrapper'>
                <h2>Magic Match</h2>
                <div className='flex'>
                    <button onClick={shuffleCard}>New Game</button>
                    <span className='flex'>Turns :<div className='turns-box'>{turns}</div> </span>
                </div>
                <div className='card-grid'>
                    {
                        cards && cards.map(card => (
                            <MagicCard card={card}
                                key={card.id} handleChoice={handleChoice}
                                flipped={card === choiceOne || card === secondChoice || card.matched}
                                disabled={disabled}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MagicMatch
