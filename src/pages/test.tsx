import { useState } from 'react';

function Test() {
    const targetWord = 'hello';
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: any) => {
        const input = e.target.value;
        setInputValue(input);
    };

    const renderInput = () => {
        return inputValue.split('').map((char, i) => {
            const isCorrect = char === targetWord[i];
            return (
                <span key={i} style={{ color: isCorrect ? 'green' : 'red' }}>
                    {char}
                </span>
            );
        });
    };

    return (
        <div>
            <input type="text" value={inputValue} onChange={handleChange} />
            <div>{renderInput()}</div>
        </div>
    );
}

export default Test;
