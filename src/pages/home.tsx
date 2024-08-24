import {
    useEffect,
    useState,
    useRef,
    useLayoutEffect,
    useCallback,
} from 'react';
import { HeadingTag } from '../components/headingTag';
import { RxReset } from 'react-icons/rx';
import Tooltip from '../components/Tooltip';
import Timer, { TimerHandle } from '../components/timer';
import ConfigToolbar from '../components/toolbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
    setStats,
    resetStats,
    TypingStatsState,
} from '../redux/toolbar/typingstats.slice';

// declare global {
//     namespace JSX {
//         interface IntrinsicElements {
//             letter: React.DetailedHTMLProps<
//                 React.HTMLAttributes<HTMLElement>,
//                 HTMLElement
//             >;
//         }
//     }
// }

// const textBlock =
//     'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt asperiores, dolorem nisi praesentium eligendi est consectetur ipsum veritatis fuga similique dolor magni obcaecati aut id, aperiam iure doloribus reprehenderit officia.';
const textBlock =
    'Maybe if we felt any human loss as keenly as we feel one of those close to us, human history would be far less bloody.';
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
    const [wordArray, setWordArray] = useState<Array<string>>([]);
    const [typedArray, setTypedArray] = useState<Array<string>>([]);
    const [activeWord, setActiveWord] = useState<string>('');
    const [activeWordHTML, setActiveWorHTML] = useState<Element | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [oldInputValue, setOldInputValue] = useState('');
    const [counter, setCounter] = useState<number>(0);
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [letterArray, setLetterArray] = useState<Array<Element>>([]);
    const [incorrectLetterArray, setIncorrectLetterArray] = useState<
        Array<Element>
    >([]);
    const [space, setSpace] = useState<boolean>(false);
    const [incorrectCounter, setIncorrectCounter] = useState<number>(0);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [caretPosition, setCaretPosition] = useState<CaretPos>({
        x: 0,
        y: 0,
    });

    const timerRef = useRef<TimerHandle>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    // const [size, setSize] = useState([0, 0]);
    const dispatch = useDispatch();
    const {
        accuracy,
        correctCharacters,
        incorrectCharacters,
        extraCharacters,
        missedCharacters,
        correctWords,
        totalWords,
        wrongKeystrokes,
        wpm,
    } = useSelector((state: RootState) => state.typingstats);

    const handleInputChange = (event: any) => {
        if (counter < wordArray.length) {
            timerRef.current?.start();
        }

        setOldInputValue(inputValue);
        setInputValue(event.target.value.trim());
    };

    const updateCaretPosition = useCallback(() => {
        let boundingRect: DOMRect =
            activeWordHTML?.getBoundingClientRect() as DOMRect;
        if (textContainerRef.current) {
            let a: CaretPos = {
                x:
                    boundingRect?.left -
                    textContainerRef.current.offsetLeft +
                    inputValue.trim().length * 20 +
                    7,
                y:
                    Math.round(
                        boundingRect?.top - textContainerRef.current.offsetTop
                    ) + 0,
            };
            // if (a.y > 80) {
            //     let wordContainer = document.getElementById('words');
            //     if (wordContainer !== null) {
            //         let temp = wordContainer.style.top + 64;
            //         wordContainer.style.top = `${-temp}px`;
            //     }
            //     updateCaretPosition();
            // }
            setCaretPosition(a);
        }
    }, [activeWordHTML, inputValue]);

    useEffect(() => {
        const letterValuation = () => {
            let lastLetterWordIndex = inputValue.trim().length - 1;
            if (oldInputValue.trim().length < inputValue.trim().length) {
                if (lastLetterWordIndex >= 0) {
                    if (
                        activeWord[lastLetterWordIndex] ===
                        inputValue.trim()[lastLetterWordIndex]
                    ) {
                        letterArray[lastLetterWordIndex].classList.add(
                            'correct'
                        );
                    } else {
                        // if inputValue.length > activeWord.length then add dynamic span with class "incorrect extra"
                        if (inputValue.trim().length > activeWord.length) {
                            let extraSpanTag = document.createElement('span');
                            extraSpanTag.className = 'incorrect extra';
                            extraSpanTag.innerHTML =
                                inputValue.trim()[lastLetterWordIndex];
                            activeWordHTML?.appendChild(extraSpanTag);
                        } else {
                            // incorrect letter typed
                            letterArray[lastLetterWordIndex].classList.add(
                                'incorrect'
                            );
                            incorrectLetterArray[
                                lastLetterWordIndex
                            ].innerHTML =
                                inputValue.trim()[lastLetterWordIndex];
                        }
                        setIncorrectCounter(incorrectCounter + 1);
                    }
                }
            } else {
                if (inputValue.trim().length >= activeWord.length) {
                    //  delete incorrect extra
                    if (activeWordHTML && activeWordHTML.lastElementChild) {
                        activeWordHTML.removeChild(
                            activeWordHTML.lastElementChild
                        );
                    }
                } else {
                    // delete incorrect letter
                    if (letterArray[lastLetterWordIndex + 1] && !space) {
                        letterArray[lastLetterWordIndex + 1].classList.remove(
                            ...letterArray[lastLetterWordIndex + 1].classList
                        );
                        letterArray[lastLetterWordIndex + 1].classList.add(
                            'letter'
                        );
                        incorrectLetterArray[
                            lastLetterWordIndex + 1
                        ].innerHTML = '';
                    }
                }
            }
        };

        letterValuation();
        updateCaretPosition();
    }, [inputValue]);

    const handleSpace = (e: any) => {
        if (e.target.value.length > 1 && e.target.value.trim().length === 0) {
            setInputValue('');
        }

        if (e.keyCode === 32) {
            setTypedArray((oldArr) => [...oldArr, inputValue]);
            if (e.target.value.trim().length > 0) {
                if (activeWord === e.target.value.trim()) {
                    if (e.target.value.trim().length > 0) {
                        wordValuation();
                    }
                } else {
                    wordValuation('error');
                }

                setInputValue('');
                setCounter((count) => count + 1);
                setSpace(true);
            }
        } else {
            // for (
            //     let i = e.target.value.trim().length;
            //     i < letterArray.length;
            //     i++
            // ) {
            //     letterArray[i].classList.remove(...letterArray[i].classList);
            //     letterArray[i].classList.add('letter');
            // }
            setSpace(false);
        }

        // if (e.keyCode === 8) {
        // }
    };

    useEffect(() => {
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
            let incorrectLetterArray = wordList[counter].querySelectorAll(
                '.incorrect-word span'
            );
            setIncorrectLetterArray([...incorrectLetterArray]);
        };

        if (counter < wordArray.length) {
            setActiveWord(wordArray[counter]);
            setActiveWordHTML();
        } else {
            setActiveWord('');
            let lastActiveWord = document.querySelector('.word.active');
            if (lastActiveWord && lastActiveWord.classList.contains('active')) {
                lastActiveWord.classList.remove('active');
            }
            setIsDisabled(true);
            setTypingStats();
            timerRef.current?.stop();
        }
    }, [counter, wordArray]);

    const resetBoard = useCallback(() => {
        let lettersList = document.querySelectorAll('.letter');
        for (let i = 0; i < lettersList.length; i++) {
            lettersList[i].classList.remove(...lettersList[i].classList);
            lettersList[i].classList.add('letter');
        }

        let wordsList = document.querySelectorAll('.word');
        for (let i = 0; i < wordsList.length; i++) {
            wordsList[i].classList.remove(...wordsList[i].classList);
            wordsList[i].classList.add('word');
        }

        let incorrectList = document.querySelectorAll('.incorrect-word span');
        for (let i = 0; i < incorrectList.length; i++) {
            incorrectList[i].classList.remove(...incorrectList[i].classList);
            incorrectList[i].innerHTML = '';
        }
        let incorrectExtraList = document.querySelectorAll('.incorrect.extra');
        for (let i = 0; i < incorrectExtraList.length; i++) {
            incorrectExtraList[i].remove();
        }

        setWordArray(() => [...textBlock.split(' ')]);
        setCounter(0);
        setActiveWord(wordArray[0]);
        setInputValue('');
        setIsDisabled(false);
        setTypedArray([]);
        setIncorrectCounter(0);

        timerRef.current?.reset();
        textContainerRef.current?.focus();
        dispatch(resetStats());
    }, []);

    useEffect(() => {
        resetBoard();
        return () => {
            timerRef.current?.reset();
        };
    }, [resetBoard]);

    useLayoutEffect(() => {
        // function updateSize() {
        //   setSize([window.innerWidth, window.innerHeight]);
        // }
        window.addEventListener('resize', updateCaretPosition);
        updateCaretPosition();
        return () => window.removeEventListener('resize', updateCaretPosition);
    }, [updateCaretPosition]);

    const wordValuation = (value: string = '') => {
        let lastActiveWord = document.querySelector('.word.active');
        if (lastActiveWord && lastActiveWord.classList.contains('active')) {
            lastActiveWord.classList.add('typed');
            if (value) lastActiveWord.classList.add(value);
        }
    };

    const setTypingStats = () => {
        let correctCharacters: number =
            document.querySelectorAll('.letter.correct').length;
        let incorrectCharacters =
            document.querySelectorAll('.letter.incorrect').length;
        let totalWords = wordArray.length;
        let correctWords = document.querySelectorAll(
            'div.word.typed:not(.error)'
        ).length;
        let missedCharacters = document.querySelectorAll(
            'span.letter:not(.correct):not(.incorrect)'
        ).length;
        let extraCharacters = 0;
        for (let i = 0; i < wordArray.length; i++) {
            if (wordArray[i].length < typedArray[i].length) {
                extraCharacters += typedArray[i].length - wordArray[i].length;
            }
        }

        dispatch(
            setStats({
                correctCharacters: correctCharacters,
                incorrectCharacters: incorrectCharacters,
                extraCharacters: extraCharacters,
                missedCharacters: missedCharacters,
                correctWords: correctWords,
                totalWords: totalWords,
                wrongKeystrokes: incorrectCounter,
                time: timerRef.current?.mindecimal(),
            } as TypingStatsState)
        );
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
                    <div
                        ref={textContainerRef}
                        className="rounded-lg bg-teal-950 text-3xl text-teal-600 min-h-40 max-h-40 overflow-hidden py-2 leading-14 tracking-wider text-left relative"
                    >
                        {!isDisabled && (
                            <div
                                id="caret"
                                className="bg-orange-400 transition-all duration-75"
                                style={{
                                    // left: `${7 + counter * 20 + spaceCounter * 16}px`,
                                    left: `${caretPosition.x}px`,
                                    top: `${caretPosition.y}px`,
                                    visibility: inputFocus
                                        ? 'visible'
                                        : 'hidden',
                                }}
                            ></div>
                        )}

                        <input
                            className="opacity-0 absolute w-full h-full left-0 top-0"
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onKeyDown={handleSpace}
                            disabled={isDisabled}
                        />
                        <div id="words">
                            {wordArray.map((word: string, index: number) => (
                                <div key={index} className={'word'}>
                                    <div className={'incorrect-word'}>
                                        {word
                                            .split('')
                                            .map(
                                                (
                                                    letterChar: string,
                                                    indexIncorrectLetter: number
                                                ) => (
                                                    <span
                                                        key={`incorrect-letter-${index}-${indexIncorrectLetter}`}
                                                        // className={'letter'}
                                                    >
                                                        {/* {letterChar} */}
                                                    </span>
                                                )
                                            )}
                                    </div>
                                    {word
                                        .split('')
                                        .map(
                                            (
                                                letterChar: string,
                                                indexLetter: number
                                            ) => (
                                                <span
                                                    key={`letter-${index}-${indexLetter}`}
                                                    className={'letter'}
                                                >
                                                    {letterChar}
                                                </span>
                                            )
                                        )}
                                </div>
                            ))}
                        </div>
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
                    <div className="flex flex-col text-teal-100">
                        {isDisabled && (
                            <div className="flex flex-row ">
                                {/* wordper minutes */}

                                <div className={`${statsStyle}`}>
                                    {wpm} words per minute.{' '}
                                </div>
                                <div className={`${statsStyle}`}>
                                    Accuracy:{' '}
                                    {accuracy > 0
                                        ? `${accuracy}%`
                                        : 'Too many errors!'}
                                </div>
                                <Tooltip
                                    message="Correct words/Total words"
                                    position="top"
                                >
                                    <div className={`${statsStyle}`}>
                                        Words: {correctWords}/{totalWords}
                                    </div>
                                </Tooltip>
                                <Tooltip
                                    message="Correct/incorrect/extra/missed"
                                    position="top"
                                >
                                    <div className={`${statsStyle}`}>
                                        Characters: {correctCharacters}/
                                        {incorrectCharacters}/{extraCharacters}/
                                        {missedCharacters}
                                    </div>
                                </Tooltip>
                                <div className={`${statsStyle}`}>
                                    Wrong Key: {wrongKeystrokes}
                                </div>
                            </div>
                        )}
                        <div className={'flex flex-col justify-start'}>
                            <div className="text-left">
                                {isDisabled && typedArray.join(' ')}
                            </div>
                            <div className="text-left">
                                {isDisabled && wordArray.join(' ')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

// TODO: on backspace go back to previous word
// TODO: Clock change to timer
// TODO: Auto scroll
// TODO: dynamic word addition on reset
// TODO: toolbar each button functionality
// TODO: generic modal component
// TODO: Dynamic color themes
