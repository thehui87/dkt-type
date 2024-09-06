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
import TypingStats from '../components/stats';
import { resetWordArray, setToggleModal } from '../redux/toolbar/toolbar.slice';

// import { wordListGenerator } from '../utils/generator';
import GenericModal from '../components/modals/genericModal';

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

interface CaretPos {
    x: number;
    y: number;
}

const Home = () => {
    const [wordArray, setWordArray] = useState<Array<string>>([]); // system generated words
    const [wordCounter, setWordCounter] = useState<number>(0); // word counter
    const [typedArray, setTypedArray] = useState<Array<string>>([]); // user typed words
    const [activeWord, setActiveWord] = useState<string>(''); // current active word
    const [oldActiveWord, setOldActiveWord] = useState<string>('');
    const [activeWordHTML, setActiveWorHTML] = useState<Element | null>(null); // curent active html word container
    const [inputValue, setInputValue] = useState(''); // input tag value
    const [oldInputValue, setOldInputValue] = useState(''); // previous input tag value
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
    const inputRef = useRef<HTMLInputElement>(null);
    const textParentRef = useRef<HTMLDivElement>(null);
    // const [size, setSize] = useState([0, 0]);
    const [parentContainerRect, setParentContainerRect] = useState<DOMRect>();
    // const [wordsContainer, setWordsContainer] = useState<HTMLElement>();
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
    const {
        clock,
        toggleTimerValue,
        toggleMenuValue,
        newWordArray,
        quoteSource,
        // openModal,
        showIncorrectWord,
        showIncorrectCounter,
    } = useSelector((state: RootState) => state.toolbar);

    const handleInputChange = (event: any) => {
        if (wordCounter < wordArray.length) {
            timerRef.current?.start();
        }

        setOldInputValue(inputValue);
        setInputValue(event.target.value.trim());
    };

    // caret position
    const updateCaretPosition = useCallback(() => {
        // (inputValue.trim().length > 0 || activeWord != oldActiveWord)

        if (
            textContainerRef.current &&
            textParentRef.current &&
            activeWordHTML?.classList.contains('active') &&
            !activeWordHTML?.classList.contains('typed')
        ) {
            let boundingRectTop =
                textContainerRef.current.getBoundingClientRect() as DOMRect;
            let boundingRect: DOMRect =
                activeWordHTML?.getBoundingClientRect() as DOMRect;
            let boundingRectWords =
                textParentRef?.current.getBoundingClientRect() as DOMRect;

            let temp: number = 0;
            let parentDif = 0;

            temp = Math.round(boundingRect?.top - boundingRectTop?.top);
            parentDif = Math.round(
                boundingRectWords?.top - boundingRectTop?.top
            );

            if (temp < 0) {
                let offsetPos = temp - parentDif - 12;
                textParentRef.current.style.top = `${-offsetPos}px`;
            }
            if (temp > 76) {
                let offsetPos = temp - parentDif - 68;
                textParentRef.current.style.top = `${-offsetPos}px`;
            }

            setCaretPosition({
                x:
                    boundingRect?.left -
                    boundingRectTop.left +
                    inputValue.trim().length * 20 +
                    7,
                y: Math.abs(temp) < 30 ? 20 : 76,
            });
            let a = {
                x:
                    boundingRect?.left -
                    boundingRectTop.left +
                    inputValue.trim().length * 20 +
                    7,
                y: Math.abs(temp) < 30 ? 20 : 76,
                //  Math.round(boundingRect?.top - boundingRectTop?.top),
            };
        }
    }, [activeWordHTML, inputValue]);
    // activeWordHTML,

    useEffect(() => {
        const letterValuation = () => {
            // console.log({ activeWord });
            let lastLetterWordIndex = inputValue.trim().length - 1;
            if (
                oldInputValue.trim().length < inputValue.trim().length &&
                activeWord
            ) {
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
                if (inputValue?.trim()?.length >= activeWord?.length) {
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
        // updateCaretPosition();
    }, [inputValue]);

    const handleSpace = (e: any) => {
        let targetValue = e.target.value.trim();

        // if (e.target.value.length > 1 && e.target.value.trim().length === 0) {
        //     setInputValue('');
        // }

        if (e.keyCode === 32) {
            setTypedArray((oldArr) => [...oldArr, inputValue]);
            // word should have atleast 1 character
            if (targetValue.length > 0) {
                if (activeWord === targetValue) {
                    wordValuation();
                } else {
                    wordValuation('error');
                }

                setInputValue('');
                setWordCounter((count) => count + 1);
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
            wordList[wordCounter].classList.add('active');
            setActiveWorHTML(wordList[wordCounter]);
            let letterArray = wordList[wordCounter].querySelectorAll('.letter');
            setLetterArray([...letterArray]);
            let incorrectLetterArray = wordList[wordCounter].querySelectorAll(
                '.incorrect-word span'
            );
            setIncorrectLetterArray([...incorrectLetterArray]);
        };

        if (clock) {
            if (wordCounter < wordArray.length) {
                // console.log('ClockOn');

                setActiveWord(wordArray[wordCounter]);
                setActiveWordHTML();
            } else {
                // console.log('End of ClockOn');

                setActiveWord('');
                let lastActiveWord = document.querySelector('.word.active');
                if (
                    lastActiveWord &&
                    lastActiveWord.classList.contains('active')
                ) {
                    lastActiveWord.classList.remove('active');
                }
                setIsDisabled(true);
                setTypingStats();
                timerRef.current?.stop();
            }
        } else {
            // && wordCounter < wordArray.length
            console.log(timerRef.current?.timerRunning);
            // if (
            //     timerRef.current?.timerRunning &&
            //     wordCounter < wordArray.length
            // ) {
            //     console.log('TimerOn');
            //     // debugger;
            //     setActiveWord(wordArray[wordCounter]);
            //     setActiveWordHTML();
            // } else {
            //     timerRef.current?.stop();
            //     console.log('TimerOff');
            //     setActiveWord('');
            //     // let lastActiveWord = document.querySelector('.word.active');
            //     // if (
            //     //     lastActiveWord &&
            //     //     lastActiveWord.classList.contains('active')
            //     // ) {
            //     //     lastActiveWord.classList.remove('active');
            //     // }
            //     setIsDisabled(true);
            //     setTypingStats();
            //     // timerRef.current?.stop();
            // }
            //
        }
    }, [wordCounter, wordArray]);

    // useEffect(() => {
    //     if (!timerRef.current?.timerRunning && !clock) {
    //         setIsDisabled(true);
    //         setActiveWord('');
    //         let lastActiveWord = document.querySelector('.word.active');
    //         if (lastActiveWord && lastActiveWord.classList.contains('active')) {
    //             lastActiveWord.classList.remove('active');
    //         }

    //         setTypingStats();
    //     }
    // }, [timerRef.current?.timerRunning]);

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
        // add words depending on menu
        dispatch(resetWordArray());

        setWordCounter(0);
        setOldActiveWord('');
        setActiveWord(wordArray[0]);
        setInputValue('');
        setIsDisabled(false);
        setTypedArray([]);
        setIncorrectCounter(0);
        updateParentContainer();
        setActiveWorHTML(null);
        if (textParentRef.current) {
            textParentRef.current.style.top = '0px';
        }
        updateCaretPosition();

        timerRef.current?.reset();
        textContainerRef.current?.focus();

        dispatch(resetStats());
    }, []);

    const updateParentContainer = () => {
        if (textContainerRef.current) {
            let containerRect: DOMRect =
                textContainerRef?.current.getBoundingClientRect() as DOMRect;
            setParentContainerRect(containerRect);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            updateParentContainer();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setWordArray(() => [...newWordArray]);
    }, [newWordArray]);

    useEffect(() => {
        resetBoard();
        return () => {
            timerRef.current?.reset();
        };
    }, [resetBoard, toggleMenuValue]);

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
            if (wordArray[i]?.length < typedArray[i]?.length) {
                extraCharacters += typedArray[i].length - wordArray[i].length;
            }
        }
        let timeValue = clock
            ? timerRef.current?.mindecimal()
            : toggleTimerValue;
        console.log('time', timerRef.current?.mindecimal());
        dispatch(
            setStats({
                correctCharacters: correctCharacters,
                incorrectCharacters: incorrectCharacters,
                extraCharacters: extraCharacters,
                missedCharacters: missedCharacters,
                correctWords: correctWords,
                totalWords: totalWords,
                wrongKeystrokes: incorrectCounter,
                time: timeValue,
            } as TypingStatsState)
        );
    };

    const onFocus = () => {
        setInputFocus(true);
        inputRef.current?.focus();
    };
    const onBlur = () => setInputFocus(false);

    return (
        <div>
            <div className="h-full flex items-center absolute top-0 w-full">
                {/* pointer-events-none */}
                <div className="flex flex-col items-center mx-36 max-sm:mx-10 w-full">
                    {/* Toolbar */}
                    <ConfigToolbar></ConfigToolbar>

                    {/* Word count and time */}
                    <div className="flex flex-row justify-between w-full text-teal-200 text-2xl mb-5">
                        <Tooltip message="Word count" position="top">
                            <div className="w-32 text-left">{`${wordCounter}/${wordArray.length}`}</div>
                        </Tooltip>
                        {showIncorrectCounter && (
                            <div className="text-red-500">
                                {incorrectCounter}
                            </div>
                        )}
                        <div>
                            <Timer ref={timerRef} />
                        </div>
                    </div>
                    {/* Text Field */}
                    <div
                        ref={textContainerRef}
                        // max-h-40
                        className="rounded-lg bg-teal-950 text-3xl text-teal-600  min-h-48 max-h-48  overflow-hidden py-2 leading-14 tracking-wider text-left relative w-full"
                    >
                        {!isDisabled && (
                            <div
                                id="caret"
                                className="bg-orange-400 transition-all duration-75"
                                style={{
                                    // left: `${7 + wordCounter * 20 + spaceCounter * 16}px`,
                                    left: `${caretPosition.x}px`,
                                    top: `${caretPosition.y}px`,
                                    visibility: inputFocus
                                        ? 'visible'
                                        : 'hidden',
                                }}
                            ></div>
                        )}

                        <input
                            ref={inputRef}
                            className={`${isDisabled ? 'opacity-80' : 'opacity-0'}  absolute w-full h-full left-0 top-0`}
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onKeyDown={handleSpace}
                            disabled={isDisabled}
                        />
                        <div ref={textParentRef} id="words">
                            {wordArray.map((word: string, index: number) => (
                                <div key={index} className={'word'}>
                                    <div
                                        className={`${showIncorrectWord ? '' : 'hidden'} incorrect-word `}
                                    >
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
                    {quoteSource && (
                        <div className="text-teal-500">
                            Source: {quoteSource}ss
                        </div>
                    )}
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
                        {isDisabled && <TypingStats />}
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
// TODO: dynamic word addition on reset
// TODO: toolbar each button functionality
// TODO: Dynamic color themes
// TODO: Make timer work with
// TODO: add word speed ( end time - start time)
