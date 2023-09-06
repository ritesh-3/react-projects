import React, { useEffect, useRef, useState } from 'react'

const TextFit = ({ text }) => {
    const containerRef = useRef(null);
    const [fontSize, setFontSize] = useState(48); // Initial font size

    // Function to calculate font size based on text length
    const calculateFontSize = () => {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = getTextWidth(text, fontSize + 'px Roboto');

        // Calculate the maximum font size that fits the text within the container
        if (textWidth > containerWidth) {
            const newFontSize = (containerWidth / textWidth) * fontSize * 0.9
            setFontSize(newFontSize)
        }
    };

    // Function to measure text width
    function getTextWidth(text, font) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    }
    // Handle text changes
    useEffect(() => {
        calculateFontSize();
    }, [text]);

    return (
        <div className="auto-fit-text-area-container" ref={containerRef}>
            <div
                className="auto-fit-text-area"
                style={{ fontSize: fontSize + 'px' }}
            >
                {text}
            </div>
        </div>
    );
}


export default TextFit
