import React, { useState, useEffect } from 'react';
import LinkedList from '../utils/LinkedList'; // Import the LinkedList class

const SpeedTyping: React.FC = () => {
    const [typedWord, setTypedWord] = useState<string>(''); // Store the current typed word
    const [wordsList] = useState<LinkedList<string>>(new LinkedList()); // Linked list to manage words
    const [wordArray, setWordArray] = useState<string[]>([]); // Array to render words

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTypedWord(e.target.value);
    };

    // Handle word submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (typedWord.trim() !== '') {
            wordsList.append(typedWord); // Add word to the linked list
            setTypedWord(''); // Clear input
            setWordArray(wordsList.toArray()); // Update the array to render words
        }
    };

    // Remove the first word (if needed, e.g., limit the words shown in the game)
    const handleRemoveFirst = () => {
        wordsList.removeFirst();
        setWordArray(wordsList.toArray()); // Update the array after removing the first word
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">
                Speed Typing Game with Linked List
            </h1>

            {/* Word input form */}
            <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-4"
            >
                <input
                    type="text"
                    value={typedWord}
                    onChange={handleInputChange}
                    placeholder="Type a word..."
                    className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Word
                </button>
            </form>

            {/* Optional button to remove the first word */}
            <button
                onClick={handleRemoveFirst}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
                Remove First Word
            </button>

            {/* Display the list of words */}
            <div className="mt-8">
                <h2 className="text-2xl">Typed Words:</h2>
                <ul className="mt-4 space-y-2">
                    {wordArray.map((word, index) => (
                        <li
                            key={index}
                            className="bg-white p-2 border rounded-md"
                        >
                            {word}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SpeedTyping;
