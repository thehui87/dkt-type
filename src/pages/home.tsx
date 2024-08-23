import { useEffect, useState, useRef } from 'react';
import { HeadingTag } from '../components/headingTag';
import { RxReset } from 'react-icons/rx';
import Tooltip from '../components/Tooltip';
import Timer, { TimerHandle } from '../components/timer';
import ConfigToolbar from '../components/toolbar';

const textBlock =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt asperiores, dolorem nisi praesentium eligendi est consectetur ipsum veritatis fuga similique dolor magni obcaecati aut id, aperiam iure doloribus reprehenderit officia.';

// interface textData {
//     username: string;
//     password: string;
//     prevState: null;
// }
// interface StylesDictionary {
//   [Key: string]: CSSProperties
// }

const statsStyle = 'mr-4';

interface CaretPos {
    x: number;
    y: number;
}

const Home = () => {
    // const [textArray, setTextArray] = useState<Array<string>>([]);
    const [wordArray, setWordArray] = useState<Array<string>>([]);
    const [typedArray, setTypedArray] = useState<Array<string>>([]);
    const [activeWord, setActiveWord] = useState<string>('');
    const [activeWordHTML, setActiveWorHTML] = useState<Element | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [counter, setCounter] = useState<number>(0);
    const [spaceCounter, setSpaceCounter] = useState<number>(0);
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<Number>(0);
    const [letterArray, setLetterArray] = useState<Array<Element>>([]);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [caretPosition, setCaretPosition] = useState<CaretPos>({
        x: 0,
        y: 0,
    });

    const timerRef = useRef<TimerHandle>(null);

    const handleInputChange = (event: any) => {
        if (counter < wordArray.length) {
            timerRef.current?.start();
        }

        setInputValue(event.target.value);

        // caret placement
        // let allCharacterLength = event.target.value.length;
        // let onlyCharacters = event.target.value.replaceAll(' ', '').length;
        // let spaces = allCharacterLength - onlyCharacters;

        // setCounter(onlyCharacters);
        // setSpaceCounter(spaces);
        // let inputLength = event.target.value.trim().length;
        // activeWordHTML.getEle

        // if (event.target.value.trim().length > 0) {
        // if(event.target.value.trim())
    };

    useEffect(() => {
        inputValue
            .trim()
            .split('')
            .forEach((value: string, index: number) => {
                const isCorrect = value === activeWord[index];
                if (letterArray[index]) {
                    if (isCorrect) letterArray[index].classList.add('correct');
                    else letterArray[index].classList.add('incorrect');
                }
                // console.log('Y: ', letterArray[index]);

                // if (isCorrect) console.log('Y: ', letterArray[index]);
                // else console.log('N:', letterArray[index]);
            });
    }, [inputValue]);
    const handleSpace = (e: any) => {
        if (inputValue.length > 1 && inputValue.trim().length == 0) {
            setInputValue('');
        }

        if (e.keyCode === 32) {
            // console.log({ inputValue });
            setTypedArray([...typedArray, inputValue]);
            if (activeWord == inputValue.trim()) {
                wordValuation();
            } else {
                wordValuation('error');
            }
            setInputValue('');
            setCounter((count) => {
                return ++count;
            });
        }
        // backspace
        if (e.keyCode === 8) {
            let index = inputValue.length - 1;
            if (letterArray[index]) {
                letterArray[index].classList.remove(
                    ...letterArray[index].classList
                );
                letterArray[index].classList.add('letter');
            }
        }
    };

    useEffect(() => {
        if (counter < wordArray.length) {
            setActiveWord(wordArray[counter]);
            setActiveWordHTML();
        } else {
            setIsDisabled(true);
            timerRef.current?.stop();
        }
    }, [counter, wordArray]);

    useEffect(() => {
        setWordArray([...textBlock.split(' ')]);
        setIsDisabled(false);

        return () => {
            timerRef.current?.reset();
        };
    }, []);

    const resetBoard = () => {
        setWordArray(() => [...textBlock.split(' ')]);

        setCounter(0);
        setActiveWord(wordArray[0]);
        setInputValue('');
        setIsDisabled(false);

        timerRef.current?.reset();
    };

    const setActiveWordHTML = () => {
        let lastActiveWord = document.querySelector('.word.active');
        if (lastActiveWord && lastActiveWord.classList.contains('active')) {
            lastActiveWord.classList.remove('active');
        }

        let wordList = document.querySelectorAll('.word');
        wordList[counter].classList.add('active');
        setActiveWorHTML(wordList[counter]);
        let letterArray = wordList[counter].querySelectorAll('.letter');
        setLetterArray([...letterArray]);
    };

    const wordValuation = (value: string = '') => {
        let lastActiveWord = document.querySelector('.word.active');
        if (lastActiveWord && lastActiveWord.classList.contains('active')) {
            lastActiveWord.classList.add('typed');
            if (value) lastActiveWord.classList.add(value);
        }
    };

    useEffect(() => {
        let boundingRect: DOMRect =
            activeWordHTML?.getBoundingClientRect() as DOMRect;

        let a: CaretPos = {
            x: boundingRect?.x - 136,
            y: boundingRect?.bottom - boundingRect?.y - 30,
        };
        setCaretPosition(a);
    }, [activeWordHTML]);

    const getWPM = () => {
        let wpm = typedArray.length / timerRef.current?.mindecimal()!;
        return Math.round(wpm);
    };

    const getAccuracy = () => {
        let correctCharacters =
            document.querySelectorAll('.letter.correct').length;
        let incorrectCharacters =
            document.querySelectorAll('.letter.incorrect').length;
        let totalCharacters = wordArray.join('').length;

        return [
            ((correctCharacters / totalCharacters) * 100).toFixed(0),
            correctCharacters,
            incorrectCharacters,
        ];
    };

    const onFocus = () => setInputFocus(true);
    const onBlur = () => setInputFocus(false);

    return (
        <div>
            <HeadingTag>Home</HeadingTag>
            <div className="h-full flex items-center absolute top-0 w-full">
                {/* pointer-events-none */}
                <div className="flex flex-col items-center mx-36 max-sm:mx-10">
                    {/* Toolbar */}
                    <ConfigToolbar></ConfigToolbar>
                    {/* Word count and time */}
                    <div className="flex flex-row justify-between w-full text-teal-200 text-2xl mb-5">
                        <Tooltip message="Word count" position="top">
                            <div className="w-32 text-left">{`${counter}/${wordArray.length}`}</div>
                        </Tooltip>
                        <div>
                            <Timer ref={timerRef} />
                        </div>
                    </div>
                    {/* Text Field */}
                    <div className="rounded-lg bg-teal-950 text-3xl text-teal-600 min-h-40 max-h-40 overflow-hidden py-2 leading-12 tracking-wider text-left relative">
                        <div
                            id="caret"
                            className="bg-orange-400"
                            style={{
                                // left: `${7 + counter * 20 + spaceCounter * 16}px`,
                                left: `${caretPosition.x}px`,
                                top: `${caretPosition.y}px`,
                                visibility: inputFocus ? 'visible' : 'hidden',
                            }}
                        ></div>

                        <input
                            className="opacity-0 absolute w-full h-full left-0 top-0"
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onKeyDown={handleSpace}
                            disabled={isDisabled}
                        />
                        {wordArray.map((word: string, index: number) => (
                            <div key={index} className={'word'}>
                                {word
                                    .split('')
                                    .map(
                                        (
                                            letter: string,
                                            indexLetter: number
                                        ) => (
                                            <span
                                                key={indexLetter}
                                                className={'letter'}
                                            >
                                                {/* ${isCorrect == 0 ? '' : isCorrect == 1 ? 'correct' : 'incorrect'} */}
                                                {letter}
                                            </span>
                                        )
                                    )}
                            </div>
                        ))}
                    </div>
                    {/* Reset Button */}
                    <div className="text-teal-200 text-2xl mt-5">
                        <Tooltip message="Reset">
                            <button onClick={resetBoard}>
                                <RxReset />
                            </button>
                        </Tooltip>
                    </div>
                    {/* Stats */}
                    <div className="flex flex-col">
                        {isDisabled && (
                            <div className="flex flex-row ">
                                {/* wordper minutes */}

                                <div className={`${statsStyle}`}>
                                    {getWPM()} words per minute.{' '}
                                </div>
                                <div className={`${statsStyle}`}>
                                    Accuracy: {getAccuracy()[0]}%
                                </div>
                                <div className={`${statsStyle}`}>
                                    Correct: {getAccuracy()[1]}
                                </div>
                                <div className={`${statsStyle}`}>
                                    Incorrect: {getAccuracy()[2]}
                                </div>
                                <div className={`${statsStyle}`}>
                                    Characters: {typedArray.join('').length}/
                                    {wordArray.join('').length}
                                </div>
                                {/* <div className={`${statsStyle}`}>
                                    Words: {typedArray.join("").length}/{wordArray.join("").length}
                                </div> */}
                            </div>
                        )}
                        <div>{isDisabled && typedArray.join(' ')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
